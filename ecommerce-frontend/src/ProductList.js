import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from './config';
import './ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get(`${config.backendUrl}products`)
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${config.backendUrl}products/${id}`);
            alert('Product deleted successfully');
            fetchProducts();  // Refresh the list of products
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="product-list-container">
            <div className="product-list-header">
                <h2>Product List</h2>
                <p>{products.length} Products Available</p>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="product-grid">
                {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product._id} className="product-card">
                            <div className="product-content">
                                <h3>{product.name}</h3>
                                <p className="description">{product.description}</p>
                                <p className="price">${product.price}</p>
                            </div>
                            <div className="product-actions">
                                <Link to={`/update-product/${product._id}`}>
                                    <button className="edit-btn">Edit</button>
                                </Link>
                                <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-products">No products found</p>
                )}
            </div>
        </div>
    );
}

export default ProductList;
