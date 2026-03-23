import React, { useRef, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import Spinners from '../../shared/Spinners';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateProductImageDashboard } from '../../../store/actions';

const ImageUploadForm = ({ setOpen, selectedId, seletedItem }) => {

    const dispatch = useDispatch();
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loader, setLoader] = useState(false);
    const formData = new FormData();
    const fileInputRef = useRef();
    const onHandleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            }
            reader.readAsDataURL(file);
            setSelectedFile(file);
        } else {
            toast.error("Please, select a valid image file (.jpg, .png, .jpeg")
            setPreviewImage(null);
            setSelectedFile(null);
        }

    }

    const addNewImageHandler = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            toast.error("Please selecte an image before saving.")
            return;
        }


        formData.append("image", selectedFile);

        dispatch(updateProductImageDashboard(formData, selectedId, toast, setLoader, setOpen))
    }

    const handleClearImage = () => {
        setPreviewImage(null);
        setSelectedFile(null);
        fileInputRef.current.value = null;
    }

    return (
        <div className='py-5 relative h-full'>
            <form className='space-y-4' onSubmit={addNewImageHandler}>
                <div className='flex flex-col gap-4 w-full'>
                    <label className='flex justify-center font-raleway font-semibold items-center gap-2 cursor-pointer text-white shadow-md transition duration-300 hover:scale-101 bg-black p-3 rounded-lg w-full hover:bg-gray-900'>
                        <FaCloudUploadAlt size={24} />
                        <span>Upload Product Image</span>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={onHandleImageChange}
                            className='hidden'
                            accept='.jpeg, .jpg, .png' />
                    </label>

                    {previewImage && (
                        <div className='mt-10 flex flex-col items-center'>
                            <img src={previewImage} alt="Image Previw"
                                className='h-60 rounded-lg mb-2' />

                            <button
                                type='button'
                                onClick={handleClearImage}
                                className='bg-red-800 mt-5 font-raleway font-semibold text-white px-10 py-2 rounded-md cursor-pointer hover:bg-red-900 shadow-md'>Clear Image</button>
                        </div>
                    )}
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
                        ) : ("Add Image")}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ImageUploadForm