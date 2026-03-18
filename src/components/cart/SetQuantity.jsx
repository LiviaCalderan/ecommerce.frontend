import React from 'react'
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const SetQuantity = ({
  quantity,
  cardCounter,
  handleQtyIncrease,
  handleQtyDecrease
}) => {

  const btnStyles = 'cursor-pointer text-gray-400 hover:text-gray-800';

  return (
    <div className='flex gap-8 items-center'>
      {cardCounter ? null : (
        <div className='font-semibold'>Quantity</div>
      )}
      <div className='flex flex-row items-center lg:text-[22px] text-sm'>
        <button
          onClick={handleQtyDecrease}>
          <CiCircleMinus size={30} className={btnStyles} />
        </button>

        <span className="w-8 text-center text-sm font-medium m-2">{quantity}</span>
        <CiCirclePlus onClick={handleQtyIncrease} size={30} className={btnStyles} />
      </div>
    </div>
  )
}

export default SetQuantity