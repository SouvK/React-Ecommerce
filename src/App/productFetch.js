import { createAsyncThunk } from "@reduxjs/toolkit";
const api_base_url = import.meta.env.VITE_BASE_URL;

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
     async (page = 1)=>{
        
        let limit = 12;
        let skip = (page -1) * limit;

        const res = await fetch(`${api_base_url}/products?limit=${limit}&skip=${skip}`);
            if(res.ok){
                const data = await res.json();
                return data;
            }
            else{
                const err = await res.json();
                throw new Error(err.message || 'Something went Wrong');
            }
        }
)