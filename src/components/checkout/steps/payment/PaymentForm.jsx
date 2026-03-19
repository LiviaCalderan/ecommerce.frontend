import Skeleton from '@mui/material/Skeleton';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'

const PaymentForm = ({ clientSecret, totalPrice }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        //VERIFICA ERROS NO FORM
        const { error: submitError} = await elements.submit();

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`,
            },
        });

        if (error) {
            setErrorMessage(error.message);
            return false;
        }
    };

    const paymentElementOptions = {
        layout: "tabs",
    }

    const isLoading = !clientSecret || !stripe || !elements;

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">

            <div className="w-full max-w-3xl mb-8 flex flex-col items-start gap-1 pt-6">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500">
                    Checkout
                </span>
                <h1 className="text-4xl font-black font-anton-sc tracking-wider text-black leading-none">
                    Payment Information
                </h1>
                <div className="mt-2 h-1 w-20 bg-black rounded-full" />
            </div>

            <div className="w-full max-w-3xl">

                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                        {isLoading ? (
                            <Skeleton variant='rounded' width="100%" height={500} animation="wave" />
                        ) : (
                            <>
                                {clientSecret && <PaymentElement options={paymentElementOptions} />}
                                {errorMessage && (
                                    <div className='text-red-500 mt-2'>{errorMessage}</div>
                                )}

                                <button disabled={!stripe || isLoading} className='bg-black font-semibold font-raleway px-6 h-10 rounded-md text-white cursor-pointer'>
                                    {!isLoading ? `Pay R$ ${Number(totalPrice).toFixed(2)}` : "Processing"}
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PaymentForm