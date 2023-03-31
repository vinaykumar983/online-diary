import {useForm} from 'react-hook-form'
import {MdDateRange} from "react-icons/md"
import axios from 'axios';
import {useSelector} from 'react-redux'
import './yourdiary.css'
import {Card} from 'react-bootstrap'
import { useState } from 'react';
function Yourdiary() {

    const {register,handleSubmit,formState:{errors}}=useForm()

    let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(
        (state)=>state.user
      ) 
      let [d,setD]=useState(undefined);
      const onFormSubmit=(diaryDate)=>{
      diaryDate.username=userObj.username;
    axios.get("http://localhost:4000/user-api/get-data/"+diaryDate.username+"/"+diaryDate.date)
    .then((response)=>{
        if(response.data.message==="success"){
            setD(response.data.payload);
        }
    })
    .catch((err)=>{
      console.log(err)
    })
}

    return (
      <div className='container'>
        
          <h2>Enter your date here</h2>
          <form onSubmit={handleSubmit(onFormSubmit)}>
          <div class="input-group mb-3">
            <input type="date" class="form-control" placeholder="date" {...register("date",{required:true})}/>
        </div>
        <button type="submit" className="btn btn-primary d-block mx-auto">Get the day<MdDateRange/></button>
        </form>
        <div>
     {d!=undefined?( <Card className="text-center mt-5">
  <Card.Header>{d.date}</Card.Header>
  <Card.Body>
    <Card.Title>{d.username}</Card.Title>
    <Card.Text>
      {d.diary}
    </Card.Text>
  </Card.Body>
</Card>):<h2 className='text-center'>Welcome</h2>}
</div>
      </div>
    );
  }
  
  export default Yourdiary;