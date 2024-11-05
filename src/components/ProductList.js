import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/productList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from local storage
                const response = await axios.get('http://localhost:5000/api/inventory', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response.data); // Log the response data for debugging

                // Fetch subcategory names for each product
                const productsWithSubcategories = await Promise.all(response.data.products.map(async product => {
                    const subcategoryResponse = await axios.get(`http://localhost:5000/api/subcategories/${product.subcategory}`);
                    return {
                        ...product,
                        subcategoryName: subcategoryResponse.data.name // Assuming the subcategory has a name field
                    };
                }));

                setProducts(productsWithSubcategories); // Set the products with subcategory names
            } catch (err) {
                setError('Failed to fetch products');
                console.error(err); // Log the error for better debugging
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Product List</h2>
            {products.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Subcategory</th>
                            <th>Price</th>
                            <th>Discount Price</th>
                            <th>Quantity</th>
                            <th>SKU</th>
                            <th>Image URL</th>
                            <th>Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.subcategoryName || 'N/A'}</td> {/* Display the subcategory name */}
                                <td>{product.price}</td>
                                <td>{product.discountPrice !== null ? product.discountPrice : 'N/A'}</td> {/* Handle discount price */}
                                <td>{product.stockQuantity}</td>
                                <td>{product.sku}</td>
                                <td>{product.imageUrl}</td>
                                <td>{product.tags.join(', ') || 'N/A'}</td> {/* Display tags as a comma-separated list */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products available</p> // Fallback message if there are no products
            )}
        </div>
    );
};

export default ProductList;