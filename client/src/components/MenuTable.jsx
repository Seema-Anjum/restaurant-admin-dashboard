const MenuTable = ({ items, onToggle }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Image</th>
        <th>Available</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item) => (
        <tr key={item._id}>
          <td>{item.name}</td>
          <td>{item.category}</td>
          <td>₹{item.price}</td>
          <td>{item.imageUrl}</td>
          <td>
           <button
  onClick={() => toggleAvailability(item._id)}
  className={`px-3 py-1 rounded ${
    item.isAvailable ? "bg-green-500" : "bg-red-500"
  } text-white`}
>
  {item.isAvailable ? "Available" : "Unavailable"}
</button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default MenuTable;
