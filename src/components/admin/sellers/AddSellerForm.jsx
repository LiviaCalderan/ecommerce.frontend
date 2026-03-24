import ErrorPage from '@/components/shared/ErrorPage';
import InputField from '@/components/shared/InputField';
import Spinners from '@/components/shared/Spinners';
import { addNewSeller } from '@/store/actions';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const AddSellerForm = ({ setOpen, loader, setLoader}) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onTouched"
    });

    const dispatch = useDispatch();
    const { errorMessage } = useSelector((state) => state.errors);

    if (errorMessage) return <ErrorPage message={errorMessage}/>

    const saveSellerHandler = (data) => {
        const sendData = {
            ...data,
            roles: ["seller"]
        }
        dispatch(addNewSeller(sendData, reset, toast, setLoader, setOpen));

    }

    return (
        <div className='py-5 relative h-full'>
            <form onSubmit={handleSubmit(saveSellerHandler)} className='space-y-4'>

                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <InputField
                        id="username"
                        required
                        label="Username"
                        type="text"
                        message="Username is required"
                        register={register}
                        errors={errors}
                        placeholder="usernameExample"
                    />
                </div>
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <InputField
                        id="email"
                        required
                        label="Email"
                        type="email"
                        message="Email is required"
                        register={register}
                        errors={errors}
                        placeholder="username@example.com"
                    />
                </div>
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <InputField
                        id="password"
                        required
                        label="Password"
                        type="password"
                        message="Password is required"
                        register={register}
                        errors={errors}
                        placeholder="password"
                    />
                </div>

                <div className='flex w-full justify-between items-center absolute bottom-14'>
                    <button
                        disabled={loader}
                        onClick={() => setOpen(false)}
                        type='button'
                        variant='outlined'
                        className='bg-black font-semibold font-raleway px-6 h-10 rounded-md text-white cursor-pointer hover:bg-gray-900 hover:shadow-md'>
                        Cancel
                    </button>

                    <button
                        type='submit'
                        className='bg-black font-semibold font-raleway px-6 h-10 rounded-md text-white cursor-pointer hover:bg-gray-900 hover:shadow-md'>
                        {loader ? (
                            <div className='flex gap-2 items-center'>
                                <Spinners />
                            </div>
                        ) : ("Save")}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddSellerForm