import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const ProtectedRoute = ({children})=>{

  // const navigate = useNavigate();

  const {user,checking} = useAuth();


  if(checking){

    return(
      <h1>...loading</h1>
    )
  }

  if(!user){

    return <Navigate to="/login"/>

  }
  else{
    return children;

  }



}

export default ProtectedRoute;