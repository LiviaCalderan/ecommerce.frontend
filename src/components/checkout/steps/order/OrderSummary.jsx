import React from 'react'

const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center font-raleway">

            <div className="w-full max-w-5xl mb-8 flex flex-col items-start gap-1 pt-6">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500">
                    Checkout
                </span>
                <h1 className="text-4xl font-black font-anton-sc tracking-wider text-black leading-none">
                    Order Summary
                </h1>
                <div className="mt-2 h-1 w-20 bg-black rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-5xl">

                {/* COLUNA PRINCIPAL */}
                <div className="lg:col-span-2 bg-white border-2 border-gray-200 rounded-2xl p-6">
                    <div className='w-full flex flex-col gap-2'>

                        {/* DELIVERY ADDRESS INFO */}
                        <div className='m-0 w-full items-start rounded-2xl px-4 py-4 transition-all duration-300 bg-gray-100 hover:bg-gray-200'>
                            <div className="flex flex-col gap-2">
                                <span className="text-lg font-anton-sc uppercase tracking-wider">
                                    Billing Address
                                </span>
                                <div>
                                    <div className="text-sm text-gray-800 font-semibold flex md:flex-row md:gap-4 flex-col justify-start">
                                        <div>
                                            <strong>Street: </strong>
                                            <span className='tracking-wider'>{address?.street}</span>
                                        </div>
                                        <div>
                                            <strong>Number: </strong>
                                            <span className='tracking-wider font-sans'>{address?.number}</span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-800 font-semibold flex md:flex-row md:gap-4 flex-col justify-start">
                                        <div>
                                            <strong>City: </strong>
                                            <span className='tracking-wider'>{address?.city}</span>
                                        </div>
                                        <div>
                                            <strong>State: </strong>
                                            <span className='tracking-wider'>{address?.state}</span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-800 font-semibold flex md:flex-row md:gap-4 flex-col justify-start">
                                        <div>
                                            <strong>Country: </strong>
                                            <span className='tracking-wider'>{address?.country}</span>
                                        </div>
                                        <div>
                                            <strong>PinCode|CEP: </strong>
                                            <span className='tracking-wider font-sans'>{address?.pincode}</span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-800 font-semibold">
                                        <div>
                                            <strong>Complement: </strong>
                                            <span className='tracking-wider font-sans'>{address?.buildingName}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PAYMENT METHOD */}
                        <div className='m-0 w-full items-start rounded-2xl px-4 py-4 transition-all duration-300 bg-gray-100 hover:bg-gray-200'>
                            <div className="flex flex-col gap-2">
                                <span className="text-lg font-anton-sc uppercase tracking-wider">
                                    Payment Method
                                </span>
                                <p className="text-sm text-gray-800 font-semibold">
                                    <strong>Selected: </strong>
                                    <span className='tracking-wider'>{paymentMethod}</span>
                                </p>
                            </div>
                        </div>

                        {/* ORDER ITEMS */}
                        <div className='m-0 w-full items-start rounded-2xl px-4 py-4 transition-all duration-300 bg-gray-100 hover:bg-gray-200'>
                            <div className="flex flex-col gap-2">
                                <span className="text-lg font-anton-sc uppercase tracking-wider">Order Items</span>

                                {cart?.products?.map((product, i) => (
                                    <div key={i} className="font-raleway border-b border-zinc-200 last:border-b-0">

                                        {/* MOBILE */}
                                        <div className="flex md:hidden gap-3 px-2 py-4 items-start">
                                            <div className="w-20 h-20 rounded-xl bg-zinc-100 overflow-hidden shrink-0">
                                                <img src={product.image} alt={product.productName} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col gap-1">
                                                <h3 className="text-sm font-semibold text-zinc-900">{product.productName}</h3>
                                                <span className="text-sm font-medium font-sans">
                                                    {Number(product.specialPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </span>
                                                <span className="text-xs text-zinc-500">Qty: {product.quantity}</span>
                                                <span className="text-sm font-semibold font-sans">
                                                    Total: {Number(product.quantity * product.specialPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </span>
                                            </div>
                                        </div>

                                        {/* DESKTOP */}
                                        <div className="hidden md:grid md:grid-cols-5 gap-4 px-4 py-4 items-center">
                                            <div className="md:col-span-2 flex gap-4 items-center">
                                                <div className="w-16 h-16 rounded-xl bg-zinc-100 overflow-hidden shrink-0">
                                                    <img src={product.image} alt={product.productName} className="w-full h-full object-cover" />
                                                </div>
                                                <h3 className="text-sm font-semibold text-zinc-900 line-clamp-2">{product.productName}</h3>
                                            </div>
                                            <div className="justify-self-center flex flex-col items-center font-sans">
                                                <span className="text-sm font-medium">
                                                    {Number(product.specialPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </span>
                                                {product.price !== product.specialPrice && (
                                                    <span className="text-xs text-gray-400 line-through">
                                                        {Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="justify-self-center font-anton-sc uppercase text-xs text-black">
                                                Qty: {product.quantity}
                                            </div>
                                            <div className="justify-self-center font-sans font-semibold text-sm">
                                                {Number(product.quantity * product.specialPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* TOTAL */}
                <div className="lg:col-span-1 h-fit bg-white border-2 border-gray-200 rounded-2xl p-6 lg:sticky lg:top-6 mb-20">
                    <span className="text-lg font-anton-sc uppercase tracking-wider">Order Total</span>
                    <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-zinc-200">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="font-semibold font-sans">
                                {Number(totalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Shipping</span>
                            <span className="font-semibold text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold border-t border-zinc-200 pt-3">
                            <span>Total</span>
                            <span className="font-sans">
                                {Number(totalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderSummary