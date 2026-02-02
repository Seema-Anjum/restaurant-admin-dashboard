import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchOrders = (params) =>
  API.get("/orders", { params });

export const updateOrderStatus = (id, status) =>
  API.patch(`/orders/${id}/status`, { status });
