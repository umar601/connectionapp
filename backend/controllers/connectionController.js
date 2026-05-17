//send request  (done)
//accept request (done)
//rejected request (done)
//see send request (done)
//see request recieved (done)
//see connection  (done)

let connectionModel = require("../models/connectionModel");
let userModel = require("../models/userModel");



// send request 


let sendRequest = async (req,res)=>{

    try{

        //finding the sender and reciever 

    let sendBy = await userModel.findById(req.params.sendBy);
    let sendTo = await userModel.findById(req.params.sendTo);

        //checing weather they exist 

    if(!sendTo || !sendBy){

        return res.status(500).json({message:"something wrong in fetching sender or reciever"});
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

let acceptRequest = async(req,res)=>{

    try{

        //updating status weather accepted or rejected

    let sendBy = await userModel.findById(req.params.sendBy);
    let sendTo = await userModel.findById(req.params.sendTo);

    //checing weather they exist 

    if(!sendTo || !sendBy){

        return res.status(500).json({message:"something wrong in fetching sender or reciever"});
    }

    //updating the connection model

        await connectionModel.findOneAndUpdate(

        {
            //find
        $and:
        [
            {sendTo:req.params.sendTo},
            {sendBy:req.params.sendBy}
        ],

        },
            
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

