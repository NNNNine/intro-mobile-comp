import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function submit(username, password, setCookie, navigate) {
    axios.post('http://localhost:5000/tokens/login', {
        NationalId: username,
        Password: password
    }).then((response) => {
        setCookie('token', response.data.token)
        toast.success('Login successful')
        navigate('/main')
    }).catch((error) => {
        if (error.response) {
            toast.error(error.response.data.message)
        } else {
            toast.error('An error occurred')
        }
    })
}

function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cookie, setCookie] = useCookies(['token'])
    let navigate = useNavigate()

    return (
        <center>
            <h1>To Do App</h1>
            <input type='text' placeholder='เลขประจำตัวประชาชน' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <br />
            <input type='password' placeholder='รหัสผ่าน' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <br />
            <button onClick={() => submit(username, password, setCookie, navigate)}>Login</button>
        </center>
    )
}

export default Login;