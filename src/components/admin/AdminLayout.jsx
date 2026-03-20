import React, { useState } from 'react'
import Sidebar from '../shared/Sidebar'
import { Description, Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import { DialogTitle } from '@mui/material';
import { FiX } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';
import { AiFillControl } from 'react-icons/ai';

const AdminLayout = ( ) => {

    let [sidebarOpen, setSideBarOpen] = useState(false);

    return (
        <div>

            <Dialog open={sidebarOpen} onClose={() => setSideBarOpen(false)} className="xl:hidden relative z-50 ">
                <DialogBackdrop transition className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0" />
                <div className="fixed inset-0 flex">
                    <DialogPanel transition
                        className="relative flex w-full max-w-xs flex-1 transform transition duration-400 ease-in-out data-closed:-translate-x-full">
                        <Sidebar setSidebarOpen={setSideBarOpen}/>
                    </DialogPanel>
                </div>
            </Dialog>

            <div className='hidden xl:fixed xl:top-16 xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col'>
                <Sidebar />
            </div>

            <div className='xl:pl-72'>
                <button
                type='button'
                onClick={() => setSideBarOpen(true)}
                className='m-2.5 text-white bg-black xl:hidden p-4 rounded-full cursor-pointer transition duration-200 hover:scale-102'>
                    <span className='sr-only'> Open Sidebar </span>
                    <AiFillControl size={20} />
                </button>

                <main className=''>
                    <div className='p-4 sm:p-6 xl:p-8'>
                        <Outlet />
                    </div>
                    
                </main>
            </div>
        </div>
    )
}

export default AdminLayout