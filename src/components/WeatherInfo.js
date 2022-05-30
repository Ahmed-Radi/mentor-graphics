import React from 'react'

function WeatherInfo({ isLoading, city, country, latitude, longitude }) {
    return (
        <>
            <div className="container-info">
                <p>your city: {!isLoading ? city : 'loading...'}</p>
                <p>your country: {!isLoading ? country : 'loading...'}</p>
                <p>Latitude is: {!isLoading ? latitude : 'loading...'}</p>
                <p>Latitude is: {!isLoading ? longitude : 'loading...'}</p>
            </div>
        </>
    )
}

export default WeatherInfo