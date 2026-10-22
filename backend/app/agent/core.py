"""HarvestLink AI Agent Core.

Orchestrates Claude Sonnet on Amazon Bedrock with Careem MCP tools
and internal produce tools (grading, pricing, matching, delivery).
"""
from typing import AsyncGenerator, Dict, Any


class HarvestLinkAgent:
    """Agent orchestrator for Seller and Buyer chat workflows."""

    def __init__(self, user_type: str, session_id: str):
        self.user_type = user_type  # 'seller' or 'buyer'
        self.session_id = session_id

    async def stream_response(
        self,
        message: str,
        media_bytes: bytes | None = None,
    ) -> AsyncGenerator[Dict[str, Any], None]:
        """Stream response tokens and tool call events.

        Boilerplate placeholder - to be implemented.
        """
        # Yield a placeholder connection message
        yield {
            "type": "message",
            "content": f"[HarvestLink Agent Initialized for {self.user_type}]",
        }
