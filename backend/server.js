const  express = require("express");

const dataBaseConnection = require("./connections/dataBaseConnection");

const middlewares  = require("./middlewares/middlewares");

const app = express();

const port = 8080;

const userRouter = require("./routes/userRoutes");

const postRouter = require("./routes/postRoutes");


dataBaseConnection();

middlewares(app);


app.use("/",userRouter);

app.use("/",postRouter);



app.use("/",(req,res)=>{

    res.send("hello from backend");
    
});

app.listen(port,(req,res)=>{

    console.log(`server is running on port ${port}`);


});




