import {BrowserRouter ,Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import EditProfile from './pages/EditProfile';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Chat/>}/>
        <Route path='/editprofile' element={<EditProfile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
