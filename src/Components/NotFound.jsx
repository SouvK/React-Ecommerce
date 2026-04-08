import React from 'react'
import { useNavigate } from 'react-router-dom';
import { clearFilter } from '../Features/productSlice';
import { useDispatch } from 'react-redux';

function NotFound({notfound}) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const hndleHomeClick = ()=>{
    if(notfound) dispatch(clearFilter());

    else navigate('/');
  }
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      
      {/* Big 404 */}
      <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-4">
        404
      </h1>

      {/* Message */}
      <p className="text-gray-500 text-lg mb-6">
        { notfound ? `${notfound}` : `Oops! The page you’re looking for doesn’t exist.`}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {
          !notfound && 
          <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          ← Go Back
        </button>
        }

        <button
          onClick={hndleHomeClick}
          className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
        >
          Go Home
        </button>
      </div>

    </div>
  )
}

export default NotFound