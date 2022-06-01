import React from 'react';
import './style/WeatherInfo.scss';

function WeatherInfo({ isLoading, city, country, latitude, longitude }) {
    return (
        <>
            { city && country ? (<div className="container-info">
                <div className="container-info__content">
                    <span className="change-font">your city:</span>&nbsp;
                    <p>{!isLoading ? city : 'loading...'}</p>
                </div>
                <div className="container-info__content">
                    <span className="change-font">your country:</span>&nbsp;
                    <p>{!isLoading ? country : 'loading...'}</p>
                </div>
                <div className="container-info__content">
                    {latitude ?
                    <>
                        <span className="change-font">Latitude is:</span>&nbsp;
                        <p>{!isLoading ? latitude : 'loading...'}</p>
                    </> : ''}
                </div>
                <div className="container-info__content">
                    {longitude ?
                    <>
                        <span className="change-font">Latitude is:</span>&nbsp;
                        <p>{!isLoading ? longitude : 'loading...'}</p>
                    </> : ''}</div>
                </div>) :
                <div className="error-container">
                    <h2 className="error change-font">Please enter a valid country name or city name</h2>
                </div>
            }
        </>
    )
}

export default WeatherInfo