import '../App.css';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
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
    return (
        <div className="App">
            <p id="photo-icon"></p>
            <header className="App-header">
                <p>
                    Today's <br></br>
                    Farm
                </p>
            </header>
            <div id="chatting"><p id="location"><img id="location-icon" src="/images/location-icon.png" alt="location-icon" /></p></div>
        </div>
    );
};

export default Home;