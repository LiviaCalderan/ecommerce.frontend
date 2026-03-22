import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { RxCross2 } from "react-icons/rx";

export function Model({ open, setOpen, children, title = "" }) {

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30 transition-opacity duration-500 ease-in-out data-closed:opacity-0" />

                <div className="fixed inset-0 overflow-hidden">

                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='pointer-eventis-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                            <DialogPanel transition className='pointer-eventis-auto relative w-screen max-w-200 transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700'>
                                <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-lg'>
                                    <div className='relative flex-1 p-8'>
                                        <div className='border-b pb-5 flex justify-between'>
                                            <h1 className='font-anton-sc tracking-wider text-2xl pt-2'>
                                                {title}
                                            </h1>
                                            <button onClick={() => setOpen(false)}>
                                                <RxCross2 className='text-black text-2xl cursor-pointer' />
                                            </button>
                                        </div>
                                        {children}
                                    </div>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>

                </div>
            </Dialog>
        </>
    )
}