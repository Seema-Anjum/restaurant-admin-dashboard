### 🍽️  Restaurant Management Dashboard
RestroAdmin is a full-stack administrative dashboard designed for restaurant owners to manage their digital menu and track customer orders in real-time. Built with the MERN stack (MongoDB, Express, React, Node.js), it features a highly responsive UI with a unified search system and a centralized order tracking dashboard.


### 🚀 Project Overview

This application enables restaurant admins to:

Manage menu items (CRUD operations)

Control item availability in real time

Search menu items instantly

Track and update customer orders

View orders by status (Pending, Preparing, Delivered)

The focus is on clean UI, predictable state management, and production-ready architecture.

### ✨ Features Implemented
🔹 Menu Management

Add, edit, delete menu items

Toggle availability (Available / Unavailable)

Image support with fallback

Category & pricing support

🔹 Search

Global debounced search from Navbar

Auto-redirect to Menu page while searching

Server-side search API

🔹 Orders Dashboard

View all orders

Filter by status

Update order status in real time

🔹 UX Enhancements

Optimistic UI updates

Modal-based add/edit forms

Responsive grid layout

Clean component separation

### 🛠️ Tech Stack

### Frontend

React (Vite)
React Router
Axios
CSS (custom, no frameworks)

### Backend

Node.js
Express.js

MongoDB (Atlas)

Mongoose

### ✅ Prerequisites

Make sure you have the following installed:

Node.js (v18+ recommended)

npm or yarn

MongoDB Atlas account (or local MongoDB)

Git

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/restaurant-admin-dashboard.git
cd restaurant-admin-dashboard

### 2️⃣ Install dependencies

Frontend

cd client
npm install


Backend

cd server
npm install

### 3️⃣ Start the application

Backend

npm run dev


Frontend

npm run dev

### 🔐 Environment Variables
Frontend (client/.env)
VITE_API_URL=http://localhost:5000/api

### Backend (server/.env)
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string

### 🔌 API Endpoints Documentation
📌 Menu APIs
Get all menu items
GET /api/menu


Response

[
  {
    "_id": "abc123",
    "name": "Veg Burger",
    "category": "Fast Food",
    "price": 120,
    "isAvailable": true
  }
]

Search menu items
GET /api/menu/search?query=burger

Create menu item
POST /api/menu


Request

{
  "name": "Pizza",
  "category": "Italian",
  "price": 250,
  "description": "Cheesy delight"
}

Update menu item
PUT /api/menu/:id

Toggle availability
PATCH /api/menu/:id/availability

Delete menu item
DELETE /api/menu/:id

📌 Orders APIs
Get all orders
GET /api/orders

Filter orders by status
GET /api/orders?status=Pending

Update order status
PATCH /api/orders/:id


Request

{
  "status": "Delivered"
}

🧠 Challenges Faced & Solutions
1️⃣ Search state mismatch

Problem: Navbar search wasn’t updating Menu page data
Solution: Lifted search state to App.jsx and passed it down as a prop

 
 ### 🚀 Getting Started
 Prerequisites
 Node.js (v16.x or higher)
 MongoDB Atlas account or local MongoDB instancenpm or yarnInstallationC
 lone the repository:Bashgit clone https://github.com/yourusername/restro-admin.git

cd restro-admin
Install Backend Dependencies:Bashcd backend
npm install
Install Frontend Dependencies:Bashcd ../frontend
npm install
Seed the Database:To populate your database with initial menu items (Paneer Tikka, Butter Chicken, etc.):Bashcd ../backend
node seed.js
🔑 Environment VariablesCreate a .env file in the backend directory:Code snippetPORT=5000
MONGO_URI=your_mongodb_connection_string
Create a .env file in the frontend directory:Code snippetVITE_API_URL=http://localhost:5000/api
📡 API EndpointsMenu ItemsMethodEndpointDescriptionGET/api/menuFetch all menu itemsGET/api/menu/search?query=...Search items by name or categoryPOST/api/menuAdd a new dishPATCH/api/menu/:id/availabilityToggle item stock statusExample Search Response:JSON{
  "_id": "65af...",
  "name": "Paneer Tikka",
  "price": 220,
  "category": "Appetizer",
  "isAvailable": true
}
OrdersMethodEndpointDescriptionGET/api/ordersFetch all ordersPATCH/api/orders/:idUpdate order status (Pending/Delivered)
### 🛠 Challenges & Solutions
1️⃣ Search state mismatch

Problem: Navbar search wasn’t updating Menu page data
Solution: Lifted search state to App.jsx and passed it down as a prop

2️⃣ UI flicker during updates

Problem: Availability toggle felt slow
Solution: Implemented optimistic UI updates with rollback on failure

3️⃣ CSS layout breaking on resize

Problem: Grid + flex conflict
Solution: Replaced flex layout with pure CSS Grid for menu cards

4️⃣ API response inconsistency

Problem: Different response shapes (items vs array)
Solution: Defensive parsing in frontend data layer 





