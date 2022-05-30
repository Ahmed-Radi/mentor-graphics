import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getDataReducer } from '../../Redux/Reducers/ApiReducer';
import axios from 'axios';
import '../components.scss';
import Temp from '../../components/Temp';
import WeatherInfo from '../../components/WeatherInfo';
import CountryForm from '../../components/CountryForm';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {getData: APIData ,isLoading} = useSelector(state => state.getDataSlice)
    const [country, setCountry] = useState(undefined)
    const [newCountry, setNewCountry] = useState(undefined)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [ForC, setForC] = useState(true)

    // useEffect(() => {(
    //     // axios.get(`http://api.geonames.org/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=testahmedradi`)
    //     // axios.get(`http://api.positionstack.com/v1/reverse?access_key=c05c96cfd3a403e9df6f5e86a8e9e345&query=${latitude},${longitude}&output=json`)
    //     // axios.get(`http://api.positionstack.com/v1/forward?access_key=c05c96cfd3a403e9df6f5e86a8e9e345&query=${latitude},${longitude}&country_module=1`)
    //     // axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false`)
    //     axios.get(`https://www.latlong.net/c/?lat=${latitude}&long=${longitude}`)
    //     .then(res => console.log(res))
    //     .catch(e => console.log(e))
    // )},[])
    useEffect(_ => {setCountry('Egypt')},[])
    useEffect(() => {
        dispatch(getDataReducer({country}))
    },[dispatch, country])

    useEffect(() => (
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    ),[])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newCountry) navigate(`/${newCountry}`)
    }

    console.log('home', APIData)
    return (
        <div className='container'>
            {APIData &&
                <>
                    <CountryForm
                        handleSubmit={handleSubmit}
                        setNewCountry={setNewCountry}
                    />
                    <WeatherInfo
                        isLoading={isLoading}
                        city={APIData?.request[0]?.query?.split(',')[0]}
                        country={APIData?.request[0]?.query?.split(',')[1]}
                        latitude={latitude}
                        longitude={longitude}
                    />
                    <Temp
                        isLoading={isLoading}
                        celsius={APIData?.current_condition[0]?.temp_C}
                        fahrenheit={APIData?.current_condition[0]?.temp_F}
                        weatherStatus={APIData?.current_condition[0]?.weatherDesc[0]?.value}
                        ForC={ForC}
                        setForC={setForC}
                    />
                </>
            }
        </div>
    )
}

export default Home



{/* {APIData && APIData?.data?.ClimateAverages.map((info) => {
                        return <div>{info.month.map(m => (
                            <p key={m.absMaxTemp}>{m.absMaxTemp}</p>
                        ))}</div>
                    })} */}