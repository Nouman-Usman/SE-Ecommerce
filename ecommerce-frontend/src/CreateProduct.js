import React, { useState } from 'react';
import axios from 'axios';

function CreateProduct() {
    const [product, setProduct] = useState({ name: '', price: '', description: '', category: '' });

    const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/products', product);
        alert('Product created');
    };

    return (
        <form onSubmit={handleSubmit} className="create-product">
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
            <button type="submit">Create Product</button>
        </form>
    );
}

export default CreateProduct;
