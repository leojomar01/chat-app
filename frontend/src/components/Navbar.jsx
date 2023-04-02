import { Link, useNavigate } from 'react-router-dom';



function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('chat-app-user');
    navigate('/login');
  };
  return (
    <nav>
        <li title='Notification'>
          <i class="bi bi-app-indicator"></i>
        </li>
        <li title='About'>
          <i class="bi bi-info-circle"></i>
        </li>
        <li title='Logout'onClick={handleLogout}>
          <i class="bi bi-box-arrow-right"></i>
        </li>
    </nav>
  );
}

export default Navbar;
