from uuid import uuid4
from typing import Optional

# In-memory job store.
# TODO: Replace with Redis/DB in production for persistence across restarts.
jobs: dict[str, dict] = {}


def create_job() -> str:
    job_id = str(uuid4())
    jobs[job_id] = {
        "status": "pending",
        "video_url": None,
        "error": None,
    }
    return job_id


def update_job(
    job_id: str,
    status: str,
    video_url: Optional[str] = None,
    error: Optional[str] = None,
) -> None:
    if job_id in jobs:
        jobs[job_id].update(
            {
                "status": status,
                "video_url": video_url,
                "error": error,
            }
        )


def get_job(job_id: str) -> Optional[dict]:
    return jobs.get(job_id)


def list_jobs() -> list[dict]:
    return [
        {"job_id": jid, **data}
        for jid, data in jobs.items()
    ]
