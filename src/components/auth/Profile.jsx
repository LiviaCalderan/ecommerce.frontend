import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaMap } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import AddressList from '../checkout/steps/address/AddressList';
import AddressInfoModel from '../checkout/steps/address/AddressInfoModel';
import AddAddressForm from '../checkout/steps/address/AddAddressForm';
import { DeleteModel } from '../shared/DeleteModel';
import { deleteUserAddress, getUserAddresses } from '@/store/actions';
import toast from 'react-hot-toast';

const Profile = () => {

  const dispatch = useDispatch();
  const { user, address } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const noAddressExist = !address || address.length === 0;
  const [openAddressModel, setOpenAddressModel] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const { isLoading, errorMessage, btnLoader } = useSelector(
    (state) => state.errors
  )

  const addNewAddressHandler = () => {
    setSelectedAddress("");
    setOpenAddressModel(true);
  }

  const deleteAddressHandler = () => {
    dispatch(deleteUserAddress(
      toast,
      selectedAddress?.addressId,
      setOpenDeleteModel
    ))
  }

  const [activeTab, setActiveTab] = useState('enderecos');

  const tabs = [
    { id: 'enderecos', label: 'Endereços' }
  ];

  const orders = [
    { id: '#00412', date: '18 Mar 2026', status: 'Entregue', total: 'R$ 349,90', items: 2 },
    { id: '#00398', date: '02 Mar 2026', status: 'Em trânsito', total: 'R$ 189,00', items: 1 },
    { id: '#00371', date: '11 Fev 2026', status: 'Entregue', total: 'R$ 512,50', items: 3 },
  ];

  const statusStyle = (status) => {
    if (status === 'Entregue') return 'bg-black text-white';
    if (status === 'Em trânsito') return 'bg-white text-black border border-black';
    return 'bg-gray-100 text-gray-500 border border-gray-200';
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">

      <div className="px-6 lg:px-20 py-12 max-w-5xl mx-auto">

        {/* HERO HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 pb-10 border-b border-black">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full border-2 border-black bg-black flex items-center justify-center text-white text-xl font-bold tracking-tight select-none">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight leading-none mb-1">
                {user?.username}
              </h1>
              <p className="text-sm text-black/40 tracking-wide">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-center sm:text-right">
            <div className="w-px h-8 bg-black/10" />
            <div>
              <p className="text-2xl font-bold">{address?.length}</p>
              <p className="text-xs text-black/40 uppercase tracking-widest">Endereços</p>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-0 mb-10 border-b border-black/10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-xs uppercase tracking-[0.15em] font-semibold transition-all duration-200 border-b-2 -mb-px ${activeTab === tab.id
                ? 'border-black text-black'
                : 'border-transparent text-black/30 hover:text-black/60'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB: ENDEREÇOS */}
        {activeTab === 'enderecos' && (
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

            <DeleteModel open={openDeleteModel} loader={btnLoader} setOpen={setOpenDeleteModel} title="Delete Address" onDeleteHandler={deleteAddressHandler} />
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;