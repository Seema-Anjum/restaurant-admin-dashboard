import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MenuCard from "../components/MenuCard";
import MenuFormModal from "../components/MenuFormModal";

const MenuPage = ({ searchTerm }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Memoized fetch function to handle both initial load and search
  const fetchMenu = useCallback(async (query = "") => {
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const endpoint = query 
        ? `${baseUrl}/menu/search?query=${encodeURIComponent(query)}`
        : `${baseUrl}/menu`;
      
      const res = await axios.get(endpoint);
      const data = Array.isArray(res.data) ? res.data : res.data.items || [];
      setMenu(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync with the search term from Navbar
  useEffect(() => {
    fetchMenu(searchTerm);
  }, [searchTerm, fetchMenu]);

  const handleSaveItem = async (formData) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      if (selectedItem) {
        const res = await axios.put(`${baseUrl}/menu/${selectedItem._id}`, formData);
        setMenu(menu.map((item) => (item._id === selectedItem._id ? res.data : item)));
      } else {
        const res = await axios.post(`${baseUrl}/menu`, formData);
        const newItem = res.data.item || res.data;
        setMenu([newItem, ...menu]);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save item");
    }
  };

  const toggleAvailability = async (id) => {
    const prevMenu = [...menu];
    setMenu(menu.map(item => item._id === id ? { ...item, isAvailable: !item.isAvailable } : item));

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/menu/${id}/availability`);
    } catch (err) {
      setMenu(prevMenu);
      alert("Failed to update availability");
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/menu/${id}`);
      setMenu(menu.filter((item) => item._id !== id));
    } catch (err) {
      alert("Failed to delete item");
    }
  };

  return (
    <div className="menu-page-container">
      <div className="menu-header">
        <h2>{searchTerm ? `Results for "${searchTerm}"` : "Menu Management"}</h2>
        <button className="primary-btn" onClick={() => { setSelectedItem(null); setIsModalOpen(true); }}>
          + Add Menu Item
        </button>
      </div>

      {loading ? (
        <div className="status-msg">Loading items...</div>
      ) : (
        <div className="menu-grid">
          {menu.length === 0 ? (
            <p className="status-msg">No menu items found.</p>
          ) : (
            menu.map((item) => (
              <MenuCard
                key={item._id}
                item={item}
                onToggle={toggleAvailability}
                onDelete={deleteItem}
                onEdit={() => { setSelectedItem(item); setIsModalOpen(true); }}
              />
            ))
          )}
        </div>
      )}

      <MenuFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        editItem={selectedItem}
      />
    </div>
  );
};

export default MenuPage;