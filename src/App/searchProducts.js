import { createAsyncThunk } from "@reduxjs/toolkit";
const api_base_url = import.meta.env.VITE_BASE_URL;


export const searchedProducts = createAsyncThunk(
    "products/searchProducts",
    async({searchItem,page=1})=>{
        if(!searchItem) return;
       try {
        let limit = 12;
        let skip = (page - 1) * limit;
        
        let res = await fetch(`${api_base_url}/products/search?q=${searchItem}&limit=${limit}&skip=${skip}`);
        if(res.ok){
            const data = await res.json();
            return data;
        }
       } catch (error) {
            const err = await res.json();
            throw new Error(err.message || 'Something went Wrong');
       }
    }
);