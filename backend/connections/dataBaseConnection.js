const mongoose = require("mongoose");

const dataBaseConnection = ()=>{

    mongoose.connect("mongodb://127.0.0.1:27017/linkedinapp")
    .then(()=>{

        console.log("database connection successful at the port");

    }).catch((err)=>{

        console.log(`some error in connecting with the database${err}`);

    });
};

module.exports = dataBaseConnection;


//mongodb://127.0.0.1:27017/linkeninapp