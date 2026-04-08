import { useEffect } from "react";
import { fetchCategories } from "../App/fetchCategories";
import { useDispatch, useSelector } from "react-redux";
import {setCategoryQuery, setCurrentPage} from '../Features/productSlice'
import Loader from "./Loader";

function Sidebar({ open, setOpen }) {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchCategories());
    },[])

    const {categories, categoryLoading} = useSelector((state)=> state.products)


    const hndleClickCategory =(item)=>{
        dispatch(setCategoryQuery(item));
        dispatch(setCurrentPage(1));
    }
    return (
      <>
        {/* Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
        )}
  
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 transform transition-transform duration-300 
          ${open ? "translate-x-0" : "-translate-x-full"} max-h-screen overflow-y-auto`}
        >
          {/* Close */}
          <button
            className="mb-4 text-xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          {/* Categories */}
          <h2 className="font-semibold mb-2">Categories</h2>
          {
            categoryLoading ? <Loader/> : (
                <ul className="space-y-2">
            { categories.map((ele,idx)=> (
                <li key={idx} onClick={()=>hndleClickCategory(ele)} className="cursor-pointer">{ele}</li>
                ))
            }
           </ul>
            )
          }
        </div>
      </>
    );
  }

  export default Sidebar;