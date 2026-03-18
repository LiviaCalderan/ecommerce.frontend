import React, { useEffect, useState } from 'react'
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from './SetQuantity';
import { useDispatch } from 'react-redux';
import { decreaseCartQuantity, increaseCartQuantity, removeFromCart } from '../../store/actions';
import toast from 'react-hot-toast';


const ItemContent = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    cartId
}) => {

    const dispatch = useDispatch();


    const handleQtyIncrease = () => {
        dispatch(increaseCartQuantity(
            productId,
            toast
        ));
    }

    const handleQtyDecrease = () => {

        if (quantity <= 1) {
            dispatch(removeFromCart(productId, toast));
        } else {
            dispatch(decreaseCartQuantity(productId, toast));
        }

    }

    const removeItemFromCart = (productId) => {
        dispatch(removeFromCart(productId, toast))
    }

    return (
        <div className="font-raleway border-b border-zinc-100 last:border-b-0">

            {/* MOBILE layout (< md) */}
            <div className="flex md:hidden gap-3 px-4 py-4 items-start">
                {/* THUMBNAIL */}
                <div className="w-20 h-20 rounded-xl bg-zinc-100 overflow-hidden shrink-0">
                    <img src={`${image}`} alt={productName} className="w-full h-full object-cover" />
                </div>

                {/* INFO */}
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-zinc-900 leading-snug line-clamp-2">
                        {productName}
                    </h3>

                    {/* PRICE */}
                    <div className="flex items-center gap-2 font-sans">
                        <span className="text-sm font-medium text-black">
                            {Number(specialPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                        {price && price !== specialPrice && (
                            <span className="text-xs text-gray-400 line-through">
                                {Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                        )}
                    </div>

                    {/* QTD + TOTAL */}
                    <div className="flex items-center justify-between mt-1 font-sans">
                        <span className="text-xs text-zinc-500">
                            <SetQuantity
                                quantity={quantity}
                                cardCounter={true}
                                handleQtyIncrease={handleQtyIncrease}
                                handleQtyDecrease={handleQtyDecrease} />
                        </span>
                        <span className="text-sm font-semibold text-zinc-900">
                            {Number(quantity * Number(specialPrice)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                    </div>

                    {/* REMOVE */}
                    <button
                        onClick={() => removeItemFromCart(productId)}
                        className="flex items-center gap-1.5 text-xs font-medium text-rose-800 border border-rose-800 rounded-lg px-2.5 py-1 w-fit cursor-pointer hover:bg-rose-700 hover:text-white mt-1"
                    >
                        <HiOutlineTrash size={13} />
                        Remove
                    </button>
                </div>
            </div>

            {/*  DESKTOP layout (≥ md) */}
            <div className="hidden md:grid md:grid-cols-5 gap-4 px-6 py-5 items-center">

                {/* PRODUCT */}
                <div className="md:col-span-2 flex gap-4 items-center">
                    <div className="w-30 h-20 rounded-xl bg-zinc-100 overflow-hidden shrink-0">
                        <img src={`${image}`} alt={productName} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex flex-col gap-2">
                        <h3 className="text-sm font-semibold text-zinc-900 leading-snug line-clamp-2">
                            {productName}
                        </h3>
                        <button
                            onClick={() => removeItemFromCart(productId)}
                            className="flex items-center gap-1.5 text-xs font-medium text-rose-800 border border-rose-800 rounded-lg px-2.5 py-1 w-fit cursor-pointer hover:bg-rose-700 hover:text-white"
                        >
                            <HiOutlineTrash size={13} />
                            Remove
                        </button>
                    </div>
                </div>

                {/* PRICE */}
                <div className="justify-self-center flex flex-col items-center font-sans">
                    <span className="text-sm font-medium text-black">
                        {Number(specialPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    {price && price !== specialPrice && (
                        <span className="text-xs text-gray-500 line-through">
                            {Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                    )}
                </div>

                {/* QUANTITY */}
                <div className="justify-self-center font-sans">
                    <SetQuantity
                        quantity={quantity}
                        cardCounter={true}
                        handleQtyIncrease={handleQtyIncrease}
                        handleQtyDecrease={handleQtyDecrease} />
                </div>

                {/* TOTAL */}
                <div className="justify-self-center font-sans">
                    <span className="text-sm font-semibold text-zinc-900">
                        {Number(quantity * Number(specialPrice)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                </div>

            </div>
        </div>
    )
}

export default ItemContent
