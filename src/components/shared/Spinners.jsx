import React from 'react'
import { Oval } from 'react-loader-spinner'

const Spinners = () => {
    return (
        <div className='flex gap-2 items-center justify-center'>
            <Oval
                height="16"
                width="16"
                color="#FFFFFF"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /> Loading...
        </div>
    )
}

export default Spinners