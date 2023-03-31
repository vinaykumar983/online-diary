import './Signup.css';
import {useForm} from 'react-hook-form' 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function Signup() {
  const navigate=useNavigate();
  const {register,handleSubmit,formState:{errors}}=useForm()

  const onFormSubmit=(userObj)=>{

    console.log(userObj)
   
    axios.post("http://localhost:4000/user-api/create-user",userObj)
    .then((response)=>{
      alert(response.data.message);
      if(response.data.message==="Registration successful"){
        navigate("/login");
      }
    })
    .catch((err)=>{
      alert("Error occured",err.message);
    })

  }
    return (

      <div className='im'>
    <form onSubmit={handleSubmit(onFormSubmit)}>
    <div className="card mt-5 my-5 mx-auto w-50 sm-5 bg">
        <div className="mx-auto mt-3">
        <h1 className='text-primary'>SIGNUP</h1>
        <div className="form-text  ">Create your virtual diary</div>
        </div>
        <div className="mx-auto w-50">
            <label for="email" className="form-label text-success">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" {...register("email",{required:true})}/>
            {errors.email?.type=='required'&&<p className='text-danger'>*email is required</p>}
        </div>
        <div className=" w-50 mx-auto mt-3">
            <label for="username" className="form-label text-success">Create Username</label>
            <input type="text" className="form-control" id="username" {...register("username",{required:true})}/>
            {errors.username?.type=='required'&&<p className='text-danger'>*username is required</p>}
        </div>

        
        <div className="mx-auto w-50">
            <label for="exampleInputPassword1" className="form-label text-success">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" {...register("password",{required:true})}/>
            {errors.password?.type=='required'&&<p className='text-danger'>*password is required</p>}
        </div>

        <div className="mx-auto mt-3 mb-2 ">
        <button type="submit" className="btn btn-success cs">Sign up</button>
        </div>
    </div>
</form>


     { /*<div>
        <form className='w-50 mx-auto' onSubmit={handleSubmit(onFormSubmit)}>
          <div>
            <label for='username' className='text-dark form-label'>Username</label>
            <input type="text" id='username' className='form-control' {...register("username",{required:true})}/>
            {errors.username?.type=='required'&&<p className='text-danger'>*username is required</p>}
          </div>
          <div>
            <label for='pass'  className='text-dark form-label'>Password</label>
            <input type="password" id='pass' className='form-control' {...register("password",{required:true,maxLength:5})}/>
            {errors.password?.type=='required'&&<p className='text-danger'>*password is required</p>}
          </div>
          
          <button type="submit" className='btn btn-primary mt-3 d-block mx-auto'>Sign up</button>
      </form> 
    </div>*/
  
  }
  
  </div>
    );
  }

  export default Signup;