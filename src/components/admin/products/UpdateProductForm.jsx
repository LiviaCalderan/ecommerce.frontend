import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Spinners from '../../shared/Spinners';
import { useForm } from 'react-hook-form';
import InputField from '../../shared/InputField'
import toast from 'react-hot-toast';
import { addNewProductFromDashboard, fetchCategories, updateProductInfoFromDashboard } from '../../../store/actions';
import SelectTextField from '../../shared/SelectTextField';
import Skeleton from '@mui/material/Skeleton';
import ErrorPage from '../../shared/ErrorPage'

const UpdateProductForm = ({ setOpen, update = false, loader, setLoader, selectedId, selectedItem }) => {

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
        mode: "onTouched"
    });

    const [selectedCategory, setSelectedCategory] = useState();
    const { categories } = useSelector((state) => state.products);
    const { categoryLoader, errorMessage } = useSelector((state) => state.errors);
    const dispatch = useDispatch();

    useEffect(() => {
        if (update && selectedItem) {
            setValue("productName", selectedItem.productName);
            setValue("description", selectedItem.description);
            setValue("price", selectedItem.price);
            setValue("discount", selectedItem.discount);
            setValue("stock", selectedItem.stock);
        }
    }, [update, selectedItem, setValue]);

    useEffect(() => {
        if (!update && (!categories || categories.length === 0)) {
            dispatch(fetchCategories());
        }
    }, [dispatch, update, categories?.length]);

    useEffect(() => {
        if (!categoryLoader && categories?.length) {
            setSelectedCategory(categories[0]);
        }
    }, [categories, categoryLoader]);

    const hasCategories = Array.isArray(categories) && categories.length > 0;
    if (categoryLoader && !hasCategories) return (
        <div className='pt-3'>
            <Skeleton variant='rounded' width="100%" height={550} animation="wave" />
        </div>
    );

    if (errorMessage) return <ErrorPage message={errorMessage}/>

    const saveProductHandler = (data) => {
        const sendData = {
            ...data,
            categoryId: selectedCategory.categoryId
        }
        if (!update) {
            dispatch(addNewProductFromDashboard(sendData, reset, toast, setLoader, setOpen));
        } else {
            dispatch(updateProductInfoFromDashboard(selectedId, data, reset, toast, setLoader, setOpen))
        }

    }
    watch
    const price = watch("price");
    const discount = watch("discount");
    const finalPrice = price && discount
        ? (price * (1 - discount / 100)).toFixed(2)
        : price || "0.00";


    return (
        <div className='py-5 relative h-full'>
            <form onSubmit={handleSubmit(saveProductHandler)} className='space-y-4'>
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <InputField
                        id="productName"
                        required
                        label="Product Name"
                        type="text"
                        message="This field is required"
                        register={register}
                        errors={errors}
                        placeholder="Yellow Notebook"
                    />
                </div>

                {!update && (
                    <SelectTextField label="Category" selectedObject={selectedCategory} setSelectValue={setSelectedCategory} lists={categories} />
                )}
                <div className='flex flex-col gap-1.5 w-full'>
                    <label
                        htmlFor="description"
                        className="text-[10px] uppercase tracking-widest font-semibold text-zinc-400"
                    >
                        Description
                    </label>
                    <div
                        className={`flex items-center border rounded-xl px-4 py-3 bg-zinc-50 focus-within:bg-white transition-colors ${errors.description?.message ? "border-red-500" : "border-zinc-200"}`}
                    >
                        <textarea
                            rows={5}
                            id="description"
                            placeholder="Add product description..."
                            maxLength={255}
                            className="bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 outline-none w-full h-full resize-none"
                            {...register("description", {
                                required: { value: true, message: "Description is required." },
                            })}
                        />
                    </div>
                    {errors.description?.message && (
                        <p className='text-[12px] font-semibold text-red-600 mt-0'>
                            {errors.description?.message}
                        </p>
                    )}
                </div>

                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <InputField
                        id="price"
                        required
                        label="Price"
                        type="number"
                        message="This field is required"
                        register={register}
                        errors={errors}
                        placeholder="R$ 10.00"
                    />
                    <InputField
                        id="discount"
                        required
                        label="Discount"
                        type="number"
                        message="This field is required"
                        register={register}
                        errors={errors}
                        placeholder="5 (%)"
                    />
                </div>

                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <span className='font-bold uppercase font-sans text-sm text-center text-black/40'>
                        This product will cost: R$ {finalPrice}
                    </span>
                </div>

                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <InputField
                        id="stock"
                        required
                        label="Stock"
                        type="number"
                        message="This field is required"
                        register={register}
                        errors={errors}
                        placeholder="100 units"
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

export default UpdateProductForm
