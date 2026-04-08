import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../App/productFetch";
import { searchedProducts } from "../App/searchProducts";
import { setCurrentPage } from "../Features/productSlice";
import {productByCategory} from '../App/fetchProductByCategory';


function Pagination() {
  const dispatch = useDispatch();
  const { totalProducts, currentPage, searchQuery, categoryQuery } = useSelector((state) => state.products);

  const productsPerPage = 12;
  const visiblePages = 5;

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Calculate visible page range
  const startPagination = Math.floor((currentPage - 1) / visiblePages) * visiblePages;
  const endPagination = Math.min(startPagination + visiblePages, totalPages);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Unified fetch function
  const fetchPage = (page) => {
    if (page < 1 || page > totalPages) return;

    if (searchQuery) {
      dispatch(searchedProducts({ searchItem: searchQuery, page }));
    } 
    else if(categoryQuery){
      dispatch(productByCategory({category: categoryQuery, page : page}));
    }
    else {
      dispatch(fetchProducts(page));
    }

    dispatch(setCurrentPage(page));
  };

  return (
    <div className="flex items-center justify-center mt-8 gap-1">

      {/* Prev Button */}
      <button
        onClick={() => fetchPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 cursor-pointer text-sm rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.slice(startPagination, endPagination).map((pageNo) => (
        <button
          key={pageNo}
          onClick={() => fetchPage(pageNo)}
          className={`px-3 py-1.5 rounded cursor-pointer ${
            currentPage === pageNo ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {pageNo}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => fetchPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 cursor-pointer text-sm rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;