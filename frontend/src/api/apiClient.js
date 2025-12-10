import axios from "axios";

const api = axios.create({
  baseURL: "https://proman-backend-55un.onrender.com/api",
});

export default api;
