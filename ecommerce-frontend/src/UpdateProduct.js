import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateProduct() {
    const { id } = useParams();  // Get the product ID from the URL
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        // Fetch the product details based on the product ID
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                const product = response.data;
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setCategory(product.category);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProduct = { name, description, price, category };
        await axios.put(`http://localhost:5000/products/${id}`, updatedProduct);
        alert('Product updated successfully');
        navigate('/products');  // Redirect back to the product list page
    };

    return (
        <div className="update-product">
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <label>
                    Price:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </label>
                <label>
                    Category:
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </label>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
}

export default UpdateProduct;
