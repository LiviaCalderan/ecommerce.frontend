import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useDispatch, useSelector } from 'react-redux'
import { FiCreditCard, FiDollarSign, FiFileText, FiZap } from 'react-icons/fi'
import { selectedPaymentMethod } from '../../../../store/actions'

const PaymentMethod = () => {

    const dispatch = useDispatch();
    const { paymentMethod } = useSelector(
        (state) => state.payment
    )

    const paymentMethodHandler = (method) => {
        dispatch(selectedPaymentMethod(method));

    }

    const methods = [
        { value: 'Stripe', label: 'Stripe', description: 'Credit and debit cards', icon: FiCreditCard },
        { value: 'Paypal', label: 'PayPal', description: 'Pay with your PayPal balance', icon: FiDollarSign },
        { value: 'Pix', label: 'Pix', description: 'Instant payment - Brazil', icon: FiZap },
        { value: 'Boleto', label: 'Boleto', description: 'Pay at any bank or lottery', icon: FiFileText },
    ]

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">

            <div className="w-full max-w-3xl mb-8 flex flex-col items-start gap-1 pt-6">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500">
                    Checkout
                </span>
                <h1 className="text-4xl font-black font-anton-sc tracking-wider text-black leading-none">
                    Select your Payment Method
                </h1>
                <div className="mt-2 h-1 w-20 bg-black rounded-full" />
            </div>

            <div className="w-full max-w-3xl">

                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
                    <FormControl className="w-full">
                        <RadioGroup
                            aria-label="payment method"
                            name="paymentMethod"
                            value={paymentMethod}
                            onChange={(e) => paymentMethodHandler(e.target.value)}
                            className="flex flex-col gap-4"
                        >
                            {methods.map((method) => {
                                const Icon = method.icon;
                                const isSelected = paymentMethod === method.value;

                                return (
                                    <FormControlLabel
                                        key={method.value}
                                        value={method.value}
                                        control={<Radio color="primary" />}
                                        className={`m-0 w-full items-start rounded-2xl px-4 py-4 transition-all duration-300 cursor-pointer font-raleway
                                            ${isSelected ? "border-black border-2 shadow-lg" : "bg-gray-100 hover:bg-gray-200"}`}
                                        label={
                                            <div className="flex items-start gap-3">
                                                <div className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300
                                                    ${isSelected ? "bg-black text-white" : "bg-gray-100 text-gray-500"}`}>
                                                    <Icon size={18} />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold tracking-wide">
                                                            {method.label}
                                                        </span>

                                                    </div>
                                                    <span className="text-xs text-gray-500">
                                                        {method.description}
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                    />
                                );
                            })}
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod
