import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {addToCart} from '../Features/productSlice'
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const {
    id,
    title,
    price,
    discountPercentage,
    rating,
    thumbnail,
    brand,
    stock,
    availabilityStatus,
    returnPolicy
  } = product

  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(2)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleAddToCart = (e) => {
      e.stopPropagation();
      dispatch(addToCart(product));
  }
  let getProductDetails = (e)=>{
    
    let card = e.target.closest("[data-id]");
    let id = card.dataset.id;
    
    navigate(`productDetails/${id}`);
}

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 w-full max-w-xs mx-auto" data-id={id} onClick={getProductDetails}>
      
      {/* Image */}
      <div className="w-full h-48 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        
        {/* Title */}
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {title}
        </h2>

        {/* Brand */}
        <p className="text-xs text-gray-500">{brand}</p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-900">
            ₹{Math.floor(discountedPrice * 83)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{Math.floor(price * 83)}
          </span>
        </div>

        {/* Rating */}
        <div className="text-sm text-yellow-500">
          ⭐ {rating}
        </div>

        {/* Stock */}
        <p className={`text-xs font-medium ${
          availabilityStatus === "In Stock"
            ? "text-green-600"
            : "text-red-500"
        }`}>
          {availabilityStatus}
        </p>

        {/* Return Policy */}
        <p className="text-xs text-gray-500">
          {returnPolicy !== "No return policy"
            ? "Returns available"
            : "No returns"}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={availabilityStatus !== "In Stock"}
          className={`w-full mt-3 py-2 rounded-md text-sm font-medium transition
            ${
              stock > 0
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>

      </div>
    </div>
  )
}

export default ProductCard