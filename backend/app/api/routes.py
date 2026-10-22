"""FastAPI API routes for HarvestLink."""
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse
import json
from typing import Optional
from app.agent.core import HarvestLinkAgent

router = APIRouter()


@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "harvestlink-backend"}


@router.post("/chat/seller")
async def chat_seller(
    message: str = Form(...),
    session_id: str = Form(...),
    photo: Optional[UploadFile] = File(None),
):
    """Streaming chat endpoint for Seller flow (photo + notes, grade confirmation, pricing)."""
    agent = HarvestLinkAgent(user_type="seller", session_id=session_id)

    photo_bytes = await photo.read() if photo else None

    async def event_generator():
        async for event in agent.stream_response(message=message, media_bytes=photo_bytes):
            yield f"data: {json.dumps(event)}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")


@router.post("/chat/buyer")
async def chat_buyer(
    message: str = Form(...),
    session_id: str = Form(...),
):
    """Streaming chat endpoint for Buyer flow (receives offers, accepts, chooses payment, confirms Box delivery)."""
    agent = HarvestLinkAgent(user_type="buyer", session_id=session_id)

    async def event_generator():
        async for event in agent.stream_response(message=message):
            yield f"data: {json.dumps(event)}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
