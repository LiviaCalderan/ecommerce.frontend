import React from 'react'
import { useSelector } from 'react-redux';
import { AiFillProduct } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import ProductsTable from './ProductsTable';
import Loader from '../../shared/Loader';
import useProductFilter from '../../../hooks/useProductFilter';


const AdminProducts = () => {

  const { isLoading, errorMessage } = useSelector(
    (state) => state.errors
  );

  const { products, categories, pagination } = useSelector(
    (state => state.products)
  );
  const emptyProducts = !products || products.length === 0;
  useProductFilter();

  return (
    <div className='pb-6 font-raleway'>
      {emptyProducts ? (

        <div className='flex flex-col items-center gap-8 justify-center pt-30'>
          <AiFillProduct size={150} className='text-gray-200' />
          <h1 className='font-anton-sc text-4xl '>
            No Products Placed Yet.
          </h1>
          <button className='text-white font-semibold py-2 px-15 mt-3 rounded-lg items-center transition-colors duration-300 flex justify-center gap-3 bg-black opacity-100 hover:bg-gray-800 cursor-pointer hover:shadow-sm'>
            <FaShoppingCart className='text-lg' />
            Add Product
          </button>
        </div>

      ) : (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div className='relative md:pt-5 flex flex-col gap-5'>
              <div className='md:absolute md:right-0 md:top-0 flex items-center justify-center'>
                <button className='text-white font-semibold py-2 px-10 mt-3 rounded-lg items-center transition-colors duration-300 flex justify-center gap-3 bg-black opacity-100 hover:bg-gray-800 cursor-pointer hover:shadow-sm'>
                  <FaShoppingCart className='text-lg' />
                  Add Product
                </button>
              </div>
              <ProductsTable product={products} pagination={pagination} />
            </div>
          )}
        </>


      )
      }
    </div >
  )
}

export default AdminProducts