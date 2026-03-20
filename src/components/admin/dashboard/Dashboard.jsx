import React, { useEffect } from 'react'
import DashboardOverview from './DashboardOverview'
import { FaBoxOpen, FaShoppingCart } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useSelect } from '@material-tailwind/react';
import { analyticsAction } from '../../../store/actions';
import Loader from '../../shared/Loader'
import ErrorPage from '../../shared/ErrorPage'

const Dashboard = () => {

  const dispatch = useDispatch();

  const { isLoading, errorMessage } = useSelector(
    (state) => state.errors
  );

  const { analytics: { productCount, totalRevenue, totalOrders } } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(analyticsAction());
  }, [dispatch])

  if (isLoading) {
    return <Loader />
  }

  if(errorMessage){
    return <ErrorPage message={errorMessage}/>
  }

  return (
    <div>
      <div className='flex md:flex-row mt-8 flex-col lg:justify-between border-2 border-gray-300 bg-gray-200 rounded-xl shadow-lg '>
        <DashboardOverview
          title={"Total Products"}
          amount={productCount}
          Icon={FaBoxOpen} />
        <DashboardOverview
          title={"Total Orders"}
          amount={totalOrders}
          Icon={FaShoppingCart} />
        <DashboardOverview
          title={"Total Revenue"}
          amount={totalRevenue}
          Icon={FaMoneyCheckDollar}
          revenue />
      </div>
    </div>
  )
}

export default Dashboard