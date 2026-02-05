from fastapi import APIRouter, HTTPException
from database import employees_collection, attendance_collection
from models.employee import Attendance

router = APIRouter()

@router.post("/")
def mark_attendance(att: Attendance):
    if employees_collection.find_one({"employee_id": att.employee_id}) is None:
        raise HTTPException(status_code=404, detail="Employee not found")

    if attendance_collection.find_one({"employee_id": att.employee_id, "date": att.date}):
        raise HTTPException(status_code=400, detail="Attendance already marked for this date")

    attendance_collection.insert_one(att.dict())
    return {"message": "Attendance marked successfully"}

@router.get("/{employee_id}")
def get_attendance(employee_id: str):
    if employees_collection.find_one({"employee_id": employee_id}) is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    records = list(attendance_collection.find({"employee_id": employee_id}, {"_id": 0}))
    return records
