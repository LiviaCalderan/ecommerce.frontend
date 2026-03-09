import React, { useState } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import ProductViewModal from './ProductViewModel';
import truncateText from '../../utils/truncateText';

const ProductCard = ({
    productId,
    productName,
    image,
    description,
    stock,
    price,
    discount,
    specialPrice
}) => {

    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const btnLoader = false;
    const [selectViewProduct, setSelectViewProduct] = useState();
    const isAvailable = stock && Number(stock) > 0;

    const handleProductView = (product) => {
        setSelectViewProduct(product);
        setOpenProductViewModal(true);
    };

    return (
        <div className='border-1 border-gray-300 rounded-lg shadow-xl overflow-hidden transition-shadow duration-300'>
            <div onClick={() => {
                handleProductView({
                    id: productId,
                    productName,
                    image,
                    description,
                    stock,
                    price,
                    discount,
                    specialPrice
                })
            }}
                className='w-full overflow-hidden aspect-3/2'>
                <img className='w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105' src={image} alt={productName}></img>
            </div>
            <div className='p-4'>
                <h2 onClick={() => {
                    handleProductView({
                        id: productId,
                        productName,
                        image,
                        description,
                        stock,
                        price,
                        discount,
                        specialPrice
                    })
                }} className='text-xl font-bold mb-2 line-clamp-2 cursor-pointer'>
                    {truncateText(productName, 30)}
                </h2>

                <div className='flex flex-col justify-between'>
                    {specialPrice ? (
                        <div className='flex flex-col'>
                            <span className='text-xs line-through font-medium text-gray-400'>
                                {Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                            <span className='text-xl font-bold text-slate-700'>
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

                    <button
                        disabled={!isAvailable || btnLoader}
                        onClick={() => { }} className={`text-white font-medium py-2 px-3 mt-3 rounded-lg items-center transition-colors duration-300 flex justify-center
                        ${isAvailable ? "bg-[#237a8a]  opacity-100 hover:bg-[#1c616e] cursor-pointer" : "bg-gray-400  "} `}>
                        <FaCartShopping className='mr-2' />
                        {isAvailable ? "Adicionar ao Carrinho" : "Fora de Estoque"}
                    </button>
                </div>

            </div>

            <ProductViewModal
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectViewProduct}
                isAvailable={isAvailable} />
        </div>
    )
}

export default ProductCard