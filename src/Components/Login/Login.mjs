import React, { Fragment, useState } from 'react'
import "./Login.css"
import { Form, Navigate } from 'react-router-dom'

const Login = () => {
    const [username,setusername] = useState('');
    const [password,setPassword]= useState("");
    const [redirect,setRedirect] = useState(false)
    const handlesbmit =  async (ev) => {
        ev.preventDefault();   
        const response =  await fetch("http://localhost:5000/login",{
            "method":"POST",
            "headers":{"Content-Type":"application/json"},
            "body":JSON.stringify({username,password}),
            "credentials":"include"
        })

        if(response.ok){
            setRedirect(true)
        }
        else{
            alert("Wrong Credentials !");
        }


 }
 if(redirect){
  return  <Navigate to={'/'}/>
 }
    return (
        <Fragment>
            <h1 className='loginh1'>Login</h1>
            <form onSubmit={handlesbmit} className='form'>
                <input placeholder='username' type='text' onChange={(e)=>{setusername(e.target.value)}}/>
                <input placeholder='password' type='password' onChange={(e)=>{setPassword(e.target.value)}} />
                <button>Login</button>

            </form>
        </Fragment>
    )
}

export default Login
