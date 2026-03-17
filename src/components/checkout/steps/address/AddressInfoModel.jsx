import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'
import BackDrop from '../../../shared/BackDrop'
import { FaTimes } from 'react-icons/fa'

const AddressInfoModel = ({ open, setOpen, children }) => {
  return (
    <div>
      <Dialog open={open} className="relative z-50 focus:outline-none" onClose={() => setOpen(false)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="relative w-full max-w-md mx-auto rounded-2xl bg-white p-4 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-md overflow-hidden"
            >
              <div>
                {children}
              </div>
              <div className='flex justify-end gap-4 absolute right-3 top-3'>
                <button onClick={() => setOpen(false)} type='button' className='cursor-pointer hover:transform-[scale(110%)] duration-200'>
                  <FaTimes className='text-shadow-black' size={25} />
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

export default AddressInfoModel