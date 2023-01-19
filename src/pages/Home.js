import '../App.css';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import icon from "../images/location-icon.png"
import carousel_1 from "../images/carousel_1.jpg"
import carousel_2 from "../images/carousel_2.jpg"
import carousel_3 from "../images/carousel_3.jpg"
import carousel_4 from "../images/carousel_4.jpg"
import carousel_5 from "../images/carousel_5.jpg"
import carousel_6 from "../images/carousel_6.jpg"
import Carousel from 'better-react-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloud } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/')
    }
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/')
        }

        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            const apiKey = 'a7292da2a85fdd4ef917687eac901e5e';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            setWeather(data.weather[0].main);
            setLocation(data.name);
        });

    }, [])

    return (
        <div className="App">
            <button id="logout-button" onClick={handleLogout}>Log out</button>
            <p id="photo-icon"></p>
            <div id="weather-text">
                {location}<br></br>
            </div>
            <div id="weather-icon">
                {weather === 'Clear' ? (
                    <FontAwesomeIcon icon={faSun} />
                ) : (
                    <FontAwesomeIcon icon={faCloud} />
                )}
            </div>
            <header className="App-header">
                <p>
                    Today's <br></br>
                    Farm
                </p>
            </header>
            <div className="Top-picks">
                <h2>
                    Top Picks for you
                </h2>
            </div>
            <div className="Carousel-items">
                <Carousel cols={3} rows={1} gap={10} loop>
                    <Carousel.Item>
                        <img id="carousel-left" width="100%" src={carousel_1} alt="c1" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width="100%" src={carousel_2} alt="c2" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img id="carousel-right" width="100%" src={carousel_3} alt="c3" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img id="carousel-left" width="100%" src={carousel_4} alt="c4" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width="100%" src={carousel_5} alt="c5" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img id="carousel-right" width="100%" src={carousel_6} alt="c6" />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div id="chatting">
                <input id="location-input" type="text" placeholder="주변 구매자 찾기..." />
                <img id="location-icon" src={icon} alt="location-icon" />
            </div>
        </div>

    );
};

export default Home;