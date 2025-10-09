import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import ProductItem from '../../components/ProductItem';
import ProductItemListView from '../../components/ProductItemListView';
import Button from '@mui/material/Button';
import { IoGridSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import ProductLoaingGrid from './productLoadingGrid';
import ProductLoadingList from './productLoadingList';
import { postData } from '../../utils/api';




const ProductListing = () => {

    const [itemView, setItemView] = useState('grid');

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Của Kết Nối Admin => Server -> FE

    const [productsData, setProductsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Lọc Sắp Xếp
    const [selectedSortVal, setSelectedSortVal] = useState("Liên quan nhất");

    const handleSortBy = (name, order, products, value) => {
        setSelectedSortVal(value);
        postData('/api/product/sortBy', {
            products: products,
            sortBy: name,
            order: order
        }).then((res) => {
            setProductsData(res);
            setAnchorEl(null);
        })
    }

    return (
        <section className='pb-0'>

            {/* <div className='container'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to='/' className='link transition !text-[14px]'>  Trang Chủ </Link>
                    <Link underline="hover" color="inherit" to='/' className='link transition !text-[14px]'>   Fashion </Link>
                </Breadcrumbs>
            </div> */}

            <div className='bg-white p-2'>
                <div className='container flex gap-2'>

                    <div className='sidebarWrapper w-[20%] bg-white '>
                        <Sidebar
                            productsData={productsData}
                            setProductsData={setProductsData}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            page={page}
                            setTotalPages={setTotalPages}
                        />
                    </div>

                    <div className='rightContent w-[80%] py-3'>
                        <div className='bg-[#f1f1f1] p-2 w-full mb-4 rounded-md  flex items-center justify-between sticky top-[140px] z-[99]'>

                            <div className='col1 flex items-center itemViewActions'>
                                <Button className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]
                                     ${itemView === "list" && 'active'}`} onClick={() => setItemView('list')}>
                                    <IoMdMenu className='text-[rgba(0,0,0,0.7)]' />
                                </Button>
                                <Button className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]
                                     ${itemView === "grid" && 'active'}`} onClick={() => setItemView('grid')}>
                                    <IoGridSharp className='text-[rgba(0,0,0,0.7)]' />
                                </Button>

                                <span className='text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]'>
                                    Hiển thị  {productsData?.products?.length !== 0 ? productsData?.products?.length : 0} sản phẩm.
                                </span>
                            </div>

                            <div className='col2 ml-auto flex items-center justify-end gap-3 pr-4'>
                                <span className='text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]'>Sắp xếp theo</span>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    className='!bg-white !text-[12px] !text-[#000] !capitalize !border-2 !border-[#ffffff]'>
                                    {selectedSortVal}
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    slotProps={{
                                        list: { 'aria-labelledby': 'basic-button', },
                                    }}>
                                    <MenuItem className='!text-[13px] !text-[#000] !capitalize'
                                    onClick={() => handleSortBy('name', 'asc', productsData, 'Tên: A → Z')}>Tên: A → Z</MenuItem>

                                    <MenuItem className='!text-[13px] !text-[#000] !capitalize'
                                    onClick={() => handleSortBy('name', 'desc', productsData, 'Tên: Z → A')}>Tên: Z → A</MenuItem>

                                    <MenuItem className='!text-[13px] !text-[#000] !capitalize'
                                    onClick={() => handleSortBy('price', 'asc', productsData, 'Giá: Thấp → Cao')}>Giá: Thấp → Cao</MenuItem>

                                    <MenuItem className='!text-[13px] !text-[#000] !capitalize'
                                    onClick={() => handleSortBy('price', 'desc', productsData, 'Giá: Cao → Thấp')}>Giá: Cao → Thấp</MenuItem>
                                   
                                </Menu>
                            </div>

                        </div>

                        <div className={`grid ${itemView === 'grid' ? ' grid-cols-5 md:grid-cols-5' : ' grid-cols-1 md:grid-cols-1'} gap-4`}>
                            {
                                itemView === 'grid' ? (
                                    <>
                                        {
                                            isLoading === true ? <ProductLoaingGrid view={itemView} /> :
                                                productsData?.products?.length !== 0 && productsData?.products?.map
                                                    ((item, index) => {
                                                        return (
                                                            <ProductItem key={index} item={item} />
                                                        )
                                                    })

                                        }
                                    </>
                                ) : (
                                    <>

                                        {
                                            isLoading === true ? <ProductLoadingList view={itemView} /> :
                                                productsData?.products?.length !== 0 && productsData?.products?.map
                                                    ((item, index) => {
                                                        return (
                                                            <ProductItemListView key={index} item={item} />
                                                        )
                                                    })

                                        }
                                    </>
                                )}

                        </div>

                        {
                            totalPages > 1 &&
                            <div className='flex items-center justify-center mt-10'>
                                <Pagination
                                    showFirstButton showLastButton
                                    count={totalPages}
                                    page={page}
                                    onChange={(e, value) => setPage(value)}
                                />
                            </div>
                        }

                    </div>

                </div>
            </div>
        </section>
    )
}

export default ProductListing;
