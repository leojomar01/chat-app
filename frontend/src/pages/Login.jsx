import React, { useEffect, useState } from 'react';
import {useNavigate,Link} from 'react-router-dom';
import axios from 'axios';
import { loginRoutes } from '../util/APIroutes';
import Swal from 'sweetalert2';
import './scss/login.scss';


const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username:"",
    password:""
});


  const handleOnChange = (e)=>{
    setValues({...values,[e.target.name]: e.target.value});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {username,password} = values;

    if(password ===""){
        alert("username or password is required")
    }
    else{
        const {data} = await axios.post(loginRoutes,{
            username,
            password
        });
        if(data.status===false){
            Swal.fire({
                icon: 'warning',
                title: data.msg,
              })
        }
        if(data.status === true){
            localStorage.setItem('chat-app-user',JSON.stringify(data.user))

            navigate("/")
        }
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
      <span>Don't have an account? <Link to = "/register">Register</Link></span>
      <button className='btn btn-primary mb-3' type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;
