"""Data models for DynamoDB entities based on HarvestLink Implementation Plan.

Entities:
- Sellers
- Buyers
- Listings
- Offers
- Deliveries
"""
from typing import Optional, List
from pydantic import BaseModel, Field


class LatLng(BaseModel):
    lat: float
    lng: float


class Seller(BaseModel):
    seller_id: str
    name: str
    phone: str
    location: LatLng
    careem_location_id: Optional[str] = None
    usual_produce: List[str] = Field(default_factory=list)


class Buyer(BaseModel):
    buyer_id: str
    type: str  # restaurant, household, kitchen
    phone: Optional[str] = None
    location: LatLng
    careem_location_id: Optional[str] = None
    wanted_produce: List[str] = Field(default_factory=list)
    max_distance_km: float = 15.0


class Listing(BaseModel):
    listing_id: str
    seller_id: str
    produce: str
    quantity_kg: float
    grade: str  # 'A', 'B', 'C'
    shelf_life_hours: int
    retail_price: float
    rescue_price: float
    photo_s3_key: Optional[str] = None
    status: str = "Open"  # Open, Matched, Delivered, Expired


class Offer(BaseModel):
    offer_id: str
    listing_id: str
    buyer_id: str
    price: float
    expires_at: str
    status: str = "Sent"  # Sent, Accepted, Declined, Expired


class Delivery(BaseModel):
    delivery_id: str
    offer_id: str
    box_order_id: Optional[str] = None
    cct_id: Optional[str] = None
    delivery_price: Optional[float] = None
    payment_type: Optional[str] = None
    status: str = "Pending"  # Pending, Confirmed, PickedUp, Delivered, Cancelled
