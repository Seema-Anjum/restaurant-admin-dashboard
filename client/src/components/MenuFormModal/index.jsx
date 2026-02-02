import { useState, useEffect } from "react";
import "./index.css"; 

const MenuFormModal = ({ isOpen, onClose, onSave, editItem }) => {
  const [formData, setFormData] = useState({
    name: "", category: "", price: "", description: "", imageUrl: ""
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    } else {
      setFormData({ name: "", category: "", price: "", description: "", imageUrl: "" });
    }
  }, [editItem, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>{editItem ? "Update Item" : "Create Item"}</h3>
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <input 
            type="text" placeholder="Dish Name" required
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
          <input 
            type="text" placeholder="Category (e.g. Starters)" required
            value={formData.category} 
            onChange={(e) => setFormData({...formData, category: e.target.value})} 
          />
          <input 
            type="number" placeholder="Price (₹)" required
            value={formData.price} 
            onChange={(e) => setFormData({...formData, price: e.target.value})} 
          />
          <input 
            type="text" placeholder="Image URL"
            value={formData.imageUrl} 
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} 
          />
          <textarea 
            placeholder="Description" 
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
          />
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuFormModal;