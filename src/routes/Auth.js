import { authService } from 'fbase';
import React, { useState } from 'react';

const Auth = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [newAccount, setNewAccount] = useState(true);
const onChange = (event) => {
    // const {target:{name, value}} = event;
    const name = event.target.name;
    const value = event.target.value;
    if (name === "email") {
        setEmail(value);
    } else if (name === "password") {
        setPassword(value);
    }
};

const onSubmit = async (event) => {
    event.preventDefault();
    try { 
        let data;
        if (newAccount) {
    data = await authService.createUserWithEmailAndPassword(email, password);
    } else {
    data = await authService.signInWithEmailAndPassword(email, password);
    }
    console.log(data);
        }  catch(error) {
            console.log(error);
            }
    
};

return(
<div>
    <form onSubmit= {onSubmit}>
        <input 
        type = "email" 
        name="email" 
        onChange={onChange} 
        placeholder ="Email" 
        value = {email} 
        required/>
        <input 
        type = "password" 
        name = "password" 
        onChange={onChange} 
        placeholder ="Password" 
        value ={password} 
        required/>
        <input type = "submit" value = {newAccount? "Create Account" : "Log In"} />
    </form>
    <div>
        <button> Contiune to Google </button>
    </div>
</div>
)};
export default Auth;