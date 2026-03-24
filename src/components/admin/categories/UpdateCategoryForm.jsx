import ErrorPage from '@/components/shared/ErrorPage';
import InputField from '@/components/shared/InputField';
import Spinners from '@/components/shared/Spinners';
import { addNewCategoryFromDashboard, fetchCategories, updateCategoryFromDashboard } from '@/store/actions';
import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const UpdateCategoryForm = ({ setOpen, update = false, loader, setLoader, selectedItem, selectedId }) => {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        mode: "onTouched"
    });

    const dispatch = useDispatch();
    const { errorMessage } = useSelector((state) => state.errors);

    useEffect(() => {
        if (update && selectedItem) {
            setValue("categoryName", selectedItem.categoryName);
        }
    }, [update, selectedItem, setValue]);

    if (errorMessage) return <ErrorPage message={errorMessage}/>

    const saveCategoryHandler = (data) => {
        if (!update) {
            dispatch(addNewCategoryFromDashboard(data, reset, toast, setLoader, setOpen));
        } else {
            dispatch(updateCategoryFromDashboard(selectedId, data, reset, toast, setLoader, setOpen))
        }

    }

    return (
        <div className='py-5 relative h-full'>
            <form onSubmit={handleSubmit(saveCategoryHandler)} className='space-y-4'>

                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <InputField
                        id="categoryName"
                        required
                        label="Category Name"
                        type="text"
                        message="This field is required"
                        register={register}
                        errors={errors}
                        placeholder="keyboard"
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

export default UpdateCategoryForm