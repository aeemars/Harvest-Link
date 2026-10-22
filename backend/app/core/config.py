"""Core configuration and settings for HarvestLink."""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    PROJECT_NAME: str = "HarvestLink API"
    ENVIRONMENT: str = "development"
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    CORS_ORIGINS: str = "http://localhost:3000"

    # AWS
    AWS_REGION: str = "us-east-1"
    AWS_ACCESS_KEY_ID: str | None = None
    AWS_SECRET_ACCESS_KEY: str | None = None
    AWS_SESSION_TOKEN: str | None = None

    # Bedrock
    BEDROCK_MODEL_ID: str = "anthropic.claude-3-5-sonnet-20241022-v2:0"

    # S3
    S3_BUCKET_NAME: str = "harvestlink-produce-photos"

    # DynamoDB
    DYNAMODB_TABLE_SELLERS: str = "harvestlink-sellers"
    DYNAMODB_TABLE_BUYERS: str = "harvestlink-buyers"
    DYNAMODB_TABLE_LISTINGS: str = "harvestlink-listings"
    DYNAMODB_TABLE_OFFERS: str = "harvestlink-offers"
    DYNAMODB_TABLE_DELIVERIES: str = "harvestlink-deliveries"

    # Careem MCP
    CAREEM_MCP_MODE: str = "local"
    CAREEM_MCP_URL: str = "http://127.0.0.1:8787/mcp"
    CAREEM_CLIENT_ID: str | None = None
    CAREEM_CLIENT_SECRET: str | None = None

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


settings = Settings()
