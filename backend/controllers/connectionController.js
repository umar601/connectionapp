//send request  (done)
//accept request (done)
//rejected request (done)
//see send request (done)
//see request recieved (done)
//see connection  (done)

let connectionModel = require("../models/connectionModel");
let userModel = require("../models/userModel");



// send request 


// the person who needs login to perform something must be user id for authorzation purpose


let sendRequest = async (req,res)=>{

    try{

        // console.log(req.body.userId)
        // console.log(req.body.sendTo)
        //finding the sender and reciever 

    let sendBy = await userModel.findById(req.body.userId);
    let sendTo = await userModel.findById(req.body.sendTo);

    // console.log(sendBy)
    // console.log(sendTo)

        //checing weather they exist 

    if(!sendTo || !sendBy){

        return res.status(500).json({message:"something wrong in fetching sender or reciever"});
    }

    // console.log(sendTo._id)
    // console.log(sendBy._id)

    let isRequestFound = await connectionModel.findOne(
    
        {sendTo:sendTo._id,
        sendBy:sendBy._id}
    )

    let isRequestFoundsecond = await connectionModel.findOne(
    
        {sendTo:sendBy._id,
        sendBy:sendTo._id}
    )

    let checkingSendByConnection = await userModel.findOne(
        {connections:sendBy._id}
    )

    // console.log(checkingSendByConnection)
    // console.log(isRequestFoundsecond)
    // console.log(isRequestFound)



    if(isRequestFound||isRequestFoundsecond||checkingSendByConnection){

        return res.status(404).json({message:"request already exist "});
    }


    await connectionModel.insertOne(
        {
            sendBy:sendBy,
            sendTo:sendTo
        }
    )

    res.status(200).json({message:"request send successfully"});

    }catch(err){

        res.status(500).json({message:"something wrong in sending request",error:err});
    }

    

}


// accept request

//things to do 

//we have to check weather reuqest exist or not  (done)

//once updated its should not twice updated  (done)


//status is not updating  (done)

//filled mnay times in user if he accept multiple times  (done)


let acceptRequest = async(req,res)=>{

    try{

        //updating status weather accepted or rejected

    let sendBy = await userModel.findById(req.body.sendBy);
    let sendTo = await userModel.findById(req.body.userId);

    //checing weather they exist 

    if(!sendTo || !sendBy){

        return res.status(500).json({message:"something wrong in fetching sender or reciever"});
    }

    //updating the connection model

    let isRequestFound = await connectionModel.findOne({
    
        $and:[
        {sendTo:sendTo._id},
        {sendBy:sendBy._id},
        {status:"pending"}
        ]
    }
    )

    // console.log(isRequestFound)

    if(isRequestFound){
  

        isRequestFound.status = "accepted"

        await isRequestFound.save();

    //saving in user connections 

    sendTo.connections.push(sendBy);
    await sendTo.save();

    sendBy.connections.push(sendTo);
    await sendBy.save();

    res.status(200).json({message:`request accepted successfully`});

    }
    else{

        res.status(500).json({message:"request not found"})
    }

    }catch(err){

        res.status(500).json({message:"something wrong in accepting request",error:err});
    }
}


//reject request


let rejectRequest = async(req,res)=>{

    try{

        //updating status weather accepted or rejected

    let sendBy = await userModel.findById(req.body.sendBy);
    let sendTo = await userModel.findById(req.body.userId);

    //checing weather they exist 

    if(!sendTo || !sendBy){

        return res.status(500).json({message:"something wrong in fetching sender or reciever"});
    }

    //deleteing from connection model

    // console.log(sendTo._id)
    // console.log(sendBy._id)

    let isRequestFound = await connectionModel.findOne(
    
        
        {sendTo:sendTo._id},
        {sendBy:sendBy._id},
        {status:"pending"}
    
    
    )

    // console.log(isRequestFound)

    if(isRequestFound){

        await connectionModel.findOneAndDelete(
        
                {sendTo:sendTo,
                sendBy:sendBy}
            )


    res.status(200).json({message:`request rejected successfully`});

    }
    else{

        res.status(500).json({message:"request not found"})
    }


    }catch(err){

        res.status(500).json({message:"something wrong in rejecting request",error:err});
    }
}




//see requests we send

let seeSendRequest = async(req,res)=>{

    try{

    // console.log("Working")

    let sendBy = await userModel.findById(req.params.userId);

    //checing weather they exist 

    // console.log(sendBy)

    if(!sendBy){

        return res.status(500).json({message:"something wrong in fetching sender "});
    }

    // console.log(sendBy._id)

    let fetchedRequests = await connectionModel.find(
        
        {sendBy:sendBy._id,
        status:"pending"}
    ).populate("sendTo")

    // console.log(fetchedRequests)

    return res.status(200).json({message:"fecthed sucessfully ",requests:fetchedRequests})


    }catch(err){

        res.status(500).json({message:"something wrong in fetching the requests",error:err});
    }
}


//see requests we recieved


let seeRequestRecieved = async(req,res)=>{

    try{

    let sendBy = await userModel.findById(req.params.userId);

    //checing weather they exist 

        if(!sendBy){

        return res.status(500).json({message:"something wrong in "});
    }

        let fetchedRequests = await connectionModel.find({
            sendTo:req.params.userId,
            status:"pending"}).populate("sendBy")

        res.status(200).json({message:"fecthed sucessfully ",requests:fetchedRequests})


    }catch(err){

        res.status(500).json({message:"something wrong in fetching the requests",error:err});
    }
}


//checking connections

let seeConnections = async(req,res)=>{

    try{

        let sendBy = await userModel.findById(req.params.userId).populate("connections")

        // console.log(sendBy)

        if(!sendBy){

        return res.status(500).json({message:"something wrong in "});
    }

    let connections = sendBy.connections

    // console.log(connections)

    res.status(200).json({message:"fecthec successfully ",connection:connections})


    }catch(err){

        res.status(500).json({message:"some eror in fectching connection",erro:err});
    }


}


let getAllUsers = async(req,res)=>{

    try{

        let user = await userModel.find({}).select("username _id");

        res.status(200).json({message:"user fetchede successfully ",user});

    }catch(err){

        res.status(500).json({message:"some error in fethching user",err:err})

    }

}



module.exports = {sendRequest,acceptRequest,rejectRequest,seeSendRequest,seeRequestRecieved,seeConnections,getAllUsers};

