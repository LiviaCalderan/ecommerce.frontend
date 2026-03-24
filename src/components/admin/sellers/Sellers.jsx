import Loader from '@/components/shared/Loader';
import React, { useState } from 'react'
import { FaStore } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import SellersTable from './SellersTable';
import useSellerFilter from '@/hooks/useSellerFilter';

const Sellers = () => {

  const dispatch = useDispatch();
  const { errorMessage, isLoading } = useSelector(
    (state) => state.errors
  );

  const { sellers, pagination } = useSelector(
    (state) => state.seller
  );

  const [openAddModel, setOpenAddModel] = useState(false);
  
  useSellerFilter();

  const emptySellers = !sellers || sellers?.length === 0;


  return (
    <div className='pb-6 font-raleway'>
      {emptySellers ? (

        <div className='flex flex-col items-center gap-8 justify-center pt-30'>
          <FaStore size={150} className='text-gray-200' />
          <h1 className='font-anton-sc text-4xl '>
            No Registered Seller Yet.
          </h1>
          <button
            onClick={() => setOpenAddModel(true)}
            className='text-white font-semibold py-2 px-15 mt-3 rounded-lg items-center transition-colors duration-300 flex justify-center gap-3 bg-black opacity-100 hover:bg-gray-800 cursor-pointer hover:shadow-sm'>
            <FaStore className='text-lg' />
            New Seller
          </button>
        </div>

      ) : (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div className='relative md:pt-5 flex flex-col gap-5'>
              <div className='md:absolute md:right-0 md:top-0 flex items-center justify-center'>
                <button
                  onClick={() => setOpenAddModel(true)}
                  className='text-white font-semibold py-2 px-10 mt-3 rounded-lg items-center transition-colors duration-300 flex justify-center gap-3 bg-black opacity-100 hover:bg-gray-800 cursor-pointer hover:shadow-sm'>
                  <FaStore className='text-lg' />
                  New Seller
                </button>
              </div>
              <SellersTable sellers={sellers} pagination={pagination} openAddModel={openAddModel} setOpenAddModel={setOpenAddModel}/>
            </div>
          )}
        </>

      )
      }
    </div >
  )
}

export default Sellers