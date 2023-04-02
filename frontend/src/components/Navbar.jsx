import { Link, useNavigate } from 'react-router-dom';


function Navbar({}) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('chat-app-user');
    navigate('/login');
  };

  const editProfile=()=>{
    navigate('/editprofile');
  }
  return (
    <nav>
        <li title='Edit Profile' onClick={editProfile}>
          <i className="bi bi-person-circle"></i>
        </li>
        <li title='About'>
          <i className="bi bi-info-circle"></i>
        </li>
        <li title='Logout'onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
        </li>
    </nav>
  );
}

export default Navbar;
