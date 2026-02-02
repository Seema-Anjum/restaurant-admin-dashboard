import "./index.css";

const MenuCard = ({ item, onToggle, onDelete, onEdit }) => {
  if (!item) return null;

  return (
    <div className="menu-card">
      <img
        src={item.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
        alt={item.name}
        className="menu-image"
      />

      <div className="menu-body">
        <div className="menu-title">
          <h3>{item.name}</h3>
          <span className="price">₹{item.price}</span>
        </div>

        <span className="category">{item.category}</span>

        <div className="menu-actions">
          <button
            className={`status-btn ${
              item.isAvailable ? "available" : "unavailable"
            }`}
            onClick={() => onToggle(item._id)}
          >
            {item.isAvailable ? "Available" : "Unavailable"}
          </button>

          <button className="edit-btn" onClick={onEdit}>
            Edit
          </button>

          <button className="delete-btn" onClick={() => onDelete(item._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
