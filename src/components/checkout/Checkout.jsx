import React, { useEffect, useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import AddressInfo from './steps/address/AddressInfo';


const Checkout = () => {

    const [activeSet, setActiveSet] = useState(0);
    const dispatch = useDispatch();
    const { address } = useSelector(
        (state) => state.auth
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
            <Stepper activeStep={activeSet} alternativeLabel>
                {steps.map((step, i) => (
                    <Step key={step.id}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div className='mt-10'>
                {activeSet === 0 && <AddressInfo address={address} />}

            </div>
        </div>
    )
}

export default Checkout