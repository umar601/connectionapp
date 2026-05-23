//post request send
//post request accept or reject 
//get added requests by userid 
//get send request by userid 
//get recieved request by userid 


let express = require("express");

let connectionRouter = express.Router();

let {sendRequest,acceptRequest,rejectRequest,seeSendRequest,seeRequestRecieved,seeConnections} = require("../controllers/commentController");


//by ai right might be wrong but i think we can use post request for send,accept and reject request and get request for see send request,see recieved request and see connections by userid

// connectionRouter.post("/sendRequest",sendRequest);
// connectionRouter.post("/acceptRequest",acceptRequest);
// connectionRouter.delete("/rejectRequest",rejectRequest);
// connectionRouter.get("/seeSendRequest/:id",seeSendRequest);
// connectionRouter.get("/seeRequestRecieved/:id",seeRequestRecieved);
// connectionRouter.get("/seeConnections/:id",seeConnections);


module.exports = connectionRouter;

