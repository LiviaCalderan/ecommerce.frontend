import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiGlobe, FiShoppingBag, FiBox, FiHome, FiInfo, FiPackage, FiMail, FiX, FiMenu, FiLogIn, FiLogOut } from "react-icons/fi";
import { Badge } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import UserMenu from '../shared/UserMenu';
import { logOutUser } from '../../store/actions';

const Navbar = () => {
    const path = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { cart } = useSelector((state) => state.carts);

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logOutUser(navigate));
    };


    useEffect(() => {
        setNavbarOpen(false);
    }, [path]);


    const navLinks = [
        { to: "/", label: "Home", icon: <FiHome size={18} />, activePath: "/" },
        { to: "/about", label: "About", icon: <FiInfo size={18} />, activePath: "/about" },
        { to: "/products", label: "Products", icon: <FiPackage size={18} />, activePath: "/products" },
        { to: "/contact", label: "Contact Us", icon: <FiMail size={18} />, activePath: "/contact" },
    ];

    return (
        <div>
            {/* DESKTOP NAVBAR  */}
            <div className='hidden md:flex items-center justify-between lg:px-40 px-8 h-15 z-50'>
                <Link to={"/"} className='flex justify-center items-center gap-2'>
                    <FiGlobe size={22} />
                    <span className='text-2xl font-anton-sc'>ORB1S.</span>
                </Link>

                <div className='font-raleway text-[15px] font-semibold'>
                    <ul className='flex items-center gap-4'>
                        {navLinks.map(({ to, label, activePath }) => (
                            <li key={label}>
                                <Link to={to} className={`${path === activePath ? "text-black font-bold" : "text-slate-600 hover:text-black"}`}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <ul>
                    <li className='flex items-center justify-center gap-3'>
                        <Link to={"/cart"} className='pr-2'>
                            <Badge badgeContent={cart?.length || 0} color="primary" max={99} showZero>
                                <FiShoppingBag size={20} className='transition-transform duration-100 transform hover:scale-105' />
                            </Badge>
                        </Link>
                        {user && user.id ? (
                            <div className='flex'>
                                {/* <Link to={'/account'} className='flex items-center gap-2 font-raleway text-[15px] font-semibold justify-center pr-2'>
                                    <FiUser size={20} className='transition-transform duration-100 transform hover:scale-105' />
                                </Link>
                                <Link
                                    to={'/login'}
                                    onClick={() => setNavbarOpen(false)}
                                    className='flex items-center gap-3 px-4 py-3 rounded-xl font-raleway text-[15px] font-semibold text-slate-600 hover:bg-gray-100 hover:text-black transition-all duration-150'
                                >
                                    <FiLogOut size={18} />
                                    Sign Out
                                </Link> */}
                                <UserMenu />
                            </div>

                        ) : (
                            <Link
                                to={'/login'}
                                onClick={() => setNavbarOpen(false)}
                                className='flex items-center justify-center gap-2 w-full px-4 py-2 bg-black text-white font-raleway text-[15px] font-semibold rounded-xl shadow-md hover:bg-gray-800 transition-colors duration-200'
                            >
                                <FiLogIn size={18} />
                                Sign In
                            </Link>

                        )}
                    </li>
                </ul>
            </div>

            {/*  MOBILE NAVBAR  */}
            <div className='md:hidden flex items-center justify-between px-[32px] h-[60px] z-50 relative'>

                <button
                    onClick={() => setNavbarOpen(true)}
                    className='flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200'
                >
                    <FiMenu size={24} />
                </button>


                <Link to={"/"} className='absolute left-1/2 -translate-x-1/2 flex justify-center items-center gap-2'>
                    <FiGlobe size={20} />
                    <span className='text-xl font-anton-sc'>ORB1S.</span>
                </Link>


                <Link to={"/cart"} className='pr-2'>
                    <Badge badgeContent={cart?.length || 0} color="primary" max={99} showZero>
                        <FiShoppingBag size={20} className='transition-transform duration-100 transform hover:scale-105' />
                    </Badge>
                </Link>
            </div>


            <div
                onClick={() => setNavbarOpen(false)}
                className={`md:hidden fixed inset-0 bg-black z-40 transition-opacity duration-300 ${navbarOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />

            {/* FLY MENU */}
            <div className={`md:hidden fixed top-0 left-0 h-full w-[75%] max-w-[300px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${navbarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                <div className='flex items-center justify-between px-5 h-[64px] border-b border-gray-100'>
                    <Link to={"/"} onClick={() => setNavbarOpen(false)} className='flex items-center gap-2'>
                        <FiGlobe size={20} />
                        <span className='text-xl font-anton-sc'>ORB1S.</span>
                    </Link>
                    <button
                        onClick={() => setNavbarOpen(false)}
                        className='flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors duration-200'
                        aria-label="Fechar menu"
                    >
                        <FiX size={22} />
                    </button>
                </div>


                <nav className='flex flex-col px-4 pt-4 gap-1 flex-1'>
                    {navLinks.map(({ to, label, icon, activePath }) => (
                        <Link
                            key={label}
                            to={to}
                            onClick={() => setNavbarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-raleway text-[15px] font-semibold transition-all duration-150 ${path === activePath
                                ? 'bg-black text-white'
                                : 'text-slate-600 hover:bg-gray-100 hover:text-black'
                                }`}
                        >
                            {icon}
                            {label}
                        </Link>
                    ))}


                    <Link
                        to={"/order"}
                        onClick={() => setNavbarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-raleway text-[15px] font-semibold transition-all duration-150 ${path === "/order"
                            ? 'bg-black text-white'
                            : 'text-slate-600 hover:bg-gray-100 hover:text-black'
                            }`}
                    >
                        <div className='relative'>
                            <FiBox size={18} />
                        </div>
                        Orders
                    </Link>
                </nav>


                <div className='px-4 pb-6 pt-2 border-t border-gray-100'>
                    {user && user.id ? (
                        <Link
                            onClick={logoutHandler}
                            className='flex items-center gap-3 px-4 py-3 rounded-xl font-raleway text-[15px] font-semibold text-slate-600 hover:bg-gray-100 hover:text-black transition-all duration-150'
                        >
                            <FiLogOut size={18} />
                            Sign Out
                        </Link>
                    ) : (
                        <Link
                            to={'/login'}
                            onClick={() => setNavbarOpen(false)}
                            className='flex items-center justify-center gap-2 w-full px-4 py-3 bg-black text-white font-raleway text-[15px] font-semibold rounded-xl shadow-md hover:bg-gray-800 transition-colors duration-200'
                        >
                            <FiLogIn size={18} />
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;