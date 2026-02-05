from pydantic import BaseModel, EmailStr, Field
from datetime import date

class Employee(BaseModel):
    employee_id: str = Field(..., example="EMP001")
    full_name: str = Field(..., example="John Doe")
    email: EmailStr
    department: str = Field(..., example="HR")

class Attendance(BaseModel):
    employee_id: str
    date: date
    status: str = Field(..., example="Present")
