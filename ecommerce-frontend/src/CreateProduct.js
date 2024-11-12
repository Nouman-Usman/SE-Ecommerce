import React, { useState } from 'react';
import axios from 'axios';
import config from './config';
import './CreateProduct.css';

function CreateProduct() {
    const [product, setProduct] = useState({ name: '', price: '', description: '', category: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${config.backendUrl}products`, product);
            setSuccess(true);
            setProduct({ name: '', price: '', description: '', category: '' });
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Error creating product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-product-container">
            <form onSubmit={handleSubmit} className="create-product">
                <h2>Create New Product</h2>
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        id="category"
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                        rows="4"
                    />
                </div>
                {success && <div className="success-message">Product created successfully!</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
}

export default CreateProduct;
