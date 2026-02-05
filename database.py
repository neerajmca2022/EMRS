from pymongo import MongoClient

# -----------------------------
# MongoDB connection
# -----------------------------
MONGO_URI = "mongodb+srv://neeraj_2024:RMdQOyMf7n3vtnAS@test1.jtabjw3.mongodb.net/"
client = MongoClient(MONGO_URI)

# Database
db = client["EMRS"]

# Collections
employees_collection = db["employees"]
attendance_collection = db["attendance"]

# -----------------------------
# Test MongoDB Connection
# -----------------------------
if __name__ == "__main__":
    try:
        print("Connecting to MongoDB...")
        client.admin.command("ping")
        print("MongoDB connection successful ✅")
        print("Databases:", client.list_database_names())
    except Exception as e:
        print("MongoDB connection failed ❌")
        print(e)
