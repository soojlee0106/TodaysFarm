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

const Home = () => {
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/')
    }
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/')
        }
    }, [])

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
            <div className="Top-picks">
                <h2>
                    Top Picks for you
                </h2>
            </div>
            <div className="Carousel-items">
                <Carousel cols={3} rows={1} gap={10} loop>
                    <Carousel.Item>
                        <img id="carousel-left" width="100%" src={carousel_1} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width="100%" src={carousel_2} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img id="carousel-right" width="100%" src={carousel_3} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img id="carousel-left" width="100%" src={carousel_4} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width="100%" src={carousel_5} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img id="carousel-right" width="100%" src={carousel_6} />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div id="chatting">
                <div id="location">
                    <input id="location-input" type="text" placeholder="주변 구매자 찾기..." />
                    <img id="location-icon" src={icon} alt="location-icon" />
                </div>
            </div>
        </div>

    );
};

export default Home;