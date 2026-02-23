from dotenv import load_dotenv
import os
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")   # ONLY the name here

if not MONGO_URI:
    raise ValueError("MONGO_URI environment variable not set")

client = MongoClient(MONGO_URI)

db = client["HMRS"]

employees_collection = db["employees"]
attendance_collection = db["attendance"]