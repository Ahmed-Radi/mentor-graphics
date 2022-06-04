import React, { useState } from 'react';
import  './style/CountryForm.scss';

function CountryForm({ handleSubmit, setNewCountry }) {
    const [initialPos,   setInitialPos] = useState(null);
    const [initialSize, setInitialSize] = useState(null);
    const initial = (e) => {
        let resizable = document.getElementById('Resizable');
        setInitialPos(e.clientX);
        setInitialSize(resizable.offsetWidth);
    }
    const resize = (e) => {
        let resizable = document.getElementById('Resizable');
        resizable.style.width = `${parseInt(initialSize) + parseInt(e.clientX - initialPos)}px`;
    }

    return (
        <>
            <form onSubmit={e => handleSubmit(e)} className="country-form">
                    <label htmlFor="Draggable" className='h2 change-font country-form__label'>Enter country or city:</label>
                    <div id="Resizable">
                        <input
                            className='country-form__input'
                            type={'text'}
                            onChange={(e) => setNewCountry(e.target.value)}
                            id="Draggable"
                            draggable   = 'true'
                            onDragStart = {initial}
                            onDrag      = {resize}
                        />
                    </div>
                <button className="country-form__button">Choose another country</button>
            </form>
        </>
    )
}

export default CountryForm