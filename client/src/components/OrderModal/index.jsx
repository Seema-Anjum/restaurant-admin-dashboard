import React, { useState } from "react";

const OrderModal = ({ isOpen, onClose, onSave, menuItems }) => {
  const [customerName, setCustomerName] = useState("");
  const [selectedItems, setSelectedItems] = useState([]); // Array of { itemId, name, price, quantity }

  const addItemToOrder = (item) => {
    const existing = selectedItems.find(i => i.itemId === item._id);
    if (existing) {
      setSelectedItems(selectedItems.map(i => 
        i.itemId === item._id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setSelectedItems([...selectedItems, { 
        itemId: item._id, 
        name: item.name, 
        price: item.price, 
        quantity: 1 
      }]);
    }
  };

  const calculateTotal = () => selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      customerName,
      items: selectedItems,
      totalAmount: calculateTotal(),
      status: "Pending"
    };
    onSave(orderData);
    setCustomerName("");
    setSelectedItems([]);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create New Manual Order</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Customer Name" 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)} 
            required 
          />

          <div className="item-picker">
            <p>Select Items:</p>
            <select onChange={(e) => addItemToOrder(JSON.parse(e.target.value))}>
              <option value="">-- Choose a dish --</option>
              {menuItems.map(item => (
                <option key={item._id} value={JSON.stringify(item)}>
                  {item.name} - ₹{item.price}
                </option>
              ))}
            </select>
          </div>

          <ul className="selected-items-list">
            {selectedItems.map((item, idx) => (
              <li key={idx}>
                {item.name} x {item.quantity} - ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>

          <div className="order-summary">
            <strong>Total: ₹{calculateTotal()}</strong>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-btn">Create Order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;