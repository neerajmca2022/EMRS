import { useState, useEffect } from "react";
import { getEmployees } from "../api/employeeApi";

const AttendanceTable = ({ refresh }) => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({}); // <-- State for attendance

  const loadEmployees = async () => {
    const data = await getEmployees();
    console.log(data);
    setEmployees(data);

    // Initialize attendance state with default "Absent"
    const initialAttendance = {};
    data.forEach((emp) => {
      initialAttendance[emp.id] = "Absent";
    });
    setAttendance(initialAttendance);
  };

  useEffect(() => {
    loadEmployees();
  }, [refresh]);

  const handleChange = (empId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [empId]: status,
    }));
  };

  return (
    <div>
      <h3>Attendance List</h3>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Emp_Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.employee_id}>
              <td>{emp.employee_id}</td>
              <td>{emp.full_name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <label>
                  <input
                    type="radio"
                    name={`attendance-${emp.id}`}
                    checked={attendance[emp.id] === "Present"}
                    onChange={() => handleChange(emp.id, "Present")}
                  />
                  Present
                </label>

                {"  "}

                <label>
                  <input
                    type="radio"
                    name={`attendance-${emp.id}`}
                    checked={attendance[emp.id] === "Absent"}
                    onChange={() => handleChange(emp.id, "Absent")}
                  />
                  Absent
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button onClick={() => console.log(attendance)}>
        Save Attendance
      </button>
    </div>
  );
};

export default AttendanceTable;
