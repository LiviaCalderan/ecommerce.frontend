import React, { useEffect, useState } from 'react'
import { AiFillProduct } from 'react-icons/ai';
import { FaThList } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { TbCategoryFilled } from "react-icons/tb"
import Loader from '@/components/shared/Loader';
import CategoryTable from './CategoryTable';
import { fetchCategories } from '@/store/actions';

const Category = () => {

  const dispatch = useDispatch();
  const { errorMessage, categoryLoader } = useSelector(
    (state) => state.errors
  );

  const { categories, pagination } = useSelector(
    (state) => state.products
  );

  const [openAddModel, setOpenAddModel] = useState(false);

  const emptyCategories = !categories || categories?.length === 0;


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  return (
    <div className='pb-6 font-raleway'>
      {emptyCategories ? (

        <div className='flex flex-col items-center gap-8 justify-center pt-30'>
          <TbCategoryFilled size={150} className='text-gray-200' />
          <h1 className='font-anton-sc text-4xl '>
            No Category Created Yet.
          </h1>
          <button
            onClick={() => setOpenAddModel(true)}
            className='text-white font-semibold py-2 px-15 mt-3 rounded-lg items-center transition-colors duration-300 flex justify-center gap-3 bg-black opacity-100 hover:bg-gray-800 cursor-pointer hover:shadow-sm'>
            <FaThList className='text-lg' />
            Add Category
          </button>
        </div>

      ) : (
        <>
          {categoryLoader ? (
            <Loader />
          ) : (
            <div className='relative md:pt-5 flex flex-col gap-5'>
              <div className='md:absolute md:right-0 md:top-0 flex items-center justify-center'>
                <button
                  onClick={() => setOpenAddModel(true)}
                  className='text-white font-semibold py-2 px-10 mt-3 rounded-lg items-center transition-colors duration-300 flex justify-center gap-3 bg-black opacity-100 hover:bg-gray-800 cursor-pointer hover:shadow-sm'>
                  <FaThList className='text-lg' />
                  Add Category
                </button>
              </div>
              <CategoryTable categories={categories} pagination={pagination} openAddModel={openAddModel} setOpenAddModel={setOpenAddModel} />
            </div>
          )}
        </>

      )
      }
    </div >
  )
}

export default Category
