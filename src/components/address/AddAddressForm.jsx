import React, { useState } from 'react'
import InputField from '../shared/InputField';
import Spinners from '../shared/Spinners';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addUpdateUserAddress } from '../../store/actions';
import toast from 'react-hot-toast';

const AddAddressForm = ({ address, setOpenAddressModel }) => {

    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({ mode: "onTouched" });
    const { btnLoader } = useSelector((state) => state.errors);
    const onSaveAddressHandler = async (data) => {
        dispatch(addUpdateUserAddress(
            data,
            toast,
            address?.addressId,
            setOpenAddressModel
        ))
    }

    return (
        <div className="w-full flex flex-col items-center justify-center py-5">

            <form
                onSubmit={handleSubmit(onSaveAddressHandler)}
                className="w-full max-w-sm flex flex-col">

                <h2 className="text-3xl font-bold uppercase tracking-widest text-zinc-900 font-anton-sc">
                    Add your Address
                </h2>

                {/* DIVIDER */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-zinc-100" />
                </div>


                <div className="flex flex-col gap-4">

                    <div className='flex md:flex-row flex-col justify-between gap-4'>
                        <InputField
                            label="Street"
                            required
                            id="street"
                            type="text"
                            register={register}
                            message={"*Street is required"}
                            placeholder="R. Marcelino Pires"
                            errors={errors}
                        />

                        <InputField
                            label="Number"
                            required
                            id="number"
                            type="text"
                            register={register}
                            message={"*Number is required"}
                            placeholder="1111"
                            errors={errors}
                        />
                    </div>


                    <InputField
                        label="Country"
                        required
                        id="country"
                        type="text"
                        register={register}
                        message={"*Country is required"}
                        placeholder="Brazil"
                        errors={errors}
                    />

                    <InputField
                        label="City"
                        required
                        id="city"
                        type="text"
                        register={register}
                        message={"*City is required"}
                        placeholder="Dourados"
                        errors={errors}
                    />

                    <InputField
                        label="State"
                        required
                        id="state"
                        type="text"
                        register={register}
                        message={"*State is required"}
                        placeholder="Mato Grosso do Sul"
                        errors={errors}
                    />

                    <InputField
                        label="Pincode / CEP"
                        required
                        id="pincode"
                        type="text"
                        register={register}
                        message={"*Pincode/CEP is required"}
                        placeholder="12345-123"
                        errors={errors}
                    />

                    <InputField
                        label="Complement"
                        id="buildingName"
                        type="text"
                        register={register}
                        placeholder="Apartment, suite, block..."
                        errors={errors}
                    />

                </div>

                {/* Submit */}
                <button
                    disabled={btnLoader}
                    type='submit'
                    className="w-full mt-6 py-3.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl cursor-pointer hover:bg-gray-800 hover:shadow-sm"
                >
                    {btnLoader ? (
                        < Spinners />
                    ) : (
                        <>Add New Address</>
                    )}

                </button>

            </form>
        </div>
    )
}

export default AddAddressForm