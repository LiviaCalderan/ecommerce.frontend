import React from 'react'
import { IoCartOutline } from 'react-icons/io5';
import { FaCashRegister } from "react-icons/fa6";
import OrderTable from './OrderTable';
import { useSelector } from 'react-redux';
import useOrderFilter from '../../../hooks/useOrderFilter';

const Orders = () => {

    // const adminOrder = [{ "orderId": "a41e54dc-e409-4eb4-83cb-3535fb9a9702", "email": "user1@example.com", "orderItems": [ { "orderItemId": 3, "product": { "productId": 20, "productName": "The Picture of Dorian Gray", "description": "Oscar Wilde's philosophical novel about a man who remains young while his portrait ages, exploring vanity, morality, and corruption.", "image": "default.png", "stock": 67, "price": 55.0, "discount": 5.0, "specialPrice": 52.25, "quantity": null }, "quantity": 1, "discount": 5.0, "orderedProductPrice": 52.25 }, { "orderItemId": 4, "product": { "productId": 19, "productName": "1984", "description": "A dystopian novel by George Orwell depicting a totalitarian society under constant surveillance, exploring themes of freedom, truth, and government control.", "image": "default.png", "stock": 99, "price": 45.0, "discount": 5.0, "specialPrice": 42.75, "quantity": null }, "quantity": 1, "discount": 5.0, "orderedProductPrice": 42.75 } ], "orderDate": "2026-03-19T18:34:46.105337", "payment": { "paymentId": 2, "paymentMethod": "online", "pgPaymentId": "pi_3TCp7iPapNQcOrVT2guYqWWA", "pgStatus": "succeeded", "pgResponseMessage": "Payment Successful", "pgName": "Stripe" }, "totalAmount": 95.0, "orderStatus": "CONFIRMED", "addressId": 2 }]
    // const pagination = [ { pageNumber: 0, pageSize: 50, totalElements: 11, totalPages: 1, lastPage: true }]

    const { adminOrder, pagination } = useSelector(
        (state) => state.order
    )
    useOrderFilter();

    const emptyOrder = !adminOrder || adminOrder?.length === 0;

    return (
        <div className='pb-6'>
            {emptyOrder ? (

                <div className='flex flex-col items-center gap-8 justify-center pt-30'>
                    <FaCashRegister size={150} className='text-gray-200' />
                    <h1 className='font-anton-sc text-4xl '>
                        No Order Placed Yet.
                    </h1>
                </div>


            ) : (
                <OrderTable adminOrder={adminOrder} pagination={pagination}/>
            )}
        </div>
    )
}

export default Orders