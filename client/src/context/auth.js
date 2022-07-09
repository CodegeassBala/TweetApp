import React,{useReducer,createContext} from "react";
import jwtDecode from "jwt-decode";//used to decode taken which later is used to access the info present inside the token

const initialState = {
    user:null
}

if(localStorage.getItem('token')){
const decodedToken = jwtDecode(localStorage.getItem('token'));
//localstorage consists the token (we keep it there) so that the web-app can reach it at any instant /operatoin
if(decodedToken.exp * 1000 < Date.now()){//if token has expired then remove it from the localStorage
    localStorage.removeItem('token');
}else{
    initialState.user = decodedToken;
}
}

//consists of all global info/functions which can be done in the web-app(initialization only)

const AuthContext = createContext({
    user:null,
    login:(data)=>{},
    logout:()=>{},
})

//Auth reducer is used to update tthe state of the web-app corrrespoding to the changes in the global info/functions 
//the normal switch statement i used to set the state based on action type
//action .payload consists of the actual required data
const AuthReducer = (state,action)=>{
switch(action.type){
    case'LOGIN':{
        return {
        ...state,
        user:action.payload
        }
    }
    case 'LOGOUT':{
        return{
            ...state,
            user:null
        }
    }
    default:
        return state;
}
}
//Auth provider consists of all the global functions declaration
const AuthProvider = (props)=>{
const [state,dispatch] = useReducer(AuthReducer,initialState);
//in the login function we add the token to our localStorage which late can be used for verifcation at any time
const login = (data)=>{
    localStorage.setItem('token',data.token);
    dispatch({
        type:'LOGIN',
        payload:data
    })
}

const logout = ()=>{
    localStorage.removeItem('token');
    dispatch({
        type:'LOGOUT',
    })
}

return (
    <AuthContext.Provider
    value={{user:state.user,login,logout}}
    {...props}
    />
)

}

export {AuthContext,AuthProvider}