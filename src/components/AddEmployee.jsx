import { useState } from "react";
import { addEmployee } from "../api/employeeApi";

const AddEmployee = ({ onEmployeeAdded }) => {
    const[hide,SetHide]=useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEmployee(form);
    onEmployeeAdded();
    setForm({employee_id:"", full_name: "", email: "", department: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Add Employee</h3>
      <input name="employee_id" placeholder="Employee ID" value={form.employee_id} onChange={handleChange} required />
      <input name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />

      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
