import '../App.css';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import icon from "../images/location-icon.png"

const Home = () => {
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/login')
        }
    }, [])

    const register = () => {
        let path = "./register";
        navigate(path);
    }

    return (
        <div className="App">
            <button id="logout-button" onClick={handleLogout}>Log out</button>
            <p id="photo-icon"></p>
            <header className="App-header">
                <p>
                    Today's <br></br>
                    Farm
                </p>
            </header>
            <div id="chatting"><p id="location"><img id="location-icon" src={icon} alt="location-icon" /></p></div>
            <button onClick={register}>
                Register
            </button>
        </div>

    );
};

export default Home;