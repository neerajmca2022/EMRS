from fastapi import APIRouter, HTTPException
from database import employees_collection
from models.employee import Employee
from pymongo.errors import DuplicateKeyError

router = APIRouter()
employees_collection.create_index("employee_id", unique=True)

@router.post("/add/")
def add_employee(emp: Employee):
    try:
        employees_collection.insert_one(emp.model_dump())
        return {"message": "Employee added successfully"}
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Employee ID already exists")

@router.get("/")
def get_employees():
    employees = list(employees_collection.find({}, {"_id": 0}))
    return employees

@router.delete("/{employee_id}")
def delete_employee(employee_id: str):
    result = employees_collection.delete_one({"employee_id": employee_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted successfully"}
