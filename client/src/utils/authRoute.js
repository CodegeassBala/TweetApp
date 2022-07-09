import React, {useContext}from "react";
import { Navigate, Outlet,useLocation } from "react-router-dom";

import { AuthContext } from "../context/auth";

const AuthRoute = ()=>{
  const location  = useLocation();
  const {user} = useContext(AuthContext);
 return  user===null ? <Outlet/> : <Navigate to='/' state={{from:location}} replace/>
}
//AuthRoute is our Protected Route which checks if the user is loggedIn through the user in the AuthContext and renders the website routes accordingly..
export default AuthRoute;