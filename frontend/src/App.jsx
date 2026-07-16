import Login from "./assets/pages/login"
import SignUp from "./assets/pages/signup";
import HomePage from "./assets/pages/homepage";
import AddPost from "./assets/pages/addPost";
import Connection from "./assets/pages/connection";




import {Routes,Route,Link} from "react-router-dom";
import ProtectedRoute from "./assets/components/protectedRoute";


function App() {
 

  return (

    <>



    <Routes>

    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    
    <Route path="/home" element={
      <ProtectedRoute>
      <HomePage/>
      </ProtectedRoute>
    }/>


    <Route path="/addpost" element={

      <ProtectedRoute>
        <AddPost/>
      </ProtectedRoute>

    }></Route>


    <Route path="/post/:postId" element={

      <ProtectedRoute>
        <HomePage/>
      </ProtectedRoute>
    }></Route>


    <Route path="/post/comment/:commentId" element={

      <ProtectedRoute>
        <HomePage/>
      </ProtectedRoute>
    }></Route>

    <Route path="/home/profile" element={

      <ProtectedRoute>
      <Connection/>
      </ProtectedRoute>


    }>

    </Route>


    






    </Routes>

    </>
  )
}

export default App
