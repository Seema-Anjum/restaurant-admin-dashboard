import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiShoppingBag, FiDollarSign, FiList, FiTrendingUp } from "react-icons/fi";
import "./index.css";

const HomePage = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeMenu: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const [ordersRes, menuRes] = await Promise.all([
          axios.get(`${baseUrl}/orders`),
          axios.get(`${baseUrl}/menu`),
        ]);

        const orders = ordersRes.data || [];
        const menu = menuRes.data || [];
        const revenue = orders
          .filter(o => o.status === "Delivered")
          .reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

        setStats({
          totalOrders: orders.length,
          totalRevenue: revenue,
          activeMenu: menu.length,
          recentOrders: orders.slice(-5).reverse(),
        });
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div className="loader">Loading Dashboard...</div>;

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Dashboard Overview</h1>
        <p>Monitor your restaurant's performance at a glance.</p>
      </header>

      {/* Row of Stats Cards */}
      
      <div className="stats-row">
        <div className="stat-card">
          <div className="icon-wrapper green"><FiDollarSign /></div>
          <div className="stat-info">
            <p>Revenue</p>
            <h3>₹{stats.totalRevenue}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-wrapper blue"><FiShoppingBag /></div>
          <div className="stat-info">
            <p>Orders</p>
            <h3>{stats.totalOrders}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-wrapper purple"><FiList /></div>
          <div className="stat-info">
            <p>Menu Items</p>
            <h3>{stats.activeMenu}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-wrapper orange"><FiTrendingUp /></div>
          <div className="stat-info">
            <p>Avg Order</p>
            <h3>₹{(stats.totalRevenue / (stats.totalOrders || 1)).toFixed(0)}</h3>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Orders</h3>
        <div className="activity-list">
          {stats.recentOrders.map((order) => (
            <div key={order._id} className="activity-item">
              <strong>{order.customerName}</strong>
              <span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span>
              <span className="price">₹{order.totalAmount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;