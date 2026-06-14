import axios from "axios";
import { data } from "react-router-dom";

const api = axios.create({
    baseURL:"http://localhost:8080",
    withCredentials: true,
    headers:{"Content-Type":"application/json"}

})

//login

export const userLogin = (data)=>{

    return api.post("/login",data);
}

//signup

export const userSignUp = (data)=>{
    return api.post("/signup",data);
}

//checking login

export const fetechLogin = () =>{

    return api.get("/me")
}

//fetchingpost 

export const fetchPost = ()=>{

    return api.get("/post")
}



