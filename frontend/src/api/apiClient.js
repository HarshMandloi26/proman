// src/api/apiClient.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // same as backend
});

export default api;
