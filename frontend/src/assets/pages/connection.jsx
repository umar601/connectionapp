import { seeRecievedRequests } from "../services/api";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";

export default function Connection() {
  let [seeRequestRecieved, setseeRequestRecieved] = useState("");
  let [error, setError] = useState("");

  let { user } = useAuth();

  useEffect(() => {

    console.log("working")

      let id = user._id ? user._id : user.id;

      seeRecievedRequests(id)
        .then((res) => {
        //   console.log("w", res.data.requests);

          setseeRequestRecieved([...res.data.requests]);
        })
        .catch((err) => {
          console.log(err);

          setError(err);
        });
    
  },[seeRecievedRequests]);



  return (
    <>
      <h1>connections</h1>
      <h1>All request recieved</h1>
      {seeRequestRecieved.length>0?
      seeRequestRecieved.map((index,request)=>{

        return(
            <div key={index}>
                <p>name</p>
                <button>accept</button>
                <button>reject</button>
            </div>
        )

      })

      :<p>no request recieved </p>}

      <h1>Add up to your network</h1>

    </>
  );
}
