import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { FaMicrophoneLines } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { searchedProducts } from '../App/searchProducts';
import {setSearchQuery, clearFilter} from '../Features/productSlice';
import Sidebar from './Sidebar'
import { IoMdMenu } from "react-icons/io";

function Navbar() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state)=> state.products);

  let totalItems = cartItems.reduce((total,ele)=> total + ele.quantity,0);

  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

    let recognition;
    if(SpeechRecognition){
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-US";
    }
  let hndleVoiceSearch = ()=>{
    if (!recognition) return alert("Voice search not supported in this browser");
    recognition.start();

    setSearch("Speak Now Listening...");
    recognition.onresult = (event)=>{
      const text = event.results[0][0].transcript;
      setSearch(text);
      dispatch(setSearchQuery(text));
    }
    recognition.onerror = (event) => {
      setSearch("");
      alert("Voice search failed. Try again.");
    };
  }

  let hndleSearchChange =(e)=>{
    let query = e.target.value;
    setSearch(query);
  }

  // search button
  let hndleSearchItems =()=>{
      if(!search) return;
        dispatch(setSearchQuery(search));
        dispatch(searchedProducts({ searchItem : search, page : 1}));
        setSearch('');
  }

  // sideNavbar state
  const [open,setOpen] = useState(false);

  const handleHomeClick = ()=>{
    dispatch(clearFilter());    
  }
  
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

      <div className="flex items-center space-x-3">
      {/* Menu Button */}
      <IoMdMenu
        size={24}
        className="cursor-pointer text-gray-700 hover:text-gray-900 transition"
        onClick={() => setOpen(true)}
        title="Sidebar"
      />
      {
        open && 
        <Sidebar open={open} setOpen={setOpen}
        />
      }
        {/* Logo / Brand */}
        <div onClick={handleHomeClick}className="text-lg font-semibold text-gray-800 cursor-pointer">
          Ecom
        </div>
      </div>
        
        

        {/* Links */}
        <div className="flex items-center flex-1 max-w-xl bg-gray-100 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-gray-300">
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={hndleSearchChange}
                className="bg-transparent outline-none text-base text-gray-700 placeholder-gray-400 flex-1 w-full"
            />
            <span className='ml-2' onClick={hndleVoiceSearch}><FaMicrophoneLines /></span>
            <div className="text-black-400 ml-2" onClick={hndleSearchItems}><IoIosSearch size={22}/></div>
            </div>

        {/* Cart & Logout */}
        <div className="flex items-center space-x-4">
          {/* Basic Cart Icon */}
          <Link 
            to="/cart" 
            className="relative text-gray-600 hover:text-gray-900 transition"
          >
              <span className='text-xl'>🛒</span>
            {/* Optional cart item count */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          </Link>

          {/* Logout Button */}
          {/* <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition">
            Logout
          </button> */}
        </div>
      </div> 
    </nav>
  )
}

export default Navbar