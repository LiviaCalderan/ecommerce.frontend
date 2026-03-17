import { FaCheckCircle, FaEdit, FaMapPin, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { MdLocationCity } from "react-icons/md";
import { FaMapLocation } from "react-icons/fa6";
import { GrStreetView } from "react-icons/gr";
import { selectCheckoutAddress } from '../../../../store/actions';

const AddressList = ({ addresses, setSelectedAddress, setOpenAddressModel, setOpenDeleteModel }) => {

    const dispatch = useDispatch();
    const selectedCheckoutAddress = useSelector(
        (state) => state.auth.selectedUserCheckoutAddress
    );

    const handleAddressSelection = (addresses) => {
        dispatch(selectCheckoutAddress(addresses));
    };

    const onEditButtonHandler = (addresses) => {
        setSelectedAddress(addresses);
        setOpenAddressModel(true);
    };

    const onDeleteButtonHandler = (addresses) => {
        setSelectedAddress(addresses);
        setOpenDeleteModel(true);

    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">

            <div className="w-full max-w-3xl mb-8 flex flex-col items-start gap-1">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500">
                    Checkout
                </span>
                <h1 className="text-4xl font-black font-anton-sc tracking-wider text-black leading-none">
                    Delivery Address
                </h1>
                <div className="mt-2 h-1 w-20 bg-black rounded-full" />
            </div>

            {/* Address Cards */}
            <div className="w-full max-w-3xl flex flex-col gap-4">
                {addresses.map((address, index) => {
                    const isSelected = selectedCheckoutAddress?.addressId === address.addressId;
                    return (
                        <div
                            key={address.addressId}
                            onClick={() => handleAddressSelection(address)}
                            className={`relative group w-full rounded-2xl border-2 cursor-pointer transition-all duration-300 overflow-hidden
                             bg-white text-black hover:md 
                                ${isSelected ? "border-black border-3 shadow-lg" : "border-gray-200 hover:border-black"}`}
                        >

                            <div className="p-8">
                                {/* Card Header Row */}
                                <div className="flex items-start justify-between gap-3 mb-4 ">
                                    <div className="flex items-center gap-2">
                                        <span className={`md:text-xs text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full
                                            ${isSelected ? "bg-black text-white" : "bg-gray-100 text-gray-500"}`}>
                                            {isSelected ? "✓ Selected" : `Address ${index + 1}`}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            className={`p-2 rounded-xl transition-all duration-200 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black cursor-pointer`}
                                            title="Edit address"
                                            onClick={() => onEditButtonHandler(address)}
                                        >
                                            <FaEdit size={14} />
                                        </button>
                                        <button
                                            className={`p-2 rounded-xl transition-all duration-200 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 cursor-pointer `}
                                            title="Delete address"
                                            onClick={() => onDeleteButtonHandler(address)}
                                        >
                                            <FaTrashAlt size={13} />
                                        </button>
                                    </div>
                                </div>


                                <div className="flex flex-col gap-3">

                                    {/* Street */}
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-100">
                                        <div className={`mt-0.5 flex-shrink-0 ${isSelected ? "text-black" : "text-gray-500"}`}>
                                            <GrStreetView size={16} />
                                        </div>
                                        <div>
                                            <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 text-gray-500`}>Street</p>
                                            <p className="text-sm font-semibold leading-tight">
                                                {address.street}, {address.number}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Building */}
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-100">
                                        <div className={`mt-0.5 shrink-0 ${isSelected ? "text-black" : "text-gray-500"}`}>
                                            <FaMapLocation size={16} />
                                        </div>
                                        <div>
                                            <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 text-gray-500`}>Building</p>
                                            <p className="text-sm font-semibold leading-tight">
                                                {address.buildingName ? address.buildingName : <span className={`italic text-gray-300`}>—</span>}
                                            </p>
                                        </div>
                                    </div>

                                    {/* City */}
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-100">
                                        <div className={`mt-0.5 flex-shrink-0 ${isSelected ? "text-black" : "text-gray-500"}`}>
                                            <MdLocationCity size={16} />
                                        </div>
                                        <div>
                                            <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 text-gray-500`}>Location</p>
                                            <p className="text-sm font-semibold leading-tight">
                                                {address.country} · {address.city}/{address.state}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Pincode */}
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-100">
                                        <div className={`mt-0.5 flex-shrink-0 ${isSelected ? "text-black" : "text-gray-500"}`}>
                                            <FaMapPin size={16} />
                                        </div>
                                        <div>
                                            <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 text-gray-500`}>CEP</p>
                                            <p className="text-sm font-semibold tracking-widest leading-tight">
                                                {address.pincode}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Selected check indicator */}
                                {isSelected && (
                                    <div className="mt-4 flex items-center gap-2 text-black">
                                        <FaCheckCircle size={14} />
                                        <span className="text-xs font-bold tracking-wider uppercase">Delivering to this address</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AddressList
