import { Avatar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useState } from 'react'
import { FiLogOut, FiUser, FiBox } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BackDrop from './BackDrop';
import { logOutUser } from '../../store/actions';
import { AiFillControl } from 'react-icons/ai';
import { FaStore } from 'react-icons/fa';

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const { user } = useSelector((state) => state.auth);
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
    const isSeller = user && user?.roles?.includes("ROLE_SELLER");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = () => {
        dispatch(logOutUser(navigate));
    };

    return (
        <div className='font-raleway'>
            <div>
                <div onClick={handleClick}
                    className='transition-transform duration-100 transform hover:scale-105'>
                    <Avatar alt='Menu' src='' sx={{ width: 30, height: 30 }} />
                </div>
            </div>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link to={"/profile"} >
                    <MenuItem onClick={handleClose} className='flex gap-2 items-center'>
                        <FiUser className='text-xl' />
                        <span className='font-bold font-raleway text-[16px] m-1'>
                            {user?.username}
                        </span>
                    </MenuItem>
                </Link>
                <Link to={"/order"}>
                    <MenuItem onClick={handleClose} className='flex gap-2'>
                        <FiBox className='text-xl' />
                        <span className='font-semibold font-raleway text-[16px] m-1'>
                            Order
                        </span>
                    </MenuItem>
                </Link>
                
                {(isAdmin || isSeller) && (
                    <Link to={isAdmin ? "/admin" : "/admin/orders"}>
                        <MenuItem onClick={handleClose} className='flex gap-2'>
                            <AiFillControl className='text-xl' />
                            <span className='font-semibold font-raleway text-[16px] m-1'>
                                {isAdmin ? "Admin Panel" : "Seller Panel"}
                            </span>
                        </MenuItem>
                    </Link>
                )}


                <Divider />


                <MenuItem onClick={logoutHandler} className='flex gap-2'>
                    <FiLogOut className='text-lg' />
                    <span className='font-semibold font-raleway text-[16px] m-2'>
                        LogOut
                    </span>
                </MenuItem>

            </Menu>

            {/* BACKGROUND COLOR + OPACITY */}
            {open && <BackDrop />}
        </div>
    );
}


export default UserMenu