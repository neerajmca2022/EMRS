import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api/employeeApi";

const EmployeeList = ({ refresh }) => {
  const [employees, setEmployees] = useState([]);

  const loadEmployees = async () => {
    const data = await getEmployees();
    console.log(data);
    setEmployees(data);
  };

  useEffect(() => {
    loadEmployees();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(id);
      loadEmployees();
    }
  };

  return (
    <div>
      <h3>Employee List</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Emp_Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="4" align="center">No employees found</td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.employee_id}>
                <td>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button onClick={() => handleDelete(emp.employee_id)}>🗑 Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
