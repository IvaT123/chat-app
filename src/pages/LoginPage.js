import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameErr, setUsernameErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)
    const navigate = useNavigate()

    const onUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value)
    }
    const onPasswordChange = (e) => {
        const value= e.target.value;
        setPassword(value)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(password.length < 8) {
            setPasswordErr(true)
        } else {
            setPasswordErr(false)
        }
        if(username.length < 4) {
            setUsernameErr(true)
        } else setUsernameErr(false)
        if(password.length >= 8 && username.length >= 4) {
            navigate(`/chat/${username}`, {replace: true });
        }
        
    }
    return(
        <>
        <Header />
        <div className="login-container">
         <form className="form" onSubmit={onSubmit} >
            <h1> Sign in</h1>
            
            <label htmlFor="username">Enter username:</label>
            <input type="text" name="username" placeholder="Username" value={username} onChange={onUsernameChange} required/>

            {usernameErr && 
            <div className="error-msg">Username MUST contain at least 4 characters!</div>}
            <label htmlFor="password">Enter password:</label>
            <input type="password" name="password" placeholder="Password" onChange={onPasswordChange} required/>
            
            {passwordErr &&
            <div className="error-msg">Password MUST contain at least 8 characters!</div>} 
            <input type="submit" className="submit"value="Sign In"/>
        </form> 
       </div> 
        </>
    )
}