import { useState } from "react";

export const useForm = (callBack,initialState ={})=>{
    const [values,setValues] = useState(initialState);

    const handleChange = event=>{
        setValues({...values,[event.target.name]:event.target.value});
    };

    const handleSubmit = event=>{
        event.preventDefault();
        callBack();
    }
//requires the calllback, as the handle submit cannot access the function in the useMutation directly as then we would have to declare our values after the useMutaion but then the addUser/addPost functions cannot access them.S, we need a separate callback
    return{
        handleChange,
        handleSubmit,
        values
    }
}