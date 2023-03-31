import {useForm} from 'react-hook-form' 
import {useSelector} from "react-redux"
import { Nav } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import axios from 'axios'
import {BiSave} from "react-icons/bi"
import './diary.css'
import {AiOutlineArrowRight} from "react-icons/ai"
function Diary() {

    const {register,handleSubmit,formState:{errors}}=useForm()
  let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(
    (state)=>state.user
  )
  const onFormSubmit=(diaryData)=>{
    diaryData.username=userObj.username;
    
    axios.post("http://localhost:4000/user-api/create-data",diaryData)
    .then((response)=>{
      alert(response.data.message);
    })
    .catch((err)=>{
      console.log(err)
      alert("Error occured",err.message);
    })
}

    return (
      <div className='abc p-5 container' >
        
   
    <form onSubmit={handleSubmit(onFormSubmit)}>

  <div className="mb-3">
    <label for="date" className="form-label w-25"><h3>Enter today's date</h3></label>
    <input type="date" className="form-control w-25" id="date" {...register("date",{required:true})}/>
  </div>
  <div className='text-center'>
      <div>
    <label for="area" className="form-label"><h4>Express your feelings...</h4></label>
    </div>
    <textarea id="area" name="area" rows="15" cols="60" className='form-control asdf' {...register("diary",{required:true})}>
        Dear diary,
    </textarea>
    </div>
     <button type="submit" className="btn btn-primary d-block mx-auto mt-2">Save<BiSave/></button>
</form>
<>
     
     <>
       <Nav className="justify-content-center mt-3" >
         <Nav.Item>
           <Nav.Link to="yourdiary" as={NavLink}>
             <h1>Jump back to your previous days...<AiOutlineArrowRight/></h1>
           </Nav.Link>
         </Nav.Item>
       </Nav>
       <div className="mt-3">
         <Outlet />
       </div>
     </>
   </>
      </div>
    );
  }
  
  export default Diary;