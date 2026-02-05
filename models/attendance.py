from pydantic import BaseModel
from datetime import datetime
from typing import Literal

class AttendanceCreate(BaseModel):
    employee_id: str
    date: datetime
    status: Literal["Present", "Absent"]
    timestamp: datetime = datetime.utcnow()
