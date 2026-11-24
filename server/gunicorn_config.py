# server/gunicorn_config.py
import multiprocessing

# workers = multiprocessing.cpu_count() * 2 + 1  # Vous pouvez laisser ou réduire à 4 si vous voulez
workers = 4

bind = "0.0.0.0:8000"
timeout = 120
keepalive = 2

accesslog = "-"
errorlog = "-"
loglevel = "info"

# --- CORRECTION ICI ---
# FastAPI a besoin du worker Uvicorn, pas du worker "sync" standard
worker_class = "uvicorn.workers.UvicornWorker"