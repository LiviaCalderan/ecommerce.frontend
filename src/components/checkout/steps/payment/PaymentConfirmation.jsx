import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { stripePaymentConfirmation } from '../../../../store/actions';
import toast from 'react-hot-toast';

const PaymentConfirmation = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { cart } = useSelector(
        (state) => state.carts
    )

    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");

    const { selectedUserCheckoutAddress } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (paymentIntent && clientSecret && redirectStatus && cart?.products?.length > 0) {

            const sendData = {
                addressId: selectedUserCheckoutAddress?.addressId,
                pgName: "Stripe",
                pgPaymentId: paymentIntent,
                pgStatus: "succeeded",
                pgResponseMessage: "Payment Successful"
            }
            dispatch(stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast));
        }
    }, [paymentIntent, clientSecret, redirectStatus, cart])

    return (
        <div className=" lg:px-40 px-4 sm:px-8 py-16 font-raleway bg-gray-100 min-h-[calc(100vh-64px)]">
            {loading ? (
                <Skeleton variant='rounded' width="100%" height={500} animation="wave" />
            ) : (
                <div className='rounded-md border border-gray-300 bg-white overflow-hidden shadow-md p-8 lg:py-10'>
                    <div className='flex flex-col items-center gap-4 justify-center'>
                        <span className='font-bold'>Congratulations</span>
                        <IoMdCheckmarkCircleOutline size={150} className='text-gray-300' />
                        <h1 className='font-anton-sc text-4xl '>Payment Successful!</h1>
                        <p className='font-semibold text-slate-600 text-center'>
                            Thank you for your purchase! Your payment was successful, and we're processing yopur order.
                        </p>
                        <Link to={"/"} className='text-white font-semibold py-2 px-15 mt-3 rounded-lg items-center transition-colors duration-300 flex justify-center bg-black opacity-100 hover:bg-gray-800 cursor-pointer hover:shadow-sm'>
                            Go Back To Shopping
                        </Link>
                    </div>
                </div>
            )}

        </div>
    )
}

export default PaymentConfirmation