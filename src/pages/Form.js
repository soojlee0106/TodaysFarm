import '../App.css';

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom'
import photo from "../images/login.jpg"

export default function BasicTextFields({ title, setPassword, setEmail, handleAction }) {
    let navigate = useNavigate();
    const register = () => {
        let path = "../register";
        navigate(path);
    }
    const login = () => {
        let path = "../login";
        navigate(path);
    }

    return (
        <div>
            <div className="App-header">
                <div>
                    <button id="login-button" onClick={login}>
                        Login
                    </button>
                    <button id="register-button" onClick={register}>
                        Register
                    </button>
                </div>
                <h2>
                    Welcome to <br></br>
                    Today's Farm.
                </h2>
            </div>
            <div>
                <img id="login-photo" src={photo} />
            </div>
            <div className="Login-items">
                <h3 id="login-title">
                    {title}
                </h3>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        '& > :not(style)': { m: 0.5, width: '30ch' },
                    }}
                >
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)} />
                    <div></div>
                    <TextField
                        id="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)} />

                    <div></div>
                </Box>
                <Button title={title} handleAction={handleAction} />
            </div>
        </div>
    );
}