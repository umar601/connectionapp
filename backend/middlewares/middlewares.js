

const middlewares = (app)=>{


    app.use((err,req,res,next)=>{

        console.log("middleware is working fine");

        next();
    });



}


module.exports = middlewares;