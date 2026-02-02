import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import OrderModal from "../components/OrderModal"; 
import "../styles/orders.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Fetch Orders based on status filter
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders?status=${filterStatus}`
      );
      setOrders(res.data);
    } catch (err) {
      console.error("Order Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  // 2. Fetch Menu Items 
  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/menu`);
      const data = Array.isArray(res.data) ? res.data : res.data.items || [];
      setMenuItems(data);
    } catch (err) {
      console.error("Menu Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchMenu();
  }, [fetchOrders]);

  // 3. Update Order Status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/orders/${id}`, { 
        status: newStatus 
      });
      setOrders(prev => 
        prev.map(o => o._id === id ? { ...o, status: newStatus } : o)
      );
    } catch (err) {
      alert("Update failed");
    }
  };

  // 4. Save New Manual Order
  const handleSaveOrder = async (orderData) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData);
      setOrders([res.data, ...orders]);
      setIsModalOpen(false);
    } catch (err) {
      alert("Failed to create order");
    }
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <div>
          <h2>Orders Dashboard</h2>
          <p className="text-muted">Manage real-time and manual orders</p>
        </div>
        
        <div className="header-actions">
          <select 
            className="status-select"
            onChange={(e) => setFilterStatus(e.target.value)}
            value={filterStatus}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button className="primary-btn add-order-btn" onClick={() => setIsModalOpen(true)}>
            + Create Order
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="table-msg">Loading orders...</td></tr>
            ) : orders.length > 0 ? (
              orders.map(order => (
                <tr key={order._id}>
                  <td className="order-id">#{order._id.slice(-5).toUpperCase()}</td>
                  <td>
                    <div className="cust-info">
                      <strong>{order.customerName}</strong>
                      <span>{order.items?.length || 0} items</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="order-amount">₹{order.totalAmount}</td>
                  <td className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <select 
                      className="action-select"
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="table-msg">No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Manual Order Modal */}
      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveOrder}
        menuItems={menuItems}
      />
    </div>
  );
};

export default OrdersPage;