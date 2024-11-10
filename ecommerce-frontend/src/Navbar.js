import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        onLogout();
        navigate('/signup');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">E-Shop</Link>
            </div>
            <button className="navbar-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/create-product">Create Product</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;