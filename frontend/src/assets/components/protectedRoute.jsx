// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useState } from "react";

// const ProtectedRoute = ({children})=>{

//   // const navigate = useNavigate();

//   const {user,checking} = useAuth();


//   if(checking){

//     return(
//       <h1>...loading</h1>
//     )
//   }

//   if(!user){

//     return <Navigate to="/login"/>

//   }
//   else{
//     return children;

//   }



// }

// export default ProtectedRoute;


// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, checking } = useAuth();

  // Show a loading state while checking authentication
  if (checking) {
    return <h1>Loading...</h1>;
  }

  // If no user, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />; // 'replace' is a good practice
  }

  // If user exists, render the children
  return children;
};

export default ProtectedRoute;