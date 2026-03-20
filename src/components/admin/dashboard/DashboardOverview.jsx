import React from 'react'
import { formatRevenue } from '../../../utils/format';

const DashboardOverview = ({ title, amount, Icon, revenue = false }) => {

    const convertAmount = revenue ? Number(amount).toFixed(2) : amount;

    return (
        <div>
            <div className='xl:w-80 w-full spac-y-4 text-center font-raleway md:text-start px-5 py-8'>
                <div className='flex md:justify-start justify-center items-center gap-3'>
                    <h3 className='uppercase text-xl text-black font-semibold'>{title}</h3>
                    <Icon className="text-black text-2xl"/>
                </div>

                <h1 className='font-anton-sc text-black text-2xl'>
                    {revenue ? "R$ " : null}
                    {revenue ? formatRevenue(convertAmount) : convertAmount}
                </h1>
            </div>
        </div>

    )
}

export default DashboardOverview