// Cart.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems, selectTotalPrice, addProd, updateQuantity, removeItem, updateCartCount } from '../../Redux/cartSlice';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cart() {
    const { id } = useParams();
    const items = useSelector(selectItems);
    const totalPrice = useSelector(selectTotalPrice);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) { // Check if id is defined
            const getProduct = async () => {
                try {
                    const res = await axios.get(`http://localhost:4000/product/${id}`);
                    dispatch(addProd({ product: res.data, quantity: 1, price: res.data.price })); // Include price here
                    dispatch(updateCartCount());
                } catch (error) {
                    console.log("Error adding to cart: ", error);
                }
            };
            getProduct();
        }
    }, [id, dispatch]);

    const handleRemoveItem = (productId, quantity) => {
        dispatch(removeItem({ productId, quantity }));
    };

    const handleIncrement = (productId) => {
        const item = items.find(item => item.product._id === productId);
        dispatch(updateQuantity({ productId, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (productId) => {
        const item = items.find(item => item.product._id === productId);
        if (item.quantity > 1) {
            dispatch(updateQuantity({ productId, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem({ productId, quantity: 1 }));
        }
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {items.map(item => (
                    <li key={item.product._id}>
                        <span>{item.product.title} - Quantity: {item.quantity} - Price: ${item.product.price}</span> {/* Display price here */}
                        <button onClick={() => handleDecrement(item.product._id)}>-</button>
                        <button onClick={() => handleIncrement(item.product._id)}>+</button>
                        <button onClick={() => handleRemoveItem(item.product._id, item.quantity)}>Remove</button>
                    </li>
                ))}
            </ul>
            <p>Total Price: ${totalPrice}</p>
            <button onClick={() => navigate('/products')}>Back to Products</button>
        </div>
    );
}

export default Cart;
