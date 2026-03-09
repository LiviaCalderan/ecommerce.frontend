import React from 'react'
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className='flex justify-center items-center w-full h-[450px]'>
            <div className='flex flex-col items-center gap-1'>
                <RotatingLines
                    visible={true}
                    height="60"
                    width="60"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                <p className='text-gray-600 font-semibold'>Loading</p>
            </div>

        </div>

    )
}

export default Loader