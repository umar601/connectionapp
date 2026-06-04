import Login from "./assets/pages/login"
import SignUp from "./assets/pages/signup";
import {Routes,Route,Link} from "react-router-dom";
import HomePage from "./assets/pages/homepage";

function App() {
 

  return (

    <>



    <Routes>

    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/home" element={<HomePage/>}/>

    </Routes>

    </>
  )
}

export default App
