import Skeleton from '@mui/material/Skeleton';
import React, { useState } from 'react'
import { FaMap } from "react-icons/fa";
import AddAddressForm from './AddAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import AddressInfoModel from './AddressInfoModel';
import AddressList from './AddressList';
import DeleteModel from './DeleteModel';
import toast from 'react-hot-toast';
import { deleteUserAddress } from '../../../../store/actions';

const AddressInfo = ({ address }) => {

    const noAddressExist = !address || address.length === 0;
    const { isLoading, btnLoader } = useSelector(
        (state) => state.errors
    );

    const [openAddressModel, setOpenAddressModel] = useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");

    const addNewAddressHandler = () => {
        setSelectedAddress("");
        setOpenAddressModel(true);
    }

    const dispatch = useDispatch();
    const deleteAddressHandler = () => {
        dispatch(deleteUserAddress(
            toast,
            selectedAddress?.addressId,
            setOpenDeleteModel
        ))
    }

    return (
        <div className="font-raleway flex flex-col justify-between items-center">

            {noAddressExist ? (
                // TODO: TRANSFORMAR EM UM COMPONENTE REUTILIZÁVEL
                <div className='flex flex-col max-w-md mx-auto items-center justify-center gap-4'>
                    <FaMap size={150} className='text-gray-200' />
                    <h1 className='font-anton-sc text-3xl text-slate-800'>
                        No Address Added Yet
                    </h1>
                    <p className='font-semibold text-slate-600 text-center'>Please, add a address to complete purchase </p>

                    <button onClick={addNewAddressHandler} className='text-white font-semibold py-2 px-15 mt-3 rounded-lg items-center transition-colors duration-300 flex justify-center bg-black opacity-100 hover:bg-gray-800 cursor-pointer hover:shadow-sm'>
                        Add New Address
                    </button>
                </div>

            ) : (
                <div className='relative p-6 rounded-lg w-full max-w-3xl mx-auto'>
                    {isLoading ? (
                        <div className='flex flex-col gap-2 items-center'>
                            <Skeleton variant='rounded' width="100%" height={135} animation="wave" />
                            <Skeleton variant='rounded' width="100%" height={135} animation="wave" />
                            <Skeleton variant='rounded' width="100%" height={135} animation="wave" />

                        </div>
                    ) : (
                        <div className='relative'>

                            {address.length > 0 && (
                                <button onClick={addNewAddressHandler} className='md:absolute right-0 top-8 text-white md:text-md text-sm font-semibold py-2 px-15 mt-3 rounded-lg text-center transition-colors duration-300 flex justify-center bg-black opacity-100 hover:bg-gray-800 cursor-pointer hover:shadow-sm'>
                                    Add More
                                </button>
                            )}
                            <div className='space-y-4 pt-6'>
                                <AddressList
                                    addresses={address}
                                    setSelectedAddress={setSelectedAddress}
                                    setOpenAddressModel={setOpenAddressModel}
                                    setOpenDeleteModel={setOpenDeleteModel}
                                />
                            </div>


                        </div>
                    )}
                </div>
            )}

            <AddressInfoModel open={openAddressModel} setOpen={setOpenAddressModel}>
                <AddAddressForm address={selectedAddress} setOpenAddressModel={setOpenAddressModel} />
            </AddressInfoModel>

            <DeleteModel open={openDeleteModel} loader={btnLoader} setOpen={setOpenDeleteModel} title="Delete Address" onDeleteHandler={deleteAddressHandler}/>
        </div>
    )
}

export default AddressInfo
