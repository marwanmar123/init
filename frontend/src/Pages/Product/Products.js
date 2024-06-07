import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import CreateProduct from "./CreateProduct";
import {useCookies} from "react-cookie";

function Products(props) {
    const [products, setProducts] = useState([]);
    const [deleteMessage, setDeleteMessage] = useState("");
    const [cookies] = useCookies(["token"]);
    const isAuthenticarted = cookies.token;
    const navigate = useNavigate();

    const getProducts = async () => {
        const prods = await axios.get("http://localhost:4000/products");
        setProducts(prods.data)
    }

    const handleDelete = async (id) => {
        if(window.confirm("wach bs7 bghtu")){
        try{
            await axios.delete(`http://localhost:4000/product/delete/${id}`);
            setProducts(products.filter((p) => p._id !== id));
            setDeleteMessage("rah tsuprima");
        }catch(er){
            console.log("mochkil f delete");
        }
        }
    }
    useEffect(() => {
        if(!isAuthenticarted){
            navigate("/login")
        }
        getProducts();
        if(deleteMessage){
            setTimeout(() => {
                setDeleteMessage(null)
            },2000)
        }
    }, [isAuthenticarted,products, deleteMessage, navigate]);

    return (
        <div>

            <CreateProduct/>
            {deleteMessage && <p className="alert alert-success">{deleteMessage}</p>}
            <Link to="/product/create">Add</Link>
            <table className="table table-striped table-dark">
                <thead>
                <tr>
                    <th scope="col">title</th>
                    <th scope="col">description</th>
                    <th scope="col">image</th>
                    <th scope="col">author</th>
                    <th scope="col">action</th>
                </tr>
                </thead>
                <tbody>
                {products.map((p) => (
                    <tr key={p._id}>
                        <td>{p.title}</td>
                        <td>{p.description}</td>

                        <td>
                            <img src={`http://localhost:4000/uploads/${p.image}`} width={50} alt=""/>
                        </td>
                        <td>{p.author?.username}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(p._id)}>delete</button>
                            <Link className="btn btn-secondary" to={`/product/edit/${p._id}`}>edit</Link>
                            <Link className="btn btn-primary" to={`/product/${p._id}`}>details</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
}

export default Products;