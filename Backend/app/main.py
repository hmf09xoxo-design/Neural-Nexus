import logging
import asyncio
import os
import sys

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()
from app.database import engine
from app.models import Base
from app.auth.router import router as auth_router
from app.text_analysis.router import router as text_analysis_router
from app.url_analysis.router import router as url_analysis_router
from app.attachment_sandbox.router import router as attachment_router
from app.voice_analysis.router import router as voice_analysis_router
from app.portal.router import router as portal_router
from app.api_keys.router import router as api_keys_router
from app.voice_analysis.websocket_router import ws_router as voice_ws_router
from app.middleware.auth_logging import AuthLoggingMiddleware
from app.ai_security.middleware import ShadowGuardMiddleware
from app.routers.extension_detection import router as extension_router


if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())


app = FastAPI()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)

# Middleware order: add innermost first, outermost last.
# CORS must be outermost so its headers appear on every response,
# including 401/429 errors from AuthLoggingMiddleware.
_base_origins = [
    "http://localhost:3000", "http://127.0.0.1:3000",
    "http://localhost:5173", "http://127.0.0.1:5173",
    "https://mail.google.com",
]
_frontend_url = os.getenv("FRONTEND_URL", "")
if _frontend_url:
    _base_origins.append(_frontend_url.rstrip("/"))

app.add_middleware(ShadowGuardMiddleware)
app.add_middleware(AuthLoggingMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=_base_origins,
    allow_origin_regex=r"(chrome-extension://.*|https://.*\.netlify\.app)",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(text_analysis_router)
app.include_router(url_analysis_router)
app.include_router(attachment_router)
app.include_router(voice_analysis_router)
app.include_router(api_keys_router)
app.include_router(portal_router)
app.include_router(voice_ws_router)
app.include_router(extension_router)

@app.get("/")
def home():
    return {"message": "Hello World"}

@app.get("/hello")
def hello():
    return {"message": "Hello Pratham"}