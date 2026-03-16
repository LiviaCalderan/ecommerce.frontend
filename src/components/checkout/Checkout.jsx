import React, { useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const Checkout = () => {

    const [activeSet, setActiveSet] = useState(0);
    const steps = [
        { id: 1, label: "Identification" },
        { id: 2, label: "Address"},
        { id: 3, label: "Payment Method"},
        { id: 4, label: "Order Summary" },
        { id: 5, label: "Payment"},
    ]

    return (
        <div className='lg:px-16 px-8 py-14 min-h-[calc(100vh-64px)] font-raleway'>
            <Stepper activeStep={activeSet} alternativeLabel>
                {steps.map((step, i) => (
                    <Step key={step.id}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                    ))}
            </Stepper>
        </div>
    )
}

export default Checkout