import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Chart from '../../components/Chart'
// import connect from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { getDataReducer } from '../../Redux/Reducers/ApiReducer';
import Temp from '../../components/Temp';
import WeatherInfo from '../../components/WeatherInfo';
import CountryForm from '../../components/CountryForm';
import './dashboard.scss';

// import { APIContext } from '../context/ContextAPI';
// console.log(connect);

function Landing () {
    let navigate = useNavigate();
    const { country } = useParams()
    const dispatch = useDispatch()
    const {getData: APIData, error, isLoading} = useSelector(state => state.getDataSlice)

    console.log(error)
    /*states*/
    const [newCountry, setNewCountry] = useState(undefined)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [ForC, setForC] = useState(true)
    /**/

    useEffect(() => {
        dispatch(getDataReducer({country}))
    },[country, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newCountry) navigate(`/${newCountry}`)
    }

    console.log('27',APIData?.data?.error)

    return (
        <div className="container">
            { APIData === undefined ?
            <div className="button-container-error">
                <button className='redirect-button-error' onClick={() => navigate('/')}>Go to home</button>
            </div> :
            (
                <>
                    <CountryForm
                        handleSubmit={handleSubmit}
                        setNewCountry={setNewCountry}
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
                        weatherStatus={APIData && APIData.current_condition && APIData.current_condition[0].weatherDesc ? APIData.current_condition[0].weatherDesc?.value : ''}
                        ForC={ForC}
                        setForC={setForC}
                    />
                    {/* {console.log(country)} */}
                    {/* {!isLoading ?
                        <Chart /> :
                        'loading'
                    } */}
                    <div className="button-container">
                        <button className="redirect-button" onClick={() => navigate('/')}>Go to home</button>
                    </div>
                </>
            )
            }
        </div>
    )
}

export default Landing