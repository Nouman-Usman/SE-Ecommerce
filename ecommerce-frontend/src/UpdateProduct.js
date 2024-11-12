import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from './config';
import './UpdateProduct.css';

function UpdateProduct() {
    const { id } = useParams();  // Get the product ID from the URL
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the product details based on the product ID
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${config.backendUrl}products/${id}`);
                const product = response.data;
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setCategory(product.category);
            } catch (error) {
                setError('Failed to load product details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProduct = { name, description, price, category };
        try {
            await axios.put(`${config.backendUrl}products/${id}`, updatedProduct);
            alert('Product updated successfully');
            navigate('/products');  // Redirect back to the product list page
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    if (isLoading) return <div className="loading">Loading product details...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="update-product-container">
            <div className="update-product-card">
                <h2>Update Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter product name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Enter product description"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                id="price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                placeholder="Enter price"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <input
                                id="category"
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                placeholder="Enter category"
                            />
                        </div>
                    </div>
                    <div className="button-group">
                        <button type="button" className="secondary" onClick={() => navigate('/products')}>
                            Cancel
                        </button>
                        <button type="submit" className="primary">
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateProduct;
