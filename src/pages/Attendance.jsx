import AttendanceTable from "../components/AttendanceTable";
import MarkAttendance from "../components/MarkAttendance";
import Navbar from "../components/NavBar";
import { useState } from "react";
const Attendance = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <div>
       <Navbar />
      <h2>Attendance Management</h2>

      <AttendanceTable refresh={refresh} />
      {/* <MarkAttendance/> */}
    </div>
  );
};

export default Attendance;
