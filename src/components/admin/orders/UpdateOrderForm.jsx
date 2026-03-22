import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import React, { useState } from 'react'
import Spinners from '../../shared/Spinners'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { updateOrderStatusFromDashboard } from '../../../store/actions'

export const ORDER_STATUS = [
  'PENDING',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'CONFIRMED',
];

const UpdateOrderForm = ({ setOpen, open, loader, setLoader, selectedId, selectedItem }) => {

  const [orderStatus, setOrderStatus] = useState(selectedItem?.status || 'CONFIRMED')
  const [error, setError] = useState("")
  const dispatch = useDispatch();

  const updateOrderStatus = (e) => {
    e.preventDefault();
    if (!orderStatus) {
      setError("Order status is required");
      return
    }
    dispatch(updateOrderStatusFromDashboard(selectedId, orderStatus, toast, setLoader));
  }

  return (
    <div className='py-10 relative h-full'>
      <form onSubmit={updateOrderStatus} className='space-y-4'>
        <FormControl fullWidth variant='outlined' error={!!error}>
          <InputLabel id="order-status-label">Order Status</InputLabel>
          <Select
            labelId='order-status-label'
            label='Order Status'
            value={orderStatus}
            onChange={(e) => {
              setOrderStatus(e.target.value),
                setError("")
            }}>
            {ORDER_STATUS.map((status) => (
              <MenuItem
                key={status}
                value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>

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

export default UpdateOrderForm