import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {increaseItem, decreaseItem, removeFromCart} from '../Features/productSlice'
import { useNavigate } from 'react-router-dom';

function ProductsCart() {
  const {products, cartItems} = useSelector((state)=>state.products);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const totalItemPrice = cartItems.reduce((total,item)=> total + item.price * 83 * item.quantity,0);

  return (
    <>
      <div className="max-w-5xl mx-auto p-6">
      <button
            onClick={() => navigate(-1)}
            className="mb-4 text-gray-700 hover:text-gray-900 transition flex items-center gap-2 cursor-pointer"
          >
            ← Back
        </button>
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl shadow-sm p-4"
              >
                {/* Image */}
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                {/* Name + Price */}
                <div className="flex-1 ml-4">
                  <h2 className="font-medium text-gray-800">{item.name}</h2>
                  <p className="text-gray-500">INR {Math.floor(item.price * 83)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                     onClick={() => dispatch(removeFromCart(item))}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseItem(item))}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  className="text-red-500 hover:text-red-700 text-sm ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 flex justify-end items-center space-x-4">
            <span className="font-semibold text-lg">Total:</span>
            <span className="font-bold text-xl">INR {Math.floor(totalItemPrice)}</span>
          </div>
        </>
      )}
    </div>  
    </>
  )
}

export default ProductsCart;