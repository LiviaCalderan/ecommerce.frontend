import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { AiFillControl } from "react-icons/ai";
import { adminNavigation, sellerNavigation } from '../../utils';
import { AiFillDashboard } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa";
import { FaThList, FaStore } from "react-icons/fa";
import { FiX } from 'react-icons/fi';
import classNames from 'classnames';
import { Icon } from '@mui/material';

const Sidebar = ({ isProfileLayout = false, setSidebarOpen }) => {
    const pathName = useLocation().pathname;
    const { user } = useSelector((state) => state.auth)
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

    const navLinks = isAdmin ? adminNavigation : sellerNavigation;

    return (
        <div className={`fixed xl:top-16 top-0 left-0 h-full w-[75%] max-w-75 bg-white z-50 shadow-2xl flex grow flex-col transition-transform duration-300 ease-in-out`}>

            <div className='flex items-center justify-between px-5 h-16 border-b border-gray-100'>
                <Link to={"/admin"} className='flex items-center gap-2'>
                    <AiFillControl size={20} />
                    <h1 className='text-xl font-anton-sc'>
                        {isAdmin ? "Admin Panel" : "Seller Panel"}
                    </h1>
                </Link>
                <button
                    onClick={()=> setSidebarOpen(false)}
                    className='xl:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors duration-200'
                    aria-label="Fechar menu"
                >
                    <FiX size={22} />
                </button>
            </div>

            <nav className='flex flex-col px-4 pt-4 gap-1 flex-1'>
                {navLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            to={item.to}
                            className={classNames(
                                pathName === item.to
                                    ? "bg-black text-white"
                                    : "text-slate-600 hover:bg-gray-100 hover:text-black",
                                "flex items-center gap-3 px-4 py-3 rounded-xl font-raleway text-[15px] font-semibold transition-all duration-150"
                            )}
                        >
                            <Icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
            <div></div>
        </div>
    )
}

export default Sidebar