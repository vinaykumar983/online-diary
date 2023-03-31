const exp=require("express");

const app=exp()

const mclient=require("mongodb").MongoClient;

app.use(exp.json());

require("dotenv").config();

const path=require("path");

app.use(exp.static(path.join(__dirname,'./build')))

let DBurl=process.env.DBURL;

mclient.connect(DBurl)
.then((client)=>{
    let dbObj=client.db("vnr2022");
    let userCollectionObject=dbObj.collection("usercollection");
    let diaryCollectionObject=dbObj.collection("diarycollection");
    app.set("userCollectionObject",userCollectionObject);
    app.set("diaryCollectionObject",diaryCollectionObject);
    console.log("DB connection success");
})
.catch((err)=>{
    console.log("Error in DB connection",err)
})


let userApp=require("./API's/userApp");


app.use('/user-api',userApp);

app.use('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
})

app.use((request,response,next)=>{
    response.send({message:`path ${request.url} is invalid`})
})

app.use((error,request,response,next)=>{
    response.send({message:error.message})
})

app.listen(4000,()=>{
    console.log("Server listening on port number 4000")
})