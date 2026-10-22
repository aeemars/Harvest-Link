"""Buyer matching and offer distribution tool stubs.

- find_buyers: queries DynamoDB for matching buyers within distance radius.
- send_offer: issues time-sensitive offers to prospective buyers.
"""
from typing import Dict, Any, List


async def find_buyers(
    produce: str,
    seller_lat: float,
    seller_lng: float,
    max_distance_km: float = 15.0,
) -> List[Dict[str, Any]]:
    """Find prospective buyers within radius.

    Boilerplate placeholder - to be implemented.
    """
    raise NotImplementedError("find_buyers tool not implemented yet")


async def send_offer(
    listing_id: str,
    buyer_ids: List[str],
    rescue_price: float,
    expiry_hours: int,
) -> List[Dict[str, Any]]:
    """Send surplus offers to matched buyers.

    Boilerplate placeholder - to be implemented.
    """
    raise NotImplementedError("send_offer tool not implemented yet")
