import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import OrdersPage from "./pages/OrdersPage"; 
import Navbar from "./components/Navbar";

import "./App.css";
import HomePage from "./components/Home";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <div className="app-container"> 
        <Navbar onSearch={setSearchTerm} />
           <div className="main-container">
            <main className="content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage searchTerm={searchTerm}/>} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="*" element={<div>Page Not Found</div>} />
              </Routes>
            </main>
          </div> 
        </div>
    </Router>
  );
};

export default App;