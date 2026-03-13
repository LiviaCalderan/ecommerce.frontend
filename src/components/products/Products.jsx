import { useEffect } from "react";
import ProductCard from '../shared/ProductCard';
import { BiSolidError } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts } from '../../store/actions';
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";

const Products = () => {

  const { isLoading, errorMessage } = useSelector(
    (state) => state.errors
  );
  const { products, categories, pagination } = useSelector(
    (state => state.products)
  );

  const dispatch = useDispatch();
  useProductFilter();

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <div className='bg-gray-100'>
      <div className='lg:px-[160px] sm:px-[32px] px-4 py-14 font-raleway'>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold uppercase tracking-widest text-black font-anton-sc">
            Products
          </h1>
          <p className="text-sm text-zinc-500 font-medium mt-1.5">
            Explore our curated selection of essentials and statement pieces.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white border border-zinc-200 rounded-md shadow-sm p-4 sm:p-5">
          <Filter categories={categories ? categories : []} />
        </div>

        {isLoading ? (
          <div className="mt-10">
            <Loader />
          </div>
        ) : errorMessage ? (
          <div className='flex justify-center items-center h-[200px]'>
            <BiSolidError className='text-slate-800 text-3xl mr-2' />
            <span className='text-slate-800 text-lg font-medium'>
              {errorMessage}
            </span>
          </div>
        ) : (
          <div className='min-h-[700px]'>
            <div className='pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {products && products.map((item, i) => <ProductCard key={i} {...item} />)}
            </div>
            <div className="mt-10">
              <Paginations
                numberOfPage={pagination?.totalPages}
                totalProducts={pagination?.totalElements}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
