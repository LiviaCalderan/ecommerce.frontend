import React, { useState } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import ProductViewModal from './ProductViewModel';
import truncateText from '../../utils/truncateText';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addProductToCart } from '../../store/actions';

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
    const [btnLoader, setBtnLoader] = useState(false);
    const [selectViewProduct, setSelectViewProduct] = useState();
    const isAvailable = stock && Number(stock) > 0;
    const dispatch = useDispatch();

    const handleProductView = (product) => {
        setSelectViewProduct(product);
        setOpenProductViewModal(true);
    };

    const addToCartHandler = () => {
        dispatch(addProductToCart(productId, 1, toast, setBtnLoader));
    }

    return (
        <div className='group bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md h-full flex flex-col'>
            <div
                onClick={() => {
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
                className='w-full overflow-hidden aspect-[4/3] bg-zinc-100 cursor-pointer'
            >
                <img
                    className='w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105'
                    src={image}
                    alt={productName}
                />
            </div>
            <div className='p-4 flex flex-col flex-1'>
                <h2
                    onClick={() => {
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
                    className='text-sm font-semibold text-zinc-900 leading-snug line-clamp-2 cursor-pointer'
                >
                    {truncateText(productName, 34)}
                </h2>

                <div className='mt-2 flex-1'>
                    {specialPrice ? (
                        <div className='flex flex-col font-sans'>
                            <span className='text-xs line-through font-medium text-gray-400'>
                                {Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                            <span className='text-lg font-semibold text-zinc-900'>
                                {Number(specialPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                        </div>
                    ) : (
                        <div className='flex flex-col font-sans'>
                            <span className='text-xs text-transparent'>.</span>
                            <span className='text-lg font-semibold text-zinc-900'>
                                {Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                        </div>
                    )}
                </div>

                <button
                    disabled={!isAvailable || btnLoader}
                    onClick={addToCartHandler}
                    className={`mt-4 w-full text-white text-xs font-bold uppercase tracking-widest py-2.5 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2
                        ${isAvailable ? "bg-black hover:bg-gray-800 cursor-pointer" : "bg-gray-400"}`}
                >
                    <FaCartShopping className='text-sm' />
                    {isAvailable ? "Adicionar ao Carrinho" : "Fora de Estoque"}
                </button>
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
