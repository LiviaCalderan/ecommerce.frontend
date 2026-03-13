import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
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
        specialPrice
    } = product;

    return (
        <>
            <Dialog open={open} as="div" className="relative z-10 focus:outline-none font-raleway" onClose={setOpen}>
                <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="relative w-full max-w-4xl transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all"
                        >
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-100"
                                aria-label="Close dialog"
                                type="button"
                            >
                                <MdClose size={16} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr]">
                                {image && (
                                    <div className='relative p-4 sm:p-5'>
                                        <div className="w-full overflow-hidden rounded-lg">
                                            <div className="aspect-5/4 md:aspect-4/3 w-full">
                                                <img
                                                    className='h-full w-full object-cover object-center'
                                                    src={image}
                                                    alt={productName}
                                                />
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0" />

                                        {isAvailable ? (
                                            <Status text="Em estoque" icon={MdDone} bg='bg-[#3e7b31]' color='text-white' />
                                        ) : (
                                            <Status text="Indisponivel" icon={MdClose} bg='bg-[#ae2f27]' color='text-white' />
                                        )}
                                    </div>
                                )}

                                <div className='px-6 py-8 md:px-8 md:py-10 flex flex-col items-start text-left'>
                                    <div className="flex items-start">
                                        <DialogTitle as="h1" className="text-2xl sm:text-3xl font-semibold text-zinc-900 leading-tight">
                                            {productName}
                                        </DialogTitle>
                                    </div>

                                    <div className='mt-4 space-y-3 text-zinc-700 w-full'>
                                        {specialPrice ? (
                                            <div className='flex items-end gap-3 font-sans'>
                                                <span className='text-2xl sm:text-3xl font-semibold text-zinc-900'>
                                                    {Number(specialPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </span>
                                                <span className='text-xs line-through font-medium text-gray-400'>
                                                    {Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className='flex flex-col font-sans'>
                                                <span className='text-xs text-transparent'>.</span>
                                                <span className='text-2xl sm:text-3xl font-semibold text-zinc-900'>
                                                    {Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </span>
                                            </div>
                                        )}

                                        <div className="pt-2">
                                            <p className="text-sm text-zinc-600 leading-relaxed text-center">
                                                {description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='mt-8 flex w-full justify-center'>
                                        <button
                                            disabled={!isAvailable || btnLoader}
                                            onClick={() => { }}
                                            className={`w-full sm:w-auto text-white text-xs font-bold uppercase tracking-widest py-3 px-5 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2
                                                ${isAvailable ? "bg-black hover:bg-gray-800 cursor-pointer" : "bg-gray-400"}`}
                                        >
                                            <FaCartShopping className='text-sm' />
                                            {isAvailable ? "Adicionar ao Carrinho" : "Fora de Estoque"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default ProductViewModal;
