import { useState } from "react";
import AddEmployee from "../components/addEmployee.jsx";
import EmployeeList from "../components/employeeList.jsx";
import Navbar from "../components/NavBar";

const Employees = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <Navbar />
      <AddEmployee onEmployeeAdded={() => setRefresh(!refresh)} />
      <EmployeeList refresh={refresh} />
    </div>
  );
};

export default Employees;
