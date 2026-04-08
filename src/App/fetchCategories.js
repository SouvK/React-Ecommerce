import { createAsyncThunk } from "@reduxjs/toolkit";

let api_base_url = import.meta.env.VITE_BASE_URL;

export const fetchCategories = createAsyncThunk(
    "product/Categories",
    async ()=>{
        try{
            const res = await fetch(`${api_base_url}/products/category-list`);
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