import { createAsyncThunk } from "@reduxjs/toolkit";

let api_base_url = import.meta.env.VITE_BASE_URL;

export const productByCategory = createAsyncThunk(
    "product/ByCategory",
    async ({category,page})=>{
        let limit = 12;
        let skip = (page -1) * limit;
        try{
            const res = await fetch(`${api_base_url}/products/category/${category}?limit=${limit}&skip=${skip}`);
            if(res.ok){
                const data = await res.json();
                return data;
            }
        }
        catch(err){
            const error = await res.json();
            throw new Error(error || 'Something went wrong');
        }
    }
)