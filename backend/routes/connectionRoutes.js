//post request send
//post request accept or reject 
//get added requests by userid 
//get send request by userid 
//get recieved request by userid 


let express = require("express");

let connectionRouter = express.Router();

let {sendRequest,acceptRequest,rejectRequest,seeSendRequest,seeRequestRecieved,seeConnections} = require("../controllers/commentController");



module.exports = connectionRouter;

