from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import List, Literal


class AttendanceRecord(BaseModel):
    employee_id: str
    status: Literal["Present", "Absent"]


class AttendanceBulkCreate(BaseModel):
    date: date
    records: List[AttendanceRecord]