import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

function EditProduct(props) {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
            async function getProduct(){
                try {
                    const res  = await axios.get(`http://localhost:4000/product/${id}`);
                    const data = res.data;
                    setTitle(data.title)
                    setDescription(data.description)
                    setPrice(data.price)
                }catch (er){
                    console.log("errr getting product");
                }
            }


        getProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        if(image){
            formData.append("image", image);
        }

        try{
            await axios.put(`http://localhost:4000/product/edit/${id}`, formData, {withCredentials:true});
            navigate("/products")
        }catch(er){
            console.log("err edit formadata");
        }
    }

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

    /*const getProduct = async () => {
        try{
            const res = await axios.get(`http://localhost:4000/product/${id}`);
            const prodData = res.data;
            setTitle(prodData.title);
            setDescription(prodData.description);
        }catch(er){
            console.log("errr get");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.put(`http://localhost:4000/product/edit/${id}`, {title:title, description:description, withCredentials:true});
            navigate("/products");
        }catch(er){
            console.log("err update");
        }
    }

    useEffect(() => {
        getProduct();
    }, []);
*/
    return (
        <div>
            <form onSubmit={handleSubmit} className="w-50 m-auto pt-5">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">title</label>
                    <input type="text"
                           className="form-control"
                           name="title"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           placeholder="title"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">description</label>
                    <input type="text"
                           className="form-control"
                           name="description"
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                           placeholder="password"
                    />
                </div>
                <div>
                    <input type="file" accept="image/*" onChange={handleImage}/>
                </div>
                <button type="submit" className="btn btn-primary">edit</button>
            </form>
            <Link to="/products">retour</Link>
        </div>
    );
}

export default EditProduct;