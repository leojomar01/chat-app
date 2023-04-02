import React, { useEffect, useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import { updateUserPasswordRoutes ,deleteAccountRoutes} from '../util/APIroutes';
import Swal from 'sweetalert2'

const EditProfile
 = ({curentUser}) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username:"",
    password:"",
    confirmPassword:""
});
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const getUserFromLocalStorage = async () => {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      if (!user) {
        navigate('/login');
      } else {
        setCurrentUser(user);
      }
    };
    getUserFromLocalStorage();
  }, []);

  const handleOnChange = (e)=>{
    setValues({...values,[e.target.name]: e.target.value});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password, confirmPassword } = values;
  
    if (password === confirmPassword) {
      try {
        const response = await axios.put(`${updateUserPasswordRoutes}/${currentUser._id}`, {
          userId:currentUser._id,
          newPassword:password
        });
  
        if (response.data.status === true) {
            Swal.fire({
                icon: "success",
                title: "Profile Updated Successfully"
            });
            setValues({...values, password: "", confirmPassword: ""});

        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Password do not Match"
      });
    }

  };

  const handleCancel =()=>{
    navigate('/')
  }


  const handleDeleteAccount=()=>{
    Swal.fire({
        title: 'Do you want to delete your account?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
            deleteAccount();
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
  }

  const deleteAccount = async () => {
    try {
      const response = await axios.delete(`${deleteAccountRoutes}/${currentUser._id}`);
      if (response.data.status === true) {
        Swal.fire({
          icon: "success",
          title: "Account deleted successfully",
        });

        localStorage.removeItem('chat-app-user');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  
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
          value={currentUser.username}
          readOnly


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
          value={values.password}

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
          value={values.confirmPassword}


        />
      </div>
      <div className='update' > 
        <span className='deleteAccount' onClick={handleDeleteAccount}>Delete Account?</span>
        <div >
            <input className='btn' type="button"  onClick={handleCancel} value="Cancel" />
            <input className='btn' type="submit" value="Update" />
        </div>

      </div>
    </form>
    </div>
  );
};

export default EditProfile
;
