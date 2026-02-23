from pymongo import MongoClient
import os

# Get URI from Render environment variable
print("ENV CHECK:", os.environ)
MONGO_URI = os.getenv("MONGO_URI = mongodb+srv://neerajrajpoot93:qQqJltPWOoDn9WtF@cluster0.behpnlv.mongodb.net/HMRS?retryWrites=true&w=majority")

if not MONGO_URI:
    raise ValueError("MONGO_URI environment variable not set")

client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)

# Database
db = client["EMRS"]

# Collections
employees_collection = db["employees"]
attendance_collection = db["attendance"]