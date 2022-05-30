import React from 'react'

function CountryForm({ handleSubmit, setNewCountry }) {
    return (
        <>
            <form onSubmit={e => handleSubmit(e)} className="country-form">
                <label htmlFor="country" className='country-form__label'>Enter country</label>
                <input className='country-form__input' type={'text'} id="country" onChange={(e) => setNewCountry(e.target.value)}/>
                <button className="country-form__button">Choose another country</button>
            </form>
        </>
    )
}

export default CountryForm