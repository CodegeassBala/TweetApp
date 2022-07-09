import React from 'react';
import './App.css';

import {AuthProvider} from './context/auth';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Menubar from './views/menubar';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import SinglePostPage from './components/SinglePostPage';

import AuthRoute from './utils/authRoute';

const customStyle = {
  marginRight:'250px',
  marginLeft:'250px',
  marginTop:'20px'
}



function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <div style={customStyle}>
      <Menubar/>
      <Routes>
      <Route path = '/' index element={<Home/>}/>
      <Route path = '/posts/:postID' element={<SinglePostPage/>} />
      <Route element={<AuthRoute/>}>
      <Route path = 'login' element={<Login/>} />
      <Route path = 'register' element={<Register/>} />
      </Route>
      </Routes>
    </div>
    </AuthProvider>
    </BrowserRouter>
  );
}
// <Route element={<AuthRoute/>}>
{/* <Route path = 'login' element={<Login/>} />
<Route path = 'register' element={<Register/>} />
</Route>
</Routes> */}
// the AuthRoute component is now enclosing the login and register routes which later ch=n be directly used later by the Outlet Component in AuthRoute 
export default App;
