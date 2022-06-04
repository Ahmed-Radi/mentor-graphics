import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getDataReducer } from '../../Redux/Reducers/ApiReducer';
import axios from 'axios';
import Temp from '../../components/Temp';
import WeatherInfo from '../../components/WeatherInfo';
import CountryForm from '../../components/CountryForm';
import Card from '../../components/Card';
import Model3D from '../../components/Model3D';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {getData: APIData ,isLoading} = useSelector(state => state.getDataSlice)
    const [country, setCountry] = useState(undefined)
    const [newCountry, setNewCountry] = useState(undefined)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [ForC, setForC] = useState(true)
    const [locationInfo, setLocationInfo] = useState({
        ip: "",
        countryName: "",
        countryCode: "",
        city: "",
        timezone: ""
    });
    const [formError, setFormError] = useState(false)

    const getGeoInfo = () => {
        axios
            .get("https://ipapi.co/json/")
            .then((response) => {
                let data = response.data;
                setLocationInfo({
                    ...locationInfo,
                    ip: data.ip,
                    countryName: data.country_name,
                    countryCode: data.country_calling_code,
                    city: data.city,
                    timezone: data.timezone
                });
                setCountry(data?.city)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getGeoInfo();
        dispatch(getDataReducer({country}))
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    },[dispatch, country])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newCountry) {
            navigate(`/${newCountry}`)
            setFormError(false)
        } else {
            setFormError(true)
        }
    }

    return (
        <div className='container'>
            <Model3D />
            {APIData &&
                <>
                    <CountryForm
                        handleSubmit={handleSubmit}
                        setNewCountry={setNewCountry}
                        formError={formError}
                    />
                    <WeatherInfo
                        isLoading={isLoading}
                        city={APIData && APIData.request ? APIData.request[0]?.query?.split(',')[0] : ''}
                        country={APIData && APIData.request ? APIData.request[0]?.query?.split(',')[1] : ''}
                        latitude={latitude}
                        longitude={longitude}
                    />
                    <Temp
                        isLoading={isLoading}
                        celsius={APIData && APIData.current_condition ? APIData.current_condition[0]?.temp_C : ''}
                        fahrenheit={APIData && APIData.current_condition ? APIData.current_condition[0]?.temp_F : ''}
                        weatherStatus={APIData && APIData.current_condition && APIData.current_condition[0].weatherDesc ? APIData.current_condition[0].weatherDesc[0]?.value : ''}
                        ForC={ForC}
                        setForC={setForC}
                    />
                    <Card
                        weatherData={APIData.weather}
                        isLoading={isLoading}
                        ForC={ForC}
                    />
                </>
            }
        </div>
    )
}

export default Home