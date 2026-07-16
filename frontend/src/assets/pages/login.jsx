import { useState,useEffect } from "react"
import { data } from "react-router-dom";
import { userLogin } from "../services/api";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProtectedRoute from "../components/protectedRoute";

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
    <>

    <h1>Login</h1>

    {response?<h1>{response}</h1>:null}
    {error?<h1>{error}</h1>:null}
    {errorMessage?<h1>{errorMessage}</h1>:null}
    {/* {protectedMessage?<h1>{protectedMessage}</h1>:null} */}

    <nav>

      {/* <Link to={"/login"}>login</Link> */}
      <Link to={"/signup"}>not have have account?sigup</Link>

    </nav>

    <form onSubmit={handleOnSubmit} >
        <input placeholder="enter username" name="username" onChange={handleOnchange} value={data.username}></input>
        <input placeholder="enter password" name="password" onChange={handleOnchange}  value={data.password}></input>
        <button>{loading?"...login innnn":"login"}</button>
    </form>
    </>
  )
}
