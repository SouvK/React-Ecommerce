import { createAsyncThunk } from "@reduxjs/toolkit";

const base_api_url = import.meta.env.VITE_BASE_URL;
export const fetchSingleProduct =  createAsyncThunk(
    "product/fetchProduct",
    async (id)=>{
        try {
            const res = await fetch(`${base_api_url}/products/${id}`);
            if(res.ok){
                const data = await res.json();
                return data;
            }
        } catch (error) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong');
        }
    }
)