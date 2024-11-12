import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './auth/Signup';
import Login from './auth/Login';
import ProductList from './ProductList';
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';
import Navbar from './Navbar';
import './App.css';
import './UpdateProduct.css';
import './ProductList.css';
import './Navbar.css';
import './CreateProduct.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="app-wrapper">
                <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/signup" />} />
                        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/products" element={isAuthenticated ? <ProductList /> : <Navigate to="/signup" />} />
                        <Route path="/create-product" element={isAuthenticated ? <CreateProduct /> : <Navigate to="/signup" />} />
                        <Route path="/update-product/:id" element={isAuthenticated ? <UpdateProduct /> : <Navigate to="/signup" />} />
                    </Routes>
                </main>
                <footer className="app-footer">
                    <p>© 2023 E-commerce App. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;