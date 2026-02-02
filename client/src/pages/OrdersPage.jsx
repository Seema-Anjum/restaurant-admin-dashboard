import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../styles/orders.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchOrders();
    // Optional: Poll for new orders every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/orders/${id}`, { 
        status: newStatus 
      });
      // Update local state to show change immediately
      setOrders(prev => 
        prev.map(o => o._id === id ? { ...o, status: newStatus } : o)
      );
    } catch (err) {
      alert("Update failed. Please try again.");
    }
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <div>
          <h2>Orders Dashboard</h2>
          <p className="text-muted">Manage incoming and past orders</p>
        </div>
        <div className="filter-group">
          <span>Filter by Status:</span>
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
        </div>
      </div>

      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="table-loader">Fetching orders...</td></tr>
            ) : orders.length > 0 ? (
              orders.map(order => (
                <tr key={order._id}>
                  <td className="order-id">#{order._id.slice(-5).toUpperCase()}</td>
                  <td>
                    <div className="customer-info">
                      <strong>{order.customerName}</strong>
                      <span>{order.phone || "No contact"}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="order-amount">₹{order.totalAmount || 0}</td>
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
              <tr><td colSpan="5" className="empty-table">No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;