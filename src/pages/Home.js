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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloud } from '@fortawesome/free-solid-svg-icons'

import { storage } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Home = () => {
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/')
    }
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);
    const [file, setFile] = useState("")
    const [percent, setPercent] = useState(0);
    var [imgUrl, setImgUrl] = useState("");

    imgUrl = "https://firebasestorage.googleapis.com/v0/b/react-register-a81d5.appspot.com/o/files%2Fprofile.png?alt=media&token=5ad8bfbc-9fc3-4fa9-b047-bab81b534f67"

    const storageRef = ref(storage, `/files/profile.png`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    let navigate = useNavigate();

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleUpload() {
        if (!file) {
            alert("Please choose a file first!")
        }

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                })
            }
        );
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    }

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

            <p id="photo-icon">
                <img src={imgUrl} alt='uploaded file' id="photo-img" />
            </p>

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

            <div id="choose-file">
                <input type="file" onChange={handleChange} accept="" id="file-button1" />
                <br></br>
                <button onClick={handleUpload} id="file-button2"> 프로필 바꾸기 </button>
            </div>

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

        </div >

    );
};

export default Home;