import axios from "axios";

const BASE_URL = "http://localhost:8000/attendance";

export const markAttendance = async (attendanceData) => {
  return await axios.post(`${BASE_URL}`, attendanceData);
};

export const getAttendanceByEmployee = async (employeeId) => {
  return await axios.get(`${BASE_URL}/${employeeId}`);
};
