import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchMenu = (params) => API.get("/menu", { params });
export const searchMenu = (q) => API.get(`/menu/search?q=${q}`);
export const createMenuItem = (data) => API.post("/menu", data);
export const updateMenuItem = (id, data) => API.put(`/menu/${id}`, data);
export const deleteMenuItem = (id) => API.delete(`/menu/${id}`);
export const toggleAvailability = (id) =>
  API.patch(`/menu/${id}/availability`);
