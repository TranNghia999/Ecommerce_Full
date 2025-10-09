import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Search from '../Search'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoGitCompare } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import Navigation from './Navigation'
import { MyContext } from '../../App';
import  Button  from '@mui/material/Button';
import { FaRegUser } from "react-icons/fa";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosLogOut } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { fetchDataFromApi } from '../../utils/api';
import { BsPinMap } from "react-icons/bs";


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: '0 4px',
    },
  }));

const Header = () => {

    const context = useContext(MyContext)
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout=()=> {
    setAnchorEl(null);
    
    fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('accessToken')}`, { 
        withCredentials: true }).then((res) => {
           if (res?.error === false) {
                context.setIsLogin(false);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                history("/")
            }
        })
    }

  return (
    <header className='bg-white fixed lg:sticky left-0 w-full top-0 lg:-top-[47px] z-[101]'>
        <div className="top-strip hidden lg:block py-0 border-t-[1px] border-gray-200  border-b-[1px]">
                <div className="container">
                    <div className="flex items-center justify-between">
                            <div className="col1- w-[50%]">
                                <p className='text-[12px] font-[500]'>Ưu đãi lên đến 50% cho sản phẩm mùa mới – Số lượng có hạn! </p>
                            </div>

                            <div className='col2 flex items-center justify-end'>
                                <ul className='flex items-center gap-3'>
                                    <li className='list-none '>
                                    <Link to='/help-center' className='text-[12px] link font-[500] transition'>Trung tâm Hỗ trợ </Link>
                                    </li>

                                    <li className='list-none '>
                                    <Link to='/order-tracking' className='text-[12px] link font-[500] transition'>Theo dõi đơn hàng</Link>
                                    </li>
                                </ul>
                            </div>
                    </div>
                </div>
       
        </div>

        <div className=' header py-2 lg:py-4 border-b-[1px] border-gray-200'>
             <div className="container flex items-center justify-between">
                    <div className='col1 w-[40%] lg:w-[25%]'> 
                        <Link to='/'>
                            <img src="../logo.jpg" className='max-w-[140px] lg:max-w-[200px]'/>
                        </Link>
                    </div>
                    <div className='col2 fixed top-0 left-0 w-full h-full lg:w-[40%] lg:static p-2 lg:p-0 bg-white z-50 !block '> 
                            <Search />
                    </div>
                    <div className='col3 w-[10%] lg:w-[30%] flex items-center pl-7'> 

                   
                            <ul className='flex items-center justify-end gap-0 lg:gap-3 w-full'>
                            {
                            context.isLogin === false ? (

                            <li className='list-none'>
                                    <Link to='/login'   className='link transition text-[15px] font-[500]'>Đăng nhập</Link> | &nbsp;
                                    <Link to='/register' className='link transition text-[15px] font-[500]'>Đăng ký</Link>
                                </li>
                            ) : (
                                <>
                                <Button className='myAccountWrap flex items-center gap-3 cursor-pointer !text-[#000]'
                                        onClick={handleClick}>
                                    <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1] '>
                                        <FaRegUser className='text-[16px] text-[rgba(0,0,0,0.7)]'/>
                                    </Button>
                                    <div className='info flex flex-col '>
                                        <h4 className='leading-3 text-[14px] text-[rgba(0,0,0,0.6)] font-[500] mb-0 capitalize text-left justify-start'> {context?.userData?.name} </h4>
                                        <span className='text-[13px] text-[rgba(0,0,0,0.6)]  font-[400] capitalize text-left justify-start '> {context?.userData?.email} </span>
                                    </div>
                                </Button>

                                {/* menu */}
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
                                 <Link to='/my-account' className='w-full block'> 
                                    <MenuItem onClick={handleClose} className='flex gap-2 !py-2'>
                                        <FaRegUser className='text-[18px]' /> <span className='text-[14px]'>Tài Khoản</span>
                                    </MenuItem>
                                </Link>  

                                  <Link to='/address' className='w-full block'> 
                                    <MenuItem onClick={handleClose} className='flex gap-2 !py-2'>
                                        <BsPinMap className='text-[18px]' /> <span className='text-[14px]'>Địa Chỉ</span>
                                    </MenuItem>
                                </Link> 

                                <Link to='/my-orders' className='w-full block'>
                                    <MenuItem onClick={handleClose} className='flex gap-2 !py-2'>
                                        <IoBagCheckOutline className='text-[18px]'/> <span className='text-[14px]'>Đơn Hàng</span>
                                    </MenuItem>
                                </Link>

                                <Link to='/my-list' className='w-full block'>
                                    <MenuItem onClick={handleClose} className='flex gap-2 !py-2'>
                                        <FaRegHeart className='text-[18px]' /> <span className='text-[14px]'>Đã Thích!</span>
                                    </MenuItem>
                                </Link>

                                
                                    <MenuItem onClick={logout} 
                                            className='flex gap-2 !py-2'>
                                            <IoIosLogOut className='text-[18px]'/>
                                            <span className='text-[14px]'>Đăng Xuất</span>
                                    </MenuItem>
                               

                            </Menu>
                                </>
                            )}
                                

                                <li>
                                <Tooltip title="Compare">
                                    <IconButton aria-label="cart" >
                                        <StyledBadge badgeContent={4} color="secondary">
                                            <IoGitCompare />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                                </li>

                                <li>
                                <Tooltip title="Wishlist">
                                    <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={4} color="secondary">
                                            <FaRegHeart />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                                </li>

                                <li>
                                <Tooltip title="Cart">
                                    <IconButton aria-label="cart" onClick={()=>context.setOpenCartPanel(true)}>
                                        <StyledBadge badgeContent={4} color="secondary" >
                                            <AiOutlineShoppingCart />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                                </li>
                            </ul>
                    
                    
                    
                    </div>

             </div>

        </div>

        <Navigation />

    </header>
  )
}

export default Header
