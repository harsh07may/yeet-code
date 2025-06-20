# Yeetcode Background Code Executor Worker Service

This is the **background worker service** for `Yeetcode`.\
It listens to the Submissions queue and handles heavy tasks like spinning up **isolated code containers** and **Running code**.

## Technologies Used

| Tool       | Purpose                              |
| ---------- | ------------------------------------ |
| BullMQ     | Manage the OCR job queue             |
| ioredis    | Connect BullMQ to Redis server       |
| sharp      | Compress and resize images           |
| PostgreSQL | Store document metadata and OCR text |

## Folder Structure

```bash
worker/
├── index.js        # Main worker code
├── compressed/     # Folder where compressed images are saved temporarily
├── package.json    # Node dependencies
└── README.md       # You are reading this!
```

## Flow of the Application

```bash
User uploads a submission
↓
Server adds a job to BullMQ (via Redis)
↓
Worker is listening to the "submissions" queue
↓
Worker picks the job, processes (provision container + runs code)
↓
Worker saves results to PostgreSQL
```

### Using Docker

1. Install Docker on your machine.
2. Build your container: `docker build -t yeetcode-worker .`.
3. Run your container: `docker run -p 3000:3000 yeetcode-worker`.

```md
// .env
REDIS_HOST = ""
REDIS_PASSWORD = ""
```
