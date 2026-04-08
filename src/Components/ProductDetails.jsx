import React, { useEffect } from "react";
import { fetchSingleProduct } from "../App/fetchSingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../Features/productSlice"
import Loader from "./Loader";

function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id]);

  const { product, loading } = useSelector((state) => state.products);

  let handleAddToCart = (e)=>{
    if(e.target.textContent === 'Add to Cart'){
        dispatch(addToCart(product))
    }
  }
  const discountedPrice = (product?.price - (product?.price * product?.discountPercentage) / 100).toFixed(2)

  return (
    <>
    { loading ? <Loader/> : (
    <div className="max-w-6xl mx-auto p-6 mt-20">
        {/* Back Button */}
        <button
            onClick={() => navigate(-1)}
            className="mb-4 text-gray-700 hover:text-gray-900 transition flex items-center gap-2 cursor-pointer"
          >
            ← Back
        </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow">

        {/* Left - Image */}
        <div>
          <img
            src={product?.images[0]}
            alt={product?.title}
            className="w-full h-100 object-contain rounded-lg"
          />
        </div>

        {/* Right - Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {product?.title}
          </h1>

          <p className="text-gray-600">
            {product?.description}
          </p>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-green-600">
            ₹{Math.floor(discountedPrice * 83)}
            </span>

            <span className="text-sm text-gray-500 line-through">
            ₹{Math.floor(product?.price * 83)}
            </span>

            <span className="text-sm text-red-500">
              {product?.discountPercentage}% OFF
            </span>
          </div>

          <div className="text-yellow-500">
            ⭐ {product?.rating}
          </div>

          <div className="text-sm text-gray-500">
            Brand: <span className="font-medium">{product?.brand}</span>
          </div>

          <div className="text-sm text-gray-500">
            Category: <span className="font-medium">{product?.category}</span>
          </div>

          <div className="text-sm text-gray-500">
            Stock:{" "}
            <span className={`font-medium ${product?.stock > 0 ? "text-green-600" : "text-red-500"}`}>
              {product?.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button className={`bg-blue-600 text-white px-6 py-2 rounded-lg ${product?.stock > 0 ? 'hover:bg-blue-700 transition' : 'bg-gray-400 cursor-not-allowed'}`} onClick={handleAddToCart}>
                {product?.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  );
}

export default ProductDetails;