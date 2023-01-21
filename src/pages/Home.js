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
import image_profile from "../images/profile_img.png"
import chat_profile from "../images/tomato_buyer.jpg"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloud } from '@fortawesome/free-solid-svg-icons'

import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import PieChart from "react-js-pie-chart";

const Home = () => {
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/')
    }
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);
    const [temp, setTemp] = useState(null);
    const [chatWindowOpen, setChatWindowOpen] = useState(true);
    const data = [
        { value: 12, name: "Data Point" },
        { value: 24, name: "Another Data Point" },
        { value: 67, name: "Data Point 3" },
        { value: 18, name: "Yet Another Point" },
        { value: 37, name: "A Fifth Data Point" },
    ];

    const kelvin = 273;

    let navigate = useNavigate();

    const handleNewUserMessage = (newMessage) => {
        addResponseMessage("네, 구입하고 싶습니다");
    };

    const handleToggle = (chatWindowOpen) => {
        setChatWindowOpen(!chatWindowOpen);
    };

    useEffect(() => {
        addResponseMessage('토마토 구입하고 싶습니다~');

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
            setTemp(Math.floor(data.main.temp - kelvin) + "°C");
        });

    }, [])

    return (
        <div className="App">
            <button id="logout-button" onClick={handleLogout}> Log out <br></br> {location}</button>

            <p id="photo-icon">
                <img src={image_profile} alt='uploaded file' id="photo-img" />
            </p>
            <div id="rating">
                70%
                <div id="rating-small">
                    Fresh
                </div>
            </div>
            <div id="rating-box"></div>

            <PieChart
                data={data}
                width={300}
                height={300}
                thickness={70}
                colors={["#bddb9c", "#a2d16f", "#86bd4b", "#6fa832", "#49800f"]}
                animation={true}>
            </PieChart>

            <div id="weather-icon">
                {weather === 'Clear' ? (
                    <FontAwesomeIcon icon={faSun} />
                ) : (
                    <FontAwesomeIcon icon={faCloud} />
                )}
            </div>

            <div id="weather-numb">
                {temp}
            </div>

            <header className="App-header">
                <p>
                    Today's <br></br>
                    Farm
                </p>
            </header>

            <div className="Top-picks">
                <h2>
                    실시간 인기 유저
                </h2>
            </div>

            <div className="Carousel-items">
                <Carousel cols={3} rows={1} gap={10} loop={true} autoplay={4500}>
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

            <Widget
                handleNewUserMessage={handleNewUserMessage}
                handleToggle={handleToggle}
                title="구매자와 채팅"
                subtitle="@tomatobuyer"
                emojis="false"
                profileAvatar={chat_profile}
                chatId="@tomatobuyer"
                senderPlaceHolder="전송 후 창 닫기"
            />

            <div id="chatting">
                <input id="location-input" type="text" placeholder="주변 구매자 찾기..." />
                <img id="location-icon" src={icon} alt="location-icon" />
            </div>



        </div >

    );
};

export default Home;