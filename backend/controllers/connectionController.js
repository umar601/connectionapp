//send request  (done)
//accept request (done)
//rejected request (done)
//see send request (done)
//see request recieved (done)
//see connection  (done)

let connectionModel = require("../models/connectionModel");
let userModel = require("../models/userModel");



// send request 


// the person who needs login to perform something must be user id for authorzation purpos


let sendRequest = async (req,res)=>{

    try{

        //finding the sender and reciever 

    let sendBy = await userModel.findById(req.body.userId);
    let sendTo = await userModel.findById(req.body.sendTo);

        //checing weather they exist 

    if(!sendTo || !sendBy){

        return res.status(500).json({message:"something wrong in fetching sender or reciever"});
    }

    // console.log(sendTo._id)
    // console.log(sendBy._id)

    let isRequestFound = await connectionModel.findOne(
    
        {sendTo:sendTo._id},
        {sendBy:sendBy._id}
    )

    // console.log(isRequestFound)

    if(isRequestFound){

        return res.status(500).json({message:"request already exist "});
    }


    await connectionModel.insertOne(
        {
            SendBy:sendBy,
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

//we have to check weather reuqest exist or not 
//once updated its should not twice updated 

//status is not updating 

//filled mnay times in user if he accept multiple times 

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

        await connectionModel.findOneAndUpdate(

            {sendTo:req.params.sendTo},
            {sendBy:req.params.sendBy},

            
        {
            //update
            status:"accepted"
        }

        
    )

    //saving in user connections 

    sendTo.connections.push(sendBy);
    await sendTo.save();

    sendBy.connections.push(sendTo);
    await sendBy.save();

    res.status(200).json({message:`request accepted successfully`});


    }catch(err){

        res.status(500).json({message:"something wrong in accepting request",error:err});
    }
}


//reject request


let rejectRequest = async(req,res)=>{

    try{

        //updating status weather accepted or rejected

    let sendBy = await userModel.findById(req.params.sendBy);
    let sendTo = await userModel.findById(req.params.sendTo);

    //checing weather they exist 

    if(!sendTo || !sendBy){

        return res.status(500).json({message:"something wrong in fetching sender or reciever"});
    }

    //deleteing from connection model

        await connectionModel.findOneAndDelete({
            $and:[{sendTo:req.params.sendTo},{sendBy:req.params.sendBy}]
        })


    res.status(200).json({message:`request rejected successfully`});


    }catch(err){

        res.status(500).json({message:"something wrong in rejecting request",error:err});
    }
}




//see requests we send

let seeSendRequest = async(req,res)=>{

    try{

        let fetchedRequests = await connectionModel.find({sendBy:req.params.sendBy});

        res.status(200).json({message:"fecthed sucessfully ",requests:fetchedRequests})


    }catch(err){

        res.status(500).json({message:"something wrong in fetching the requests",error:err});
    }
}


//see requests we recieved


let seeRequestRecieved = async(req,res)=>{

    try{

        let fetchedRequests = await connectionModel.find({sendTo:req.params.sendTo});

        res.status(200).json({message:"fecthed sucessfully ",requests:fetchedRequests})


    }catch(err){

        res.status(500).json({message:"something wrong in fetching the requests",error:err});
    }
}


//checking connections

let seeConnections = async(req,res)=>{

    try{

        await connectionModel.find(
            {
                $and:
                [
                    {$or:
                        [
                            {sendTo:req.params.userId},
                            {sendBY:req.params.userId}
                        ]
                    },
                    {status:"accepted"}
                ]
            }
            
        )


    }catch(err){

        res.status(500).json({message:"some eror in fectching connection",erro:err});
    }


}



module.exports = {sendRequest,acceptRequest,rejectRequest,seeSendRequest,seeRequestRecieved,seeConnections};

