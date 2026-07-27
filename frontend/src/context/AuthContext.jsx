// // flow of protected route in forntend 

// // make cutom hook hook and its must be function and use some other hooke andd name must start form use 

// // useAuth and use empty container using create conetxt 

// // check weather user login or not if login set user elese not 

// // at end export the cusytom hook to use in other 

// // make protected route and render the page if if login else maove abck to login

// // use to store login in login 

// // and also use in main to protect overall and app to protect specfic route 

// // make a route to scheck user is login untill cookie expire so user not logout when refresh 


// import { createContext,useState,useEffect,useContext } from "react";

// import {fetechLogin} from "../assets/services/api";   //fetching the route 

// const AuthContext = createContext();  //creating empty container 


// export const AuthProvider = ({children})=>{

//   let [user,setUser] = useState(null);  //intailly not login

//   let [checking,setChecking] = useState(true);

//   let [message,setMessage] = useState(""); //intailly no message 

//   let [errorMessage,setErrorMessage] = useState(""); //intailly no error

//   useEffect(()=>{
    
//     fetechLogin()
//     .then((res)=>{
//       // console.log(res.data)
//       setMessage("user login successful");
//       setUser(res.data.user);

//     }).catch((err)=>{
//       // console.log(err.response.data)
//       setErrorMessage(err.response.data.message);
//       setUser(null);

//     }).finally(()=>{

//       setChecking(false);

//     })

//   },[]) 


//   const login = (userData)=>{setUser(userData)};  //every component can see weather login or not 

//   const logout = ()=>{setUser(null)};

//   if(checking)
//   {
//     return <h1>...loading</h1>
//   }

//   return (
//     <AuthContext.Provider value={{login,logout,user,checking,message,errorMessage}}>
//       {children}
//     </AuthContext.Provider>
//   )


// }

// export const useAuth = ()=>useContext(AuthContext);


import { createContext, useState, useEffect, useContext } from "react";
import { fetechLogin } from "../assets/services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [checking, setChecking] = useState(true);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // ✅ NO cookies - just call /me with token
        fetechLogin()
            .then((res) => {
                setUser(res.data.user);
                setMessage("User verified");
            })
            .catch((err) => {
                console.error('Auth error:', err);
                setUser(null);
                setErrorMessage(err.response?.data?.message || 'Please login');
            })
            .finally(() => {
                setChecking(false);
            });
    }, []);

    const login = (userData) => {
        setUser(userData);
        setErrorMessage("");
    };

    const logout = () => {
        setUser(null);
        // Cookie will expire naturally or you can add a logout endpoint
    };

    if (checking) {
        return <h1>Loading...</h1>;
    }

    return (
        <AuthContext.Provider value={{ login, logout, user, checking, message, errorMessage }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);