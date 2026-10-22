"""Main entry point for HarvestLink FastAPI server."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import router

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="HarvestLink AI Agent Backend - Careem MCP + Bedrock",
    version="0.1.0",
)

# CORS configuration for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")


@app.get("/")
async def root():
    return {
        "name": settings.PROJECT_NAME,
        "status": "healthy",
        "docs_url": "/docs",
    }
