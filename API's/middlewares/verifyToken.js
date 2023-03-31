
const jwt=require("jsonwebtoken");
require("dotenv").config();
const verifyToken=(request,response,next)=>{
    let bearerToken=request.headers.authorization;
    if(bearerToken==undefined){
        return response.send({message:"Unauthorized request"});
    }
    let token=bearerToken.split(" ")[1];
    if(token===null){
        return response.send({message:"Unauthorized request"})
    }
    try{
        jwt.verify(token,'abcdefgh')
        next();
    }catch(err){
        return response.send({message:"Session expired..Relogin to continue"});
    }
}
module.exports=verifyToken;