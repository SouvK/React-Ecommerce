import React, { useEffect } from 'react'
import Loader from './Loader';
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../App/productFetch'
import { productByCategory } from "../App/fetchProductByCategory"
import { searchedProducts } from '../App/searchProducts';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import Error from './Error';
import NotFound from './NotFound';

function Home() {
  const dispatch = useDispatch();
  const {products,loading,error,currentPage,categoryQuery,searchQuery} = useSelector((state)=> state.products);

useEffect(()=>{
   if(categoryQuery){
      dispatch(productByCategory({category : categoryQuery, page : currentPage}));
   }
   else if(searchQuery){
        dispatch(searchedProducts({searchItem : searchQuery, page : currentPage})); 
   }
   else {
    dispatch(fetchProducts(currentPage));
  }

},[categoryQuery,searchQuery,currentPage,dispatch]);

if(!products || products.length === 0) return <NotFound notfound="Unable to find the product"/>


    return (
    <>
        {error ? <Error error={error}/> : 
        (
            loading ? <Loader/> : (
        <>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 p-4" >
            {
                products.map((ele) => (
                <ProductCard key={ele.id} product={ele} />
                ))
            }
        </div>
        <div className='text-center'>
            <Pagination/>
        </div>
        
           </> )
        )
        }
    </>
  )
}

export default Home