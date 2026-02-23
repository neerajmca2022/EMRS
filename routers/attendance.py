from fastapi import APIRouter, HTTPException
from datetime import datetime
from fastapi import APIRouter, Query
from typing import Optional
from database import attendance_collection
from database import employees_collection, attendance_collection
from models.attendance import AttendanceBulkCreate

router = APIRouter()

@router.post("/mark")
def mark_attendance(data: AttendanceBulkCreate):

    inserted_records = []

    for record in data.records:

        # Check employee exists
        employee = employees_collection.find_one(
            {"employee_id": record.employee_id}
        )
        if not employee:
            raise HTTPException(
                status_code=404,
                detail=f"Employee {record.employee_id} not found"
            )

        # Check if attendance already marked
        existing = attendance_collection.find_one({
            "employee_id": record.employee_id,
            "date": str(data.date)
        })

        if existing:
            raise HTTPException(
                status_code=400,
                detail=f"Attendance already marked for {record.employee_id}"
            )

        attendance_data = {
            "employee_id": record.employee_id,
            "date": str(data.date),
            "status": record.status,
            "check_in": datetime.now().strftime("%H:%M:%S"),
            "timestamp": datetime.utcnow()
        }

        attendance_collection.insert_one(attendance_data)
        inserted_records.append(record.employee_id)

    return {
        "message": "Attendance marked successfully",
        "employees": inserted_records
    }
@router.get("/details")
def get_attendance_details(
    date: Optional[str] = None,
    employee_id: Optional[str] = None
):

    match_stage = {}

    if date:
        match_stage["date"] = date

    if employee_id:
        match_stage["employee_id"] = employee_id

    pipeline = [
        {
            "$match": match_stage
        },
        {
            "$lookup": {
                "from": "employees",   
                "localField": "employee_id",
                "foreignField": "employee_id",
                "as": "employee_info"
            }
        },
        {
            "$unwind": "$employee_info"
        },
        {
            "$project": {
                "_id": 0,
                "employee_id": 1,
                "date": 1,
                "status": 1,
                "check_in": 1,
                "name": "$employee_info.full_name",
                "department": "$employee_info.department",
                "email": "$employee_info.email"
            }
        }
    ]

    result = list(attendance_collection.aggregate(pipeline))

    return result