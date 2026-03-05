import { Icon } from '@mui/material';
import React from 'react'

const Status = ({text, icon:Icon, bg, color, className='' }) => {
  return (
    <div className={`${bg} ${color} px-2 py-2 font-medium rounded-lg flex items-center gap-1 text-sm absolute top-2 right-2`}>
        {text} <Icon size={15} />
    </div>
  )
};

export default Status