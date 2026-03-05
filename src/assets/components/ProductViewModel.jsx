import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { Divider } from '@mui/material';
import { useState } from 'react'
import { MdClose, MdDone } from 'react-icons/md';
import { FaCartShopping } from "react-icons/fa6";
import Status from './Status';

function ProductViewModal({ open, setOpen, product, isAvailable }) {

    if (!product) return null;

    const btnLoader = false;

    const {
        id,
        productName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice
    } = product;

    const handleClickOpen = () => {
        setOpen(true)
    }

    return (
        <>

            <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={setOpen}>
                <DialogBackdrop className="fixed inset-0 bg-black opacity-30 transition-opacity" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w[620px] md:min-w-[620px]"
                        >

                            {image && (
                                <div className='flex justifiy-center aspect-[3/2] relative'>
                                    <img className='' src={image} alt={productName}></img>
                                    
                                    {isAvailable ? (
                                            
                                            <Status text="Em estoque" icon={MdDone} bg='bg-[#3e7b31]' color='text-white' />
                                        ) : (
                                            
                                            <Status text="Indisponível" icon={MdClose} bg='bg-[#ae2f27]' color='text-white' />
                                        )}
                                </div>

                            )}

                            <div className='px-6 pt-10 pb-2'>
                                <DialogTitle as="h1" className="lg:text-3xl sm:text-2x1 text-xl font-semibold leading-6 text-gray-800 mb-4">
                                    {productName}
                                </DialogTitle>

                                <div className='space-y-2 text-gray-700 pb-4 flex flex-col gap-2'>
                                    <div className='flex  items-center justify-between gap-2'>
                                        {specialPrice ? (
                                            <div className='flex flex-col'>
                                                <span className='text-xs line-through font-medium text-gray-400'>
                                                    {Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </span>
                                                <span className='text-xl  font-bold text-slate-700'>
                                                    {Number(specialPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className='flex flex-col'>
                                                <span className='text-xs text-transparent'>
                                                    .
                                                </span>
                                                <span className='text-xl font-bold text-slate-700'>
                                                    {Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </span>
                                            </div>
                                        )}
                                        
                                        
                                    </div>

                                    <Divider />
                                    <p>{description}</p>
                                </div>
                            </div>
                            <div className='px-6 py-4 flex justify-end gap-4'>
                                <button
                                    disabled={!isAvailable || btnLoader}
                                    onClick={() => { }} className={`text-white font-medium py-2 px-3 mt-3 rounded-lg items-center transition-colors duration-300 flex justify-center
                                                        ${isAvailable ? "bg-[#237a8a]  opacity-100 hover:bg-[#1c616e] cursor-pointer" : "bg-gray-400  "} `}>
                                    <FaCartShopping className='mr-2' />
                                    {isAvailable ? "Adicionar ao Carrinho" : "Fora de Estoque"}
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default ProductViewModal;