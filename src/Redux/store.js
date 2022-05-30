import { configureStore } from '@reduxjs/toolkit'
import getDataSlice from './Reducers/ApiReducer'

const store = configureStore ({
    reducer: {
        getDataSlice
    },
})

export default store