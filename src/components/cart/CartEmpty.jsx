import React from 'react'
import { Link } from 'react-router-dom'
import { IoCartOutline } from "react-icons/io5";



const CartEmpty = () => {
    return (
        <div className=" lg:px-40 px-4 sm:px-8 py-16 font-raleway bg-gray-100 min-h-[calc(100vh-64px)]">
            <div className='rounded-md border border-gray-300 bg-white overflow-hidden shadow-md p-8 lg:py-10'>
                <div className='flex flex-col items-center gap-4 justify-center'>
                    <span className='font-bold'>Ops...</span>
                    <IoCartOutline size={150} className='text-gray-200'/>
                    <h1 className='font-anton-sc text-4xl '>Your Cart is
                        <span className='text-blue-500'> Empty</span>
                    </h1>
                    <p className='font-semibold text-slate-600 text-center'>Must add items on the cart before you proceed to check out.</p>
                    <Link to={'/'} className='text-white font-semibold py-2 px-15 mt-3 rounded-lg items-center transition-colors duration-300 flex justify-center bg-black opacity-100 hover:bg-gray-800 cursor-pointer hover:shadow-sm'>
                        Start Shopping
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default CartEmpty