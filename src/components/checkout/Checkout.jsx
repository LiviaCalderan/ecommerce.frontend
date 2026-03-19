import React, { useEffect, useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import AddressInfo from './steps/address/AddressInfo';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import Skeleton from '@mui/material/Skeleton';
import ErrorPage from '../shared/ErrorPage';
import PaymentMethod from './steps/paymentMethod/PaymentMethod';
import OrderSummary from './steps/order/OrderSummary';
import StripePayment from './steps/payment/StripePayment';
import PaypalPayment from './steps/payment/PaypalPayment';


const Checkout = () => {

    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const { address, selectedUserCheckoutAddress } = useSelector(
        (state) => state.auth
    )

    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    )

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    }

    const handleNext = () => {
        if (activeStep === 0 && !selectedUserCheckoutAddress) {
            toast.error("Please, select a delivery address before proceeding.")
            return;
        }
        if (activeStep === 1 && !paymentMethod) {
            toast.error("Please, select a payment method before proceeding.")
            return;
        }

        setActiveStep((prevStep) => prevStep + 1);
    }

    const { paymentMethod } = useSelector(
        (state) => state.payment
    )

    const { cart } = useSelector(
        (state) => state.carts
    )

    const steps = [
        // { id: 1, label: "Info" },
        { id: 1, label: "Address" },
        { id: 2, label: "Payment Method" },
        { id: 3, label: "Review" },
        { id: 4, label: "Payment" },
    ]

    useEffect(() => {
        dispatch(getUserAddresses());
    }, [dispatch]);

    return (
        <div className='lg:px-16 px-8 py-14 min-h-[calc(100vh-64px)] font-raleway'>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step, i) => (
                    <Step key={step.id}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {isLoading ? (
                <div className='relative p-6 rounded-lg w-full max-w-3xl mx-auto'>
                    <Skeleton variant='rounded' width="100%" height={500} animation="wave" />

                </div>
            ) : (
                <div className='mt-10'>
                    {activeStep === 0 && <AddressInfo address={address} />}
                    {activeStep === 1 && <PaymentMethod />}
                    {activeStep === 2 && <OrderSummary
                        totalPrice={cart?.totalPrice}
                        cart={cart}
                        address={selectedUserCheckoutAddress}
                        paymentMethod={paymentMethod} />}
                    {activeStep === 3 && <>
                        {paymentMethod === "Stripe" ? (
                            <StripePayment />
                        ) : (
                            <PaypalPayment />
                        )
                        }</>}
                </div>
            )}


            <div className='flex justify-between items-center px-16 md:px-40 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-200'
                style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100,0.15)" }}>
                <button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={`bg-black font-semibold font-raleway px-6 h-10 rounded-md text-white
                       ${activeStep === 0 ? "opacity-30" : "cursor-pointer"}`}
                >
                    Back
                </button>

                {activeStep !== steps.length - 1 && (
                    <button
                        disabled={
                            errorMessage || (
                                (activeStep === 0 ? !selectedUserCheckoutAddress
                                    : activeStep === 1 ? !paymentMethod
                                        : false
                                )
                            )
                        } className={`bg-black font-semibold font-raleway px-6 h-10 rounded-md text-white
                       ${errorMessage ||
                                (activeStep === 0 && !selectedUserCheckoutAddress) ||
                                (activeStep === 1 && !paymentMethod)
                                ? "opacity-30"
                                : "cursor-pointer"
                            }`}
                        onClick={handleNext}>
                        Proceed
                    </button>
                )}

            </div>

            {errorMessage && <ErrorPage message={errorMessage} />}

        </div>
    )
}

export default Checkout