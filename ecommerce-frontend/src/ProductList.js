import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from './config';

function ProductList() {
    const [products, setProducts] = useState([]);

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

    return (
        <div className="product-list">
            <h2>Product List</h2>
            <div className="product-items">
                {Array.isArray(products) ? (
                    products.map(product => (
                        <div key={product._id} className="product-item">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <Link to={{
                                pathname: `/update-product/${product._id}`,
                                state: { product }
                            }}>
                                <button>Edit</button>
                            </Link>
                            <button onClick={() => handleDelete(product._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
}

export default ProductList;
