import React from 'react'

function WeatherInfo({ isLoading, city, country, latitude, longitude }) {
    console.log(city, country)
    return (
        <>
            { city && country ? (<div className="container-info">
                <p>your city: {!isLoading ? city : 'loading...'}</p>
                <p>your country: {!isLoading ? country : 'loading...'}</p>
                {latitude ? <p>Latitude is: {!isLoading ? latitude : 'loading...'}</p> : ''}
                {longitude ? <p>Latitude is: {!isLoading ? longitude : 'loading...'}</p> : ''}
            </div>) :
                <div className="error-container">
                    <h2 className="error">Please enter valid country or city</h2>
                </div>
            }
        </>
    )
}

export default WeatherInfo