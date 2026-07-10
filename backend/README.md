# AI Text-to-Video Generator — Backend

## Setup

1. Create a virtual environment (recommended):

```bash
python -m venv .venv
.venv\Scripts\activate   # Windows
source .venv/bin/activate  # macOS/Linux
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your Hugging Face token. Get one at https://huggingface.co/settings/tokens

4. Run the server:

```bash
uvicorn main:app --reload --port 8000
```

## API Endpoints

| Method | Path                | Description                     |
|--------|---------------------|---------------------------------|
| POST   | `/api/generate`     | Submit a text-to-video job      |
| GET    | `/api/status/{id}`  | Check job status & get video URL|
| GET    | `/health`           | Health check                    |

## Example

```bash
curl -X POST "http://localhost:8000/api/generate" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "A cat walking on a sunny beach"}'
```
