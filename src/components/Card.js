import React from 'react'
import './style/Card.scss'

function Card({ weatherData, ForC, isLoading }) {
    let src='';
    return (
        <section>
            <div className="card-container">
                <div className="card-body">{
                    weatherData && weatherData.map((data, index) => (
                        <div className="card-body__all-info" key={index}>
                            <div className="card-body__info">
                                {/* {console.log(data?.hourly[index]?.weatherDesc[0].value)} */}
                                <div className="card-body__info-image">
                                    {
                                        data?.hourly[index]?.weatherDesc[0].value === 'Clear' ? src = <img src={'/images/weather/cloud.png'} width="40px" height="40px" alt="Clear" /> :
                                        data?.hourly[index]?.weatherDesc[0].value === 'Sunny' ? src = <img src={'/images/weather/sun.png'} width="40px" height="40px" alt="Sunny" /> :
                                        data?.hourly[index]?.weatherDesc[0].value === 'Light rain' ? src = <img src={'/images/weather/rain.png'} width="40px" height="40px" alt="Light rain" /> :
                                        data?.hourly[index]?.weatherDesc[0].value === 'Cloudy' ? src = <img src={'/images/weather/clouds.png'} width="40px" height="40px" alt="Cloudy" /> :
                                        data?.hourly[index]?.weatherDesc[0].value === 'Mist' ? src = <img src={'/images/weather/mist.png'} width="40px" height="40px" alt="Mist" /> :
                                        data?.hourly[index]?.weatherDesc[0].value === 'Light rain shower' || data?.hourly[index]?.weatherDesc[0].value === 'Overcast' ? src = <img src={'/images/weather/cloud-sun.png'} width="40px" height="40px" alt="Light rain shower" /> :
                                        data?.hourly[index]?.weatherDesc[0].value === 'Partly cloudy' ? src = <img src={'/images/weather/Partly-cloudy.png'} width="40px" height="40px" alt="Partly cloudy" /> :
                                        data?.hourly[index]?.weatherDesc[0].value === 'Moderate or heavy rain with thunder' ? src = <img src={'/images/weather/Moderate-or-heavy-rain-with-thunder.png'} width="40px" height="40px" alt="Moderate or heavy rain with thunder" /> :
                                        data?.hourly[index]?.weatherDesc[0].value === 'Patchy rain possible' || data?.hourly[index]?.weatherDesc[0].value === 'Heavy rain' ? src = <img src={'/images/weather/patchy-rain-possible.png'} width="40px" height="40px" alt="Patchy rain possible" /> : ""
                                    }
                                </div>
                                <div className='card-body__info-temp'>
                                    <div className='card-info'>
                                        <img src="./images/icons/thermometer.png" alt="thermometer" width='20' height="20" />
                                        {ForC ?
                                            <p className='card-info__text'>{!isLoading ? data?.hourly[4].tempC : 'loading...'} C<sup>o</sup> &nbsp;</p> :
                                            <p className='card-info__text'>{!isLoading ? data?.hourly[4].tempF  : 'loading...'} F<sup>o</sup> &nbsp;</p>
                                        }
                                    </div>
                                    <div className='card-info'>
                                        <img src="./images/icons/wind.png" alt="thermometer" width='20' height="20" />
                                        <p className='card-info__text'>{!isLoading ? data?.hourly[4]?.WindGustMiles : 'loading...'} W/MI</p>
                                    </div>
                                    <div className='card-info'>
                                        <img src="./images/icons/compass.png" alt="thermometer" width='20' height="20" />
                                        <p className='card-info__text'>{!isLoading ? data?.hourly[4]?.winddir16Point  : 'loading...'}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="weather-status change-font">{data?.hourly[index]?.weatherDesc[0].value}</p>
                        </div>
                    ))
                }</div>
            </div>
        </section>
    )
}

export default Card