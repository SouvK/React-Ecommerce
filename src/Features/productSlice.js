import { createSlice, current } from "@reduxjs/toolkit";
import { fetchProducts  } from "../App/productFetch";
import {searchedProducts} from '../App/searchProducts'
import { fetchSingleProduct } from "../App/fetchSingleProduct";
import {fetchCategories} from "../App/fetchCategories";
import { productByCategory } from "../App/fetchProductByCategory";

const productSlice = createSlice({
    name : 'products',
    initialState : {
        product : null,
        products : [],
        categoryQuery : '',
        categories : [],
        cartItems : JSON.parse(localStorage.getItem('cart_items')) || [],
        searchQuery : '',
        totalProducts: null,
        currentPage : 1,
        loading : true,
        categoryLoading : true,
        error : null
    },
    reducers : {
        nextPage : (state)=>{
            state.currentPage += 1;
        },
        prevPage : (state)=>{
            state.currentPage -= 1
        },
        setCurrentPage : (state, action)=>{
            state.currentPage = action.payload;
        },
        setSearchQuery : (state,action)=>{
            state.searchQuery = action.payload;
        },
        setCategoryQuery : (state,action)=>{
            state.categoryQuery = action.payload;
        },
        addToCart : (state,action)=>{
            let item = state.cartItems.find((product)=> product.id === action.payload.id);
            if(item){
                item.quantity += 1;
            }
            else{
                state.cartItems.push({...action.payload, quantity : 1});
            }
            localStorage.setItem('cart_items',JSON.stringify(state.cartItems));
        },
        removeFromCart : (state,action)=>{
            let item = state.cartItems.find((items)=> items.id === action.payload.id);
            if(item && item.quantity > 1){
                item.quantity -= 1;
            }
            else{
                state.cartItems = state.cartItems.filter((ele)=> ele.id !== action.payload.id);
            }
            localStorage.setItem('cart_items',JSON.stringify(state.cartItems));
        },
        increaseItem : (state,action)=>{
            let item = state.cartItems.find((item)=> item.id === action.payload.id);
            item.quantity += 1;
            localStorage.setItem('cart_items',JSON.stringify(state.cartItems));
        },
        decreaseItem : (state,action)=>{
            let item = state.cartItems.find((item)=> item.id === action.payload.id);
            item.quantity -= 1;
        },
        clearFilter : (state)=>{
            state.searchQuery = "";
            state.categoryQuery = "";
            state.currentPage = 1;
        }
    },
    extraReducers : (builder)=>{
        builder
        .addCase(fetchProducts.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled,(state, action)=>{
            state.loading = false;
            state.products = action.payload.products;
            state.totalProducts = action.payload.total;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

          // search products
        .addCase(searchedProducts.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(searchedProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.products = action.payload.products;
            state.totalProducts = action.payload.total;
        })
        .addCase(searchedProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
        
        // single products
        .addCase(fetchSingleProduct.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSingleProduct.fulfilled, (state, action)=>{
            state.loading = false;
            state.product = action.payload;
        })
        .addCase(fetchSingleProduct.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })

        // fetchCategories
        .addCase(fetchCategories.pending, (state)=>{
            state.categoryLoading = true;
            state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action)=>{
            state.categoryLoading = false;
            state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action)=>{
            state.categoryLoading = false;
            state.error = action.error.message;
        })

        //getProductByCategory
        .addCase(productByCategory.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(productByCategory.fulfilled, (state, action)=>{
            state.loading = false;
            state.products = action.payload.products;
            state.totalProducts = action.payload.total;
        })
        .addCase(productByCategory.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export const {nextPage, prevPage, addToCart, removeFromCart, increaseItem, decreaseItem, setSearchQuery, setCurrentPage, setCategoryQuery, clearFilter} =  productSlice.actions;
export default productSlice.reducer;