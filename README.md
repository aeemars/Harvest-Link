# HarvestLink 🌾📦

> **Surplus Produce Rescue AI Agent**
> 
> An AI agent that sells surplus fresh produce before it spoils: grades the produce, prices it, matches nearby buyers, and books instant delivery through Careem Box.

 *

##  System Overview

In Nigeria and across developing markets, roughly half of harvested fruits and vegetables are lost before reaching consumers. Sellers frequently dump unsold inventory that could have been sold at discount.

**HarvestLink** solves this with an autonomous, chat-based agent workflow:

1. Listing & Grading: Seller sends a photo and short note (“40 kg tomatoes, very ripe”). The agent uses Claude 3.5 Sonnet Vision on Amazon Bedrock to grade freshness (A, B, or C), estimate shelf life, and compute confidence.
2. Retail Benchmarking & Pricing: Checks live local retail prices via Careem Groceries (is_grocery_area_serviceable, search_groceries_items) and sets a rescue price:

$$
\text{Price}_{\text{rescue}} = \text{Price}_{\text{retail}} \times f_{\text{grade}} \quad (A=0.70, B=0.55, C=0.40)
$$

3. Buyer Matching: Geographically queries prospective buyers (restaurants, commercial kitchens, households within 15 km) from Amazon DynamoDB.
4. Careem Box Delivery: Once a buyer accepts, the agent fetches a Careem Box delivery quote (box_get_config, box_get_vehicle_types, box_pre_checkout) and books it (box_create_order) with user confirmation.

 *

##  Architecture & Tech Stack

```
┌────────────────────────────────────────────────────────┐
│             Web App (Next.js on AWS Amplify)           │
│   • Seller Chat (Photo/Note)   • Buyer Chat & Match Map│
└───────────────────────────┬────────────────────────────┘
                            │ Streaming SSE
┌───────────────────────────▼────────────────────────────┐
│                  Chat API (FastAPI)                    │
│   • /api/chat/seller           • /api/chat/buyer       │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                   HarvestLink Agent                    │
│   • Strands Agents SDK on Bedrock AgentCore Runtime    │
│   • Claude 3.5 Sonnet on Amazon Bedrock (Vision/Tools) │
│   • AgentCore Memory (Seller produce & Buyer pref)     │
└──────────────┬────────────────────────────┬────────────┘
               │ MCP / OAuth 2.0            │ Function Calls
┌──────────────▼────────────┐  ┌────────────▼────────────┐
│        Careem MCP         │  │     AWS Managed Data    │
│ • Groceries: retail prices│  │ • DynamoDB: 5 Tables    │
│ • Location: geocoding     │  │ • S3: produce photos    │
│ • Box: quotes & orders    │  │                         │
└───────────────────────────┘  └─────────────────────────┘
```

 *

##  Project Structure

```
Harvest-Link/
├── backend/                        # FastAPI Backend & Agent Service
│   ├── app/
│   │   ├── agent/                  # Agent Core, Prompts & Business Logic Tools
│   │   │   ├── tools/
│   │   │   │   ├── delivery.py     # Careem Box order recording
│   │   │   │   ├── grade.py        # Claude Vision produce grading
│   │   │   │   ├── matching.py     # DynamoDB buyer proximity matching
│   │   │   │   └── pricing.py      # Rescue price formula
│   │   │   ├── core.py             # Agent runtime orchestrator
│   │   │   └── prompts.py          # System prompts & instructions
│   │   ├── api/
│   │   │   └── routes.py           # Streaming endpoints (/chat/seller, /chat/buyer)
│   │   ├── core/
│   │   │   └── config.py           # Pydantic environment configuration
│   │   ├── db/
│   │   │   ├── dynamodb.py         # DynamoDB & S3 resource clients
│   │   │   └── models.py           # Pydantic schemas (Seller, Buyer, Listing, Offer, Delivery)
│   │   ├── mcp/
│   │   │   └── careem_client.py    # Careem MCP Client (Groceries, Location, Box)
│   │   └── main.py                 # FastAPI application entry point
│   ├── tests/
│   │   └── test_health.py          # Backend test suite
│   ├── .env.example                # Backend environment template
│   ├── Dockerfile                  # Backend container specification
│   ├── pyproject.toml              # Build metadata
│   └── requirements.txt            # Python dependencies (FastAPI, Bedrock, Boto3, MCP)
│
├── frontend/                       # Next.js 14 Web Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css         # Tailwind directives & theme
│   │   │   ├── layout.tsx          # Root layout
│   │   │   └── page.tsx            # WhatsApp-style Seller/Buyer tabs & map view
│   │   ├── components/
│   │   │   ├── buyer/              # Buyer flow UI components
│   │   │   ├── chat/               # Reusable chat container, bubbles, inputs
│   │   │   ├── map/                # Dynamic Leaflet match map
│   │   │   └── seller/             # Seller flow UI components
│   │   └── lib/
│   │       ├── api.ts              # SSE client stream consumer
│   │       └── types.ts            # Frontend TypeScript definitions
│   ├── .env.example                # Frontend environment template
│   ├── Dockerfile                  # Frontend container specification
│   ├── next.config.js              # Next.js configuration
│   ├── package.json                # Frontend dependencies (Next, Tailwind, Leaflet)
│   ├── postcss.config.js           # PostCSS configuration
│   ├── tailwind.config.js          # Tailwind theme colors (WhatsApp & Careem palettes)
│   └── tsconfig.json               # TypeScript configuration
│
├── docker-compose.yml              # Local multi-service orchestration
├── .gitignore                      # Git ignore patterns
└── README.md                       # Project documentation
```

 *

##  Getting Started

### 1\. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your AWS and Careem credentials

# Run development server
uvicorn app.main:app --reload --port 8000
```

The API docs will be available at: `http://localhost:8000/docs`

### 2\. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local

# Run development server
npm run dev
```

The app will be accessible at: `http://localhost:3000`

### 3\. Careem MCP Mock Sandbox

For local offline development and testing, run against the local mock MCP server:

```
http://127.0.0.1:8787/mcp
```

 *

## Security & Human-in-the-Loop Guardrails

1. Mutating Careem Tools: Every mutating action (booking a Careem Box order, charging payments) requires explicit user confirmation.
2. Quality Override: Sellers can inspect and override the agent’s estimated produce grade before listing broadcast.
3. Payment Choice: The agent presents available payment options; the user always chooses payment directly.