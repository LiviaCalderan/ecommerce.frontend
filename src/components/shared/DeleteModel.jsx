import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { RxCross2 } from "react-icons/rx";
import BackDrop from './BackDrop';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

export function DeleteModel({ open, setOpen, title = "", onDeleteHandler, loader }) {

    return (
            <div>
                <Dialog open={open} className="relative z-50 focus:outline-none" onClose={() => setOpen(false)}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel
                                transition
                                className="relative w-full max-w-md mx-auto rounded-2xl bg-white p-4 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-md overflow-hidden"
                            >
                                <div className='flex justify-end gap-4 absolute right-3 top-3'>
                                    <button onClick={() => setOpen(false)} type='button' className='cursor-pointer hover:transform-[scale(110%)] duration-200'>
                                        <FaTimes className='text-shadow-black' size={25} />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <FaExclamationTriangle className=" text-red-800" />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle
                                            as="h3"
                                            className="font-anton-sc tracking-wider"
                                        >
                                            {title}
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm font-raleway font-medium text-black">
                                                Are you sure you want to delete?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        disabled={loader}
                                        type="button"
                                        onClick={(onDeleteHandler)}
                                        className="inline-flex w-full bg-customRed justify-center rounded-lg bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    >
                                        {loader ? "Loading..." : "Delete"}
                                    </button>
                                    <button
                                        disabled={loader}
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="mt-3 inline-flex w-full justify-center rounded-lg bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-800 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
                {open && <BackDrop />}
            </div>
        )
}