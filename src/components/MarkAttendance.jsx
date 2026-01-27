import { useState } from "react";
import { markAttendance } from "../api/AttendanceServices";

const MarkAttendance = ({ employees }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const handleSubmit = async () => {
    try {
      await markAttendance({
        employee_id: employeeId,
        date,
        status
      });
      alert("Attendance marked successfully");
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  return (
    <div>
      <h3>Mark Attendance</h3>

      <select onChange={(e) => setEmployeeId(e.target.value)}>
        <option value="">Select Employee</option>
        {employees.map(emp => (
          <option key={emp._id} value={emp._id}>
            {emp.name}
          </option>
        ))}
      </select>

      <input type="date" onChange={(e) => setDate(e.target.value)} />

      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default MarkAttendance;
