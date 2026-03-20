import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaymentForm from './PaymentForm'
import { addUpdateUserAddress, createStripePaymentSecret } from '../../../../store/actions'
import Skeleton from '@mui/material/Skeleton'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const StripePayment = () => {

  const dispatch = useDispatch();

  const { clientSecret } = useSelector(
    (state) => state.auth
  )

  const { cart } = useSelector(
    (state) => state.carts
  )

  const { isLoading, errorMessage } = useSelector(
    (state) => state.errors
  )

  const { user, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth
  )

  const appearance = {
    theme: "flat"
  }

  useEffect(() => {
    if (!clientSecret) {
      const totalPrice = cart?.totalPrice
      const sendData = {
        amount: Number(totalPrice) * 100,
        currency: "brl",
        email: user.email,
        name: `${user.username}`,
        address: selectedUserCheckoutAddress,
        description: `Order for ${user.email}`,
        metadata: {
          test: "1"
        }
      }
      dispatch(createStripePaymentSecret(sendData))
    }
  }, [clientSecret])

  if (isLoading) {
    return(
      <div>
        <Skeleton variant='rounded' width="100%" height={500} animation="wave" />
      </div>
    )
  }

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={cart?.totalPrice} />
        </Elements>
      )}
    </>
  )
}

export default StripePayment