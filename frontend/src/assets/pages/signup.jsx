import { useState } from "react";
import { Link } from "react-router-dom";
import { userSignUp } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function SignUp() {

  let [data,setData] = useState({username:"",password:""})
  let [error, setError] = useState("");

  let {login} = useAuth();

  let navigate = useNavigate();


  async function  handleOnSubmit(event) {

    event.preventDefault();

    await userSignUp(data).then((res)=>{

      if(res.status==200){
        login(res.data);
        navigate("/home");
      }

    }).catch((err)=>{

      // console.log(err.status);
      if(err.status==409){
        
        setError("account already exist");
      }
      else if (err.status==500){

        setError("some error in setting up account");

      }

    })
    
  }

  function handleOnChnage (event){

    setData({...data,[event.target.name]:event.target.value});


  }
  return (
    <>

      <h1>signup</h1>

      {error?<h1>{error}</h1>:null}
  
        <Link to={"/login"}>already have account?login</Link>

        <form onSubmit={handleOnSubmit} >

          <input type="text" placeholder="enter your username ..."  name="username" value={data.username} onChange={handleOnChnage}/>

          <input type="text" placeholder="enter your password ..."  name="password" value={data.password} onChange={handleOnChnage}/>

          <button>signUp</button>

        </form>
        
    </>
  );
}
