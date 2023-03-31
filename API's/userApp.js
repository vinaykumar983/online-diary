const exp = require("express");

const userApp=exp.Router();

let bcryptjs=require("bcryptjs");

let jwt=require("jsonwebtoken");

const expressAsyncHandler = require("express-async-handler");

userApp.use(exp.json());

userApp.post('/login',expressAsyncHandler(async(request,response)=>{
    let userCollectionObject=request.app.get("userCollectionObject");
    let userCredObj=request.body;
    let userOfDB=await userCollectionObject.findOne({username:userCredObj.username,})
    if(userOfDB===null){
        response.send({message:"Invalid user"});
    }
    else{
        let status=await bcryptjs.compare(userCredObj.password,userOfDB.password);
        if(status==false){
            response.send({message:"Invalid password"});
        }
        else{
            let token=jwt.sign({username:userOfDB.username},'abcdefgh',{expiresIn:180})
            response.send({message:"success",payload:token,userObj:userOfDB})
        }
    }
}));

userApp.post('/create-user',expressAsyncHandler(async(request,response)=>{
    let userCollectionObject=request.app.get("userCollectionObject");
    let newUser=request.body;
    let userOfDb=await userCollectionObject.findOne({username:newUser.username})
    if(userOfDb!==null){
        response.send({message:"Please choose another username"})
    }
    else{
        let hashedPassword=await bcryptjs.hash(newUser.password,5);
        newUser.password=hashedPassword;
        await userCollectionObject.insertOne(newUser)
        response.send({message:"Registration successful"});
    }
}))


userApp.post('/create-data',expressAsyncHandler(async(request,response)=>{
    let data=request.body
    let diaryCollectionObject=request.app.get("diaryCollectionObject");
    await diaryCollectionObject.insertOne(data,()=>{
    response.send({message:"Data saved successfully"});
    });

}))

userApp.get('/get-data/:username/:date',expressAsyncHandler(async(request,response)=>{
    let diaryCollectionObject=request.app.get("diaryCollectionObject");
    let name=request.params.username;
    let userdate=request.params.date;
   
   await diaryCollectionObject.findOne({$and:[{username:name},{date:userdate}]},(err,result)=>
    {
        response.send({message:"success",payload:result});
    })
}))

module.exports=userApp;