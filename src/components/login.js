
import {useForm} from 'react-hook-form' 
import { userLogin } from '../slices/userSlice';
import {useSelector,useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { useEffect } from 'react';
import {FiLogIn} from "react-icons/fi"

function Login() {
  const {register,handleSubmit,formState:{errors}}=useForm()
  let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(
    (state)=>state.user
  )
  let dispatch=useDispatch();
  let navigate=useNavigate();
  const onFormSubmit=(userCredentialsObject)=>{
      dispatch(userLogin(userCredentialsObject))
  }
  useEffect(()=>{
    if(isSuccess){
    navigate("/diary");
    }
    if(isError){
      alert(errMsg)
    }
  },[isSuccess,isError]);
    return (
      <div>
   
    <div className='w-300 ij container card mt-5 my-5 mx-auto w-50 sm-5 bg qw'>
<form onSubmit={handleSubmit(onFormSubmit)}>
    
        <div className="mx-auto  img1 ">
        <h1 className='text-primary text-center' >Login</h1>
        <div className="form-text text-center">I'm your best friend</div>
        </div>
        
        <div className=" w-50 mx-auto mt-5">
            <label for="username" className="form-label text-success">Enter your UserName</label>
            <input type="text" className="form-control" id="username" {...register("username",{required:true})}/>
            {errors.username?.type=='required'&&<p className='text-danger'>*username is required</p>}
        </div>

       
        <div className="mx-auto w-50">
            <label for="exampleInputPassword1" className="form-label text-success">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" {...register("password",{required:true})}/>
            {errors.password?.type=='required'&&<p className='text-danger'>*password is required</p>}
        </div>

       <div className="mx-auto mb-2 img mt-3">
        <button type="submit" className="btn btn-success cs1 d-block mx-auto">Enter<FiLogIn/></button>
        </div>



    
</form>
</div>
    </div>

    );
  }
  
  export default Login;