import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CreateProduct(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [selectImage, setSelectImage] = useState(null);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("image", selectImage);
        try {
            await axios.post("http://localhost:4000/product/create", formData, {withCredentials:true});

            navigate("/products");

        }catch(er){
            console.log("err formdata");
        }
        setTitle("");
        setDescription("");
        setPrice(0);
    }

    const handleImage = (e) => {
        if(e.target.files && e.target.files[0]){
            setImage(URL.createObjectURL(e.target.files[0]))
            setSelectImage(e.target.files[0])
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-50 m-auto pt-5">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">product</label>
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
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">price</label>
                    <input type="number"
                           className="form-control"
                           name="price"
                           value={price}
                           onChange={(e) => setPrice(e.target.value)}
                           placeholder="price"
                    />
                </div>
                <div>
                    <input type="file" accept="image/*" onChange={handleImage}/>
                    <img src={image} alt="" width={50}/>
                </div>
                <button type="submit" className="btn btn-primary">create</button>
            </form>
        </div>
    );
}

export default CreateProduct;