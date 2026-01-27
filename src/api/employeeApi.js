import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const getEmployees = async () => {
  const response = await axios.get(`${API_BASE_URL}/employees/`);
  return response.data;
};

export const addEmployee = async (employee) => {
  const response = await axios.post(`${API_BASE_URL}/employees/add/`, employee);
  return response.data;
};

export const deleteEmployee = async (_id) => {
  const response = await axios.delete(`${API_BASE_URL}/employees/${_id}/`);
  return response.data;
};
