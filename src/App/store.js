import {configureStore} from '@reduxjs/toolkit'
import ProductReducer from '../Features/productSlice'

export const store = configureStore({
    reducer : {
        products : ProductReducer
    }
})