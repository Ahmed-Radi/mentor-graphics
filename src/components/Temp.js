import React from 'react'

function Temp({ isLoading, celsius, fahrenheit, weatherStatus, ForC, setForC }) {
    return (
        <>
            { celsius && fahrenheit && weatherStatus && ForC ? <div className='temperature'>
                <div className='temperature-container'>
                    {ForC === true ?
                        <h2>{!isLoading ? celsius : 'loading...'} C<sup>o</sup> &nbsp;</h2> :
                        <h2>{!isLoading ? fahrenheit  : 'loading...'} F<sup>o</sup> &nbsp;</h2>
                    }
                    <h2>{!isLoading ? weatherStatus : 'loading...'}</h2>
                </div>
                <button
                    className="convert-button"
                    onClick={() => setForC(prev => !prev)}
                >
                    {ForC === true ? 'convert from celsius to fahrenheit' : 'convert from fahrenheit to celsius'}
                </button>
            </div> : ''}
        </>
    )
}

export default Temp