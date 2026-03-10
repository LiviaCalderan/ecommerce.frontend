import React, { useEffect } from 'react'
import Hero from './Hero'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../store/actions';
import ProductCard from '../shared/ProductCard';
import { Link } from 'react-router-dom';
import { FiArrowRight } from "react-icons/fi";
import Loader from '../shared/Loader';

const Home = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);

    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch]);

    return (
        <div className='lg:px-[160px] px-[32px]'>

            <div>
                <Hero />
            </div>
            <div className='py-3'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-slate-700 text-2xl font-bold'>
                        <span>New Arrivals</span>
                    </h1>
                    <Link className='flex justify-center items-center gap-1 font-semibold underline'
                        to={"/products"}>
                        More Products
                        <FiArrowRight size={15} />
                    </Link>

                </div>

                {isLoading ? (
                    <Loader />
                ) : errorMessage ? (
                    <div className='flex justifiy-center items-center h-[200px]'>
                        <BiSolidError className='text-slate-800 text-3xl mr-2' />
                        <span className='text-slate-800 text-lg font-medium'>
                            {errorMessage}
                        </span>
                    </div>
                ) : (
                    <div className='pb-6 pt-8 grid 2x1:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 gap-y-6 gap-x-6'>
                        {products && products?.slice(0, 8).map((item, i) => <ProductCard key={i} {...item} />)}
                    </div>
                )}
            </div>


        </div>
    )
}

export default Home