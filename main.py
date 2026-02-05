from fastapi import FastAPI
from routers import employee, attendance
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="EMRS - Employee & Attendance Management")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(employee.router, prefix="/employees", tags=["Employees"])
app.include_router(employee.router, prefix="/employees/add", tags=["Employees"])
app.include_router(employee.router, prefix="/employees/delete", tags=["Employees"])
app.include_router(attendance.router, prefix="/attendance", tags=["Attendance"])

