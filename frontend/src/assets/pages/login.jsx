import { useState,useEffect } from "react"
import { data } from "react-router-dom";
import { userLogin } from "../services/api";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProtectedRoute from "../components/protectedRoute";
import "../../assets/styling/login.css"

export default function Login() {

    let navigate = useNavigate();
    let {errorMessage,login} = useAuth();
    
   

    let [data,setData] = useState({username:"",password:""});
    let [loading,setLoading] = useState(false);
    let [response,setResponse] = useState("");
    let [error,setError] = useState("");


    async function handleOnSubmit(event){

        event.preventDefault();
        setLoading(true)
        await userLogin(data).then((res)=>{

            // console.log(res.status)
            if(res.status==200){
                login(res.data)
                navigate("/home")
            }
            

        }).catch((err)=>{

            if(err.response.status==401){

                setError("password is wrong");

            }
            else if (err.response.status==404){

                setError("user not exist");

            }

            

        })
        setLoading(false)



    }

    function handleOnchange (event){

        setData({...data,[event.target.name]:event.target.value});

        
        

    }


  return (
  <div className="login-container">
    <div className="login-wrapper">
      <h1 className="login-title">Welcome Back</h1>
      <p className="login-subtitle">Sign in to continue to your account</p>

      {response && <div className="success-message">{response}</div>}
      {error && <div className="error-message">{error}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleOnSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label">Username</label>
          <input 
            className="login-input"
            placeholder="Enter your username" 
            name="username" 
            onChange={handleOnchange} 
            value={data.username}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            className="login-input"
            type="password"
            placeholder="Enter your password" 
            name="password" 
            onChange={handleOnchange} 
            value={data.password}
          />
        </div>
        
        <button 
          className="login-button" 
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <nav className="login-nav">
        <Link to={"/signup"} className="login-link">
          Don't have an account? Sign up
        </Link>
      </nav>
    </div>
  </div>
)}