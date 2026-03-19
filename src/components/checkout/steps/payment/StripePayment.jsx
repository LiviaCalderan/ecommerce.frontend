import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import React from 'react'

const StripePayment = () => {
  return (
    <div className='h-96 flex justify-center items-center'>
          <Alert variant="filled" severity="warning" style={{ maxWidth: "400px" }}>
            <AlertTitle>Stripe Unavailable</AlertTitle>
            This payment method is not available yet. Please select another payment method.
          </Alert>
        </div>
  )
}

export default StripePayment