import axios from 'axios';

const API_URL = '/api/employees';

// Add this to your api.js
// Add this to your existing api.js
export const fetchEmployee = async (id) => {
  const response = await axios.get(`/api/employees/${id}`);
  return response.data;
};
export const fetchEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await axios.post(API_URL, employee);
  return response.data;
};

export const updateEmployee = async (id, employee) => {
  const response = await axios.put(`${API_URL}/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};