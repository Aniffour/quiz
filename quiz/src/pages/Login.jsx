import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { useEffect, useRef } from "react"

import Header from "../components/Header"
import Button from "../components/Button"
import Section from "../components/Section"

//  FAKE LOGIN



function Login() {
    const navigate = useNavigate()
    const {stateAuth, dispatch} = useAuth()
    const {isAuthenticated , error , tentative} = stateAuth
    const [currentUsername , currentPassword] = [useRef()  , useRef()]
     function handleSubmit(e){
        e.preventDefault()
        // if (currentUsername.current.value.length === 0   || currentUsername.current.password.length ===0   )return 
        dispatch({type:'auth/login' , payload : {username : currentUsername.current.value , password:currentPassword.current.value}})  
    }
    useEffect(
        ()=>{
            if (isAuthenticated && error ===null){
            
            navigate('/quiz' , {replace : true})
            }else{
            error && alert(error )
        }}
        ,[isAuthenticated , error ,navigate ,tentative]
    )

    function handleBackBtn(){
        dispatch({type:'cleanErrors'})
        navigate(-1 , {replace:true})
    }

    return (
        <main className="login">
            <div className="container">
                <Header>
                    <Button className="back" onclick={handleBackBtn}> &larr;</Button>
                    <h1>Welcome Back</h1>
                </Header>
            <Section className="login">
                <form onSubmit={handleSubmit}>
                    <input className="username" id="username" autoFocus placeholder="your username here" type="text" ref={currentUsername}  />
                    <input className="passowrd" id="password" type="password" placeholder="your password here" ref={currentPassword}/>
                    <Button className="primary-btn" >Login</Button>
                </form>
            </Section>
            </div>
        </main>
    )
}

export default Login
