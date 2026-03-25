import React from 'react'
import { FaBarcode, FaCalendar, FaTruckLoading, FaMapPin } from 'react-icons/fa';
import { MdOutlinePayment } from 'react-icons/md';
import { formatDate } from '../../utils/formatDate'

const OrderList = ({ order = [], addresses = [] }) => {
    const addressById = React.useMemo(() => {
        if (!Array.isArray(addresses)) {
            return {};
        }
        return addresses.reduce((acc, address) => {
            acc[address.addressId] = address;
            return acc;
        }, {});
    }, [addresses]);

    const getOrderAddress = (orderItem) => {
        return orderItem?.address || addressById[orderItem?.addressId];
    };

    const formatCurrency = (value) => {
        if (value === null || value === undefined || value === "") {
            return "—";
        }
        const numberValue = Number(value);
        if (Number.isNaN(numberValue)) {
            return String(value);
        }
        return numberValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    };
  
    return (
            <div className="min-h-screen bg-white flex flex-col items-center">
    
                <div className="w-full max-w-3xl mb-8 flex flex-col items-start gap-1">
    
                    <h1 className="text-4xl font-black font-anton-sc tracking-wider text-black leading-none">
                        Your Orders
                    </h1>
                    <div className="mt-2 h-1 w-20 bg-black rounded-full" />
                </div>
    
                {/* ORDER CARD */}
                <div className="w-full max-w-3xl flex flex-col gap-4">
                    {order.map((order) => {
                        const orderAddress = getOrderAddress(order);
                        return (
                            <div
                                key={order.orderId}
                                className={`relative group w-full rounded-2xl border-2 cursor-pointer transition-all duration-300 overflow-hidden
                                 bg-white text-black border-gray-200 hover:border-black hover:shadow-md`}
                            >
    
                                <div className="p-8">

    
                                    <div className="flex flex-col gap-3">
    
                                    
                                        <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-100">
                                            <div className={`mt-0.5 flex-shrink-0`}>
                                                <FaBarcode size={16} />
                                            </div>
                                            <div>
                                                <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 text-gray-500`}>Order Id</p>
                                                <p className="text-sm font-semibold font-sans uppercase leading-tight">
                                                    {order.orderId}
                                                </p>
                                            </div>
                                        </div>
    
                                        
                                        <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-100">
                                            <div className={`mt-0.5 shrink-0 text-gray-500`}>
                                                <FaCalendar size={16} />
                                            </div>
                                            <div>
                                                <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 text-gray-500`}>Order Date</p>
                                                <p className="text-sm font-semibold leading-tight font-sans">
                                                    {formatDate(order.orderDate)}
                                                </p>
                                            </div>
                                        </div>
    
                                        {/* DELIVERY ADDRESS */}
                                        <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-100">
                                            <div className={`mt-0.5 flex-shrink-0 text-gray-500`}>
                                                <FaMapPin size={16} />
                                            </div>
                                            <div>
                                                <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 text-gray-500`}>Delivery Address</p>
                                                {orderAddress ? (
                                                    <div className="flex flex-col gap-0.5">
                                                        <p className="text-sm font-semibold leading-tight">
                                                            {orderAddress.street}, {orderAddress.number}
                                                            {orderAddress.buildingName ? ` - ${orderAddress.buildingName}` : ""}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {orderAddress.city}/{orderAddress.state} · {orderAddress.country} · CEP {orderAddress.pincode}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm font-semibold leading-tight text-gray-400 italic">
                                                        Address not found
                                                    </p>
                                                )}
                                            </div>
                                        </div>
    
                                        {/* PAYMENT */}
                                        <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-100">
                                            <div className={`mt-0.5 flex-shrink-0 text-gray-500`}>
                                                <MdOutlinePayment size={16} />
                                            </div>
                                            <div>
                                                <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 text-gray-500`}>Total Amount</p>
                                                <p className="text-sm font-semibold font-sans tracking-widest leading-tight">
                                                    {formatCurrency(order.totalAmount)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* STATUS */}
                                        <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-100">
                                            <div className={`mt-0.5 flex-shrink-0 text-gray-500`}>
                                                <FaTruckLoading size={16} />
                                            </div>
                                            <div>
                                                <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 text-gray-500`}>Status</p>
                                                <p className="text-sm font-semibold leading-tight">
                                                    {order.orderStatus}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
}

export default OrderList
