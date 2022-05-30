import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const APIContext = createContext()

export default function ContextGetData (props) {
    const [saveData, setSaveData] = useState([])
    const [country, setCountry] = useState('Landon')

    const api_key = '9585e354f05a48e9b7d160556222805'
    const API = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${api_key}&q=${country}&format=json&num_of_days=5`

    useEffect(() => {
        axios.get(API)
        .then(res => setSaveData(res.data))
    },[])

    let value = {saveData, country, setCountry}
    return (
        <APIContext.Provider value={value}>
            {props.children}
        </APIContext.Provider>
    )
}