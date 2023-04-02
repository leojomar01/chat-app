import React, { useEffect, useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import { registerRoutes } from '../util/APIroutes';
import Swal from 'sweetalert2'

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username:"",
    password:"",
    confirmPassword:""
});


  const handleOnChange = (e)=>{
    setValues({...values,[e.target.name]: e.target.value});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {username,password,confirmPassword} = values;

    if(password===confirmPassword){
        const {data} = await axios.post(registerRoutes,{
            username,
            password,
            confirmPassword
        });
        if(data.status===false){
          Swal.fire({
            icon: 'warning',
            title: data.msg,
          })
        }
        if(data.status === true){
          Swal.fire({
            icon: 'success',
            title: 'Register Successfully',
          })
            // localStorage.setItem('chat-app-user',JSON.stringify(data.user))
            navigate("/")
        }

    }
    else{
      Swal.fire({
        icon: 'warning',
        title: 'Password do not Match',
      })
    }
  };

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
        navigate('/')
    }
  },[])

  return (
    <div className='container register'>
        <form  className="row g-3" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className='form-label' htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name='username'
          className='form-control'
          onChange={(e)=>handleOnChange(e)}
          required


        />
      </div>
      <div className="mb-3">
        <label className='form-label' htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name='password'
          className='form-control'
          onChange={(e)=>handleOnChange(e)}
          required

        />
      </div>
      <div className="mb-3">
        <label className='form-label' htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          className='form-control'
          name='confirmPassword'
          onChange={(e)=>handleOnChange(e)}
          required


        />
      </div>
      <span>Already have an account? <Link to = "/login">Login here</Link></span>
      <button className='btn btn-primary mb-3' type="submit">Register</button>
    </form>
    </div>
  );
};

export default Register;
