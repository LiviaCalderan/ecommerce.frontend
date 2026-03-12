import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";

const Cart = () => {

    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.carts);
    const newCart = { ...cart };

    newCart.totalPrice = cart?.reduce(
        (acc, cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity), 0
    );

    if (!cart || cart.length === 0) return <CartEmpty />;

    return (
        <div className=" lg:px-40 px-4 sm:px-8 py-16 font-raleway">

            {/* Page heading */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold uppercase tracking-widest text-black font-anton-sc">
                    Shopping Cart
                </h1>
                <p className="text-sm text-gray-600 font-medium mt-1">
                    All your selected items
                </p>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-gray-300 overflow-hidden shadow-md">

                {/* Table header */}
                <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-3.5 bg-gray-200 border-b border-zinc-100">
                    <div className="col-span-2 text-[12px] font-extrabold uppercase tracking-widest text-black">
                        Product
                    </div>
                    <div className="text-[12px] font-extrabold uppercase tracking-widest text-black text-center">
                        Price
                    </div>
                    <div className="text-[12px] font-extrabold uppercase tracking-widest text-black text-center">
                        Quantity
                    </div>
                    <div className="text-[12px] font-extrabold uppercase tracking-widest text-black text-center">
                        Total
                    </div>
                </div>

                {/* Cart items */}
                <div>
                    {cart && cart.length > 0 &&
                        cart.map((item, i) => <ItemContent key={i} {...item}/>)}
                </div>

            </div>

            {/* Summary */}
            <div className="mt-6 flex sm:flex-row flex-col sm:justify-end gap-4">
                <div className="w-full md:w-[320px] border border-gray-300 rounded-2xl overflow-hidden shadow-md">

                    {/* Summary header */}
                    <div className="px-6 py-4 border-b border-zinc-100 bg-gray-200">
                        <h2 className="text-[12px] font-extrabold uppercase tracking-widest text-black">
                            Order Summary
                        </h2>
                    </div>

                    {/* Subtotal */}
                    <div className="px-6 py-5 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-500">Subtotal</span>
                            <span className="font-semibold text-zinc-900 font-sans">
                                {Number(newCart.totalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 italic">
                            Taxes and shipping calculated at checkout
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="px-6 pb-6 pt-2 flex flex-col gap-3">
                        <Link to="/checkout" className="block">
                            <button
                                onClick={() => { }}
                                className="w-full py-3.5 bg-black text-white text-xs font-bold tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 cursor-pointer"
                            >
                                <MdShoppingCart size={16} />
                                Checkout
                            </button>
                        </Link>

                        <Link
                            to="/products"
                            className="flex items-center justify-center gap-1.5 text-xs text-gray-600 font-medium underline"
                        >
                            <MdArrowBack size={13} />
                            Continue Shopping
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Cart;