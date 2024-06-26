import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CreateCategory(props) {
    const [inputValue, setInputValue] = useState({
        name:""
    });

    const navigate = useNavigate();

    const {name} = inputValue;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name]:value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await axios.post("http://localhost:4000/category/create",{...inputValue}, {withCredentials:true});
            navigate("/category")
        }catch (err){
            console.log("errrrr");
        }
        setInputValue({
           name:""
        })
    }


    return (
        <form onSubmit={handleSubmit} className="w-50 m-auto pt-5">
            <div className="mb-3">
                <label className="form-label">category name</label>
                <input type="text" name="name" value={name} onChange={handleChange} className="form-control" aria-describedby="emailHelp"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default CreateCategory;