import React from 'react';
import Spline from '@splinetool/react-spline';
import './style/Model3D.scss';

function Model3D() {
    return (
        <div className='container-model'>
            <Spline scene="https://prod.spline.design/TC4d5bku7z6fnxWM/scene.splinecode" />
        </div>
    )
}

export default Model3D