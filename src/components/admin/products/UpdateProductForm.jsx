import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Spinners from '../../shared/Spinners';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

const UpdateProductForm = ({ setOpen, open, loader, setLoader, selectedId, selectedItem }) => {

    const [productInfo, setProductInfo] = useState(selectedItem);
    const [error, setError] = useState("")
    const dispatch = useDispatch();

    const updateProductInfo = (e) => {
        e.preventDefault();
    }

    const finalPrice = productInfo.price && productInfo.discount
        ? (productInfo.price * (1 - productInfo.discount / 100)).toFixed(2)
        : productInfo.price || "0.00";


    return (
        <div className='py-10 relative h-full'>
            <form onSubmit={updateProductInfo} className='space-y-4'>
                <FormControl fullWidth variant='outlined' error={!!error} className='flex flex-col gap-5'>
                    <TextField
                        id="productName"
                        label="Product Name"
                        value={productInfo.productName}
                        variant="outlined" />

                    <TextField
                        id="description"
                        label="Description"
                        multiline
                        rows={4}
                        value={productInfo.description}
                    />

                    <div className='flex md:flex-row flex-col md:justify-between gap-5'>
                        <TextField
                            fullWidth
                            label="Price"
                            id="price"
                            value={productInfo.price}
                            onChange={(e) => setProductInfo({ ...productInfo, price: Number(e.target.value) })}
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                },
                            }}
                        />

                        <TextField
                            label="Discount"
                            id="discount"
                            value={productInfo.discount}
                            onChange={(e) => setProductInfo({ ...productInfo, discount: Number(e.target.value) })}
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                },
                            }}
                        />
                    </div>
                    <span className='font-bold uppercase font-sans text-sm text-center text-black/40'>This product will cost: R$ {finalPrice}</span>


                    <TextField
                        label="Stock"
                        id="stock"
                        value={productInfo.stock}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="start">Units</InputAdornment>,
                            },
                        }}
                    />


                    {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>

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
                        ) : ("Update")}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProductForm