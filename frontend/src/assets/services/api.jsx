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

export const addPost = (data)=>{

    return api.post("/post",data)
}

export const updatePost = (postId,data)=>{

    return api.patch(`/post/${postId}`,data);
}

export const addComment = (postId,data)=>{

    return api.post(`/post/comment/${postId}`,data);
}

export const deleteComment = (commentId,userId)=>{

    // console.log("W")

    return api.delete(`/post/comment/${commentId}/${userId}`);
}


export const seeRecievedRequests = (userId)=>{

    return api.get(`/request/recieved/${userId}`)
}

