import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {addPost} from "../services/api";

export default function AddPost (){


    let [data,setData] = useState({content:""});
    let [error,setError] = useState("");

    let naviagte = useNavigate();



    async function handleOnSubmit(event) {

        event.preventDefault();

        await addPost(data).then(()=>{

            console.log("added sucessfully");

            naviagte("/home");

        }).catch((err)=>{
            console.log(err);
            setError(err);
        })



        
    }

    function handleOnChange(event){

        setData({...data,[event.target.name]:event.target.value})

    }

    return(
        <>

        {error?<h1>{error}</h1>:null}

        <h1>add post</h1>

        <form onSubmit={handleOnSubmit}>
            <label >add post</label>
            <input type="add post..." name="content" placeholder="add post...." value={data.content}  required onChange={handleOnChange} />
            <button>add post</button>
        </form>
        
        </>
    )

}