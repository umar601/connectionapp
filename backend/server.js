const  express = require("express");

const dataBaseConnection = require("./connections/dataBaseConnection");

const middlewares  = require("./middlewares/middlewares");

const app = express();

const port = 8080;


dataBaseConnection();

middlewares(app);



app.use("/",(req,res)=>{

    res.send("hello from backend");
});

app.listen(port,(req,res)=>{

    console.log(`server is running on port ${port}`);

});


