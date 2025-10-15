from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Email Subscription Models
class EmailSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = Field(default="subscribed")  # subscribed, unsubscribed

class EmailSubscriptionCreate(BaseModel):
    email: EmailStr

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Email Subscription Endpoints
@api_router.post("/subscribe", response_model=dict)
async def subscribe_email(input: EmailSubscriptionCreate):
    """
    Subscribe an email to the waitlist.
    Returns a success message if the email is new or already subscribed.
    """
    email = input.email.lower()  # Normalize email to lowercase
    
    # Check if email already exists
    existing = await db.email_subscriptions.find_one({"email": email}, {"_id": 0})
    
    if existing:
        return {
            "success": True,
            "message": "You're already on the list! You'll be the first to know when we launch.",
            "already_subscribed": True
        }
    
    # Create new subscription
    subscription = EmailSubscription(email=email)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = subscription.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.email_subscriptions.insert_one(doc)
    
    return {
        "success": True,
        "message": "Thank you for subscribing! You'll be the first to know when we launch.",
        "already_subscribed": False
    }

@api_router.get("/subscribers", response_model=List[EmailSubscription])
async def get_subscribers():
    """
    Get all email subscribers.
    Returns a list of all subscribed emails with their timestamps.
    """
    subscribers = await db.email_subscriptions.find(
        {"status": "subscribed"}, 
        {"_id": 0}
    ).to_list(10000)
    
    # Convert ISO string timestamps back to datetime objects
    for subscriber in subscribers:
        if isinstance(subscriber['timestamp'], str):
            subscriber['timestamp'] = datetime.fromisoformat(subscriber['timestamp'])
    
    return subscribers

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()