import os
import logging

from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from dotenv import load_dotenv

from job_store import create_job, update_job, get_job, list_jobs

load_dotenv()

HF_TOKEN = os.environ.get("HF_TOKEN")
if not HF_TOKEN:
    raise RuntimeError("HF_TOKEN is not set. Create a .env file from .env.example and add your Hugging Face token.")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(title="AI Text-to-Video Generator")


@app.on_event("startup")
def startup():
    os.makedirs("static/videos", exist_ok=True)
    logger.info("static/videos directory ready")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")


class GenerateRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=500)


class GenerateResponse(BaseModel):
    job_id: str
    status: str


class StatusResponse(BaseModel):
    status: str
    video_url: str | None = None
    error: str | None = None


def generate_video(job_id: str, prompt: str) -> None:
    import requests
    import socket

    logger.info("Job %s started for prompt: %.80s", job_id, prompt)
    update_job(job_id, "processing")

    output_path = os.path.join("static", "videos", f"{job_id}.mp4")

    try:
        response = requests.post(
            "https://api-inference.huggingface.co/models/Wan-AI/Wan2.2-TI2V-5B",
            headers={"Authorization": f"Bearer {HF_TOKEN}"},
            json={"inputs": prompt},
            timeout=60,
        )
        response.raise_for_status()
        video_data = response.content

        with open(output_path, "wb") as f:
            f.write(video_data)

        video_url = f"/static/videos/{job_id}.mp4"
        update_job(job_id, "completed", video_url=video_url)
        logger.info("Job %s completed successfully (HF API)", job_id)

    except (requests.exceptions.ConnectionError, socket.gaierror, socket.herror):
        logger.warning("HF API unreachable, falling back to local generator")
        try:
            from local_generator import generate_local_video

            generate_local_video(prompt, output_path)
            video_url = f"/static/videos/{job_id}.mp4"
            update_job(job_id, "completed", video_url=video_url)
            logger.info("Job %s completed successfully (local)", job_id)
        except Exception as local_err:
            logger.error("Local generation failed: %s", local_err, exc_info=True)
            update_job(job_id, "failed", error=f"Local generation error: {local_err}")

    except Exception as exc:
        logger.error("Job %s failed: %s", job_id, exc, exc_info=True)
        update_job(job_id, "failed", error=str(exc))


@app.post("/api/generate", response_model=GenerateResponse)
async def generate(body: GenerateRequest, background_tasks: BackgroundTasks):
    job_id = create_job()
    logger.info("Job %s created for prompt: %.80s", job_id, body.prompt)
    background_tasks.add_task(generate_video, job_id, body.prompt)
    return GenerateResponse(job_id=job_id, status="pending")


@app.get("/api/status/{job_id}", response_model=StatusResponse)
async def status(job_id: str):
    job = get_job(job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return StatusResponse(**job)


@app.get("/")
async def root():
    return RedirectResponse(url="/docs")


@app.get("/api/jobs")
async def jobs_list():
    return list_jobs()


@app.get("/health")
async def health():
    return {"status": "ok"}
