import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addProd} from "../../Redux/cartSlice";

function ProductDetails(props) {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getProduct = async () => {
        try{
            const res = await axios.get(`http://localhost:4000/product/${id}`);
            setProduct(res.data);
        }catch(er){
            console.log("errrr getting prod");
        }
    }

    useEffect(() => {

        getProduct();
    }, [id]);

    const handleAddToCart = () => {
        if(product._id){
            dispatch(addProd({product, quantity: 1}))
            navigate("/cart");
        }else{
            console.log("makaynch had lprod");
        }
    }


    return (
        <div>
            <h5>Product Detail</h5>
            <h4>{product.title}</h4>
            <h4>{product.description}</h4>
            <h4>{product.price}</h4>
            <button onClick={handleAddToCart} className="btn btn-success">add to cart</button>
        </div>
    );
}

export default ProductDetails;
