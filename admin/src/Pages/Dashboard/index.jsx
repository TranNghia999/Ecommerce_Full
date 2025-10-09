import React, { useState, PureComponent, useContext, useEffect } from "react";
import DashboardBoxes from "../../Components/DashboardBoxes";
import Button from "@mui/material/Button";
 
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Badge from "../../components/Badge";
//icon
import { FaPlus } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import { MdAddCircle } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { TbPackageImport } from "react-icons/tb";
import { HiOutlineDocumentAdd } from "react-icons/hi";

// check box
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import Progress from "../../Components/ProgressBar";

// code số thứ tự trang
import Pagination from '@mui/material/Pagination';
// Bảng UI Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// thanh lọc
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// Mã [ Hình ảnh chỉ được tải khi cần thiết (người dùng cuộn tới) ]
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// Nút loading
import CircularProgress from '@mui/material/CircularProgress';
// Đánh giá sao sản phẩm
import Rating from '@mui/material/Rating';
// Biểu đồ
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MyContext } from "../../App";
import SearchBox from "../../Components/SearchBox";
import { deleteData, deleteMultipleData, fetchDataFromApi } from "../../utils/api";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// các cột
const columns = [
  { id: 'product', label: 'TÊN SẢN PHẨM', minWidth: 150 },
  { id: 'category', label: 'DANH MỤC CHÍNH', minWidth: 160 },
  {
    id: 'subCategory',
    label: 'DANH MỤC PHỤ',
    minWidth: 150,
  },
  {
    id: 'price',
    label: 'GIÁ',
    minWidth: 130,
  },
  {
    id: 'sales',
    label: 'GIẢM GIÁ',
    minWidth: 100,
  },
  {
    id: 'rating',
    label: 'ĐÁNH GIÁ',
    minWidth: 100,
  },
  {
    id: 'action',
    label: 'CHỨC NĂNG',
    minWidth: 100,
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const Dashboard = () => {

  const context = useContext(MyContext);

  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
  const [categoryFilterVal, setCategoryFilterVal] = React.useState('');

  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };

  // Code Của Sản Phẩm [ Chức Năng ]
 const [isLoading, setIsLoading] = useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

      // Lọc Danh Mục Chính
    const [productCat, setProductCat] = React.useState('');

    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        setProductSubCat('');
        setProductThirdLavelCat('');
          setIsLoading(true)
        fetchDataFromApi(`/api/product/getAllProductsbyCatId/${event.target.value}`).then((res)=>{
          if (res?.error === false) {
              setProductData(res?.products)
              setTimeout(() => {
                  setIsLoading(false)
              }, 300);
          }
      })
   
  };
  
     // Lọc danh mục phụ
    const [productSubCat, setProductSubCat] = React.useState('');

    const handleChangeProductSubCat = (event) => {
        setProductSubCat(event.target.value);
         setProductCat('');
        setProductThirdLavelCat('');
            setIsLoading(true)
        fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${event.target.value}`).then((res)=>{
          if (res?.error === false) {
              setProductData(res?.products)
              setTimeout(() => {
                  setIsLoading(false)
              }, 500);
          }
      })
       
    };
    
      // Lọc danh mục con
    const [productThirdLavelCat, setProductThirdLavelCat] = useState('');
       
    const handleChangeProductThirdLavelCat = (event) => {
        setProductThirdLavelCat(event.target.value);
        setProductCat('');
        setProductSubCat('');
       
             setIsLoading(true)
        fetchDataFromApi(`/api/product/getAllProductsByThirdLavelCat/${event.target.value}`).then((res)=>{
          if (res?.error === false) {
              setProductData(res?.products)
              setTimeout(() => {
                  setIsLoading(false)
              }, 500);
          }
      })
    };
    
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    // Các kết nối API server đến Admin
    const [productData, setProductData] = useState([]);

    useEffect((()=>{
      getProducts();
    }),[context?.isOpenFullScreenPanel])

   const getProducts = async () => {
      setIsLoading(true)
      fetchDataFromApi("/api/product/getAllProducts").then((res) => {
        // lấy các sản phẩm
          let productArr = [];
          if (res?.error === false) {
              for (let i = 0; i < res?.products?.length; i++) {
                  productArr[i] = res?.products[i];
                  productArr[i].checked = false;
                  // console.log(res?.products[i])
              }
              setTimeout(() => {
                setProductData(productArr.reverse())
                setIsLoading(false)
            }, 300);
              
          }
      })
  }

    // Code xóa bỏ sản phẩm
    const deleteProduct = (id) => {
      deleteData(`/api/product/${id}`).then((res) => {
          getProducts();
          context.alertBox("success", "Đã xóa thành công");
      })
    }

    // Xóa nhiều sản phẩm
    const deleteMultipleProduct = () => {
      if (sortedIds.length === 0) {
        context.alertBox('error', 'Vui lòng chọn các mục để xóa.');
        return;
      }

        try {
      deleteMultipleData(`/api/product/deleteMultiple`, {
        data: { ids: sortedIds }, }).then((res) => {
        getProducts();
        context.alertBox("success", "Đã xóa sản phẩm");
        setSortedIds([]);

      })
    } catch (error) {
      context.alertBox('error', 'Lỗi xóa mục');
    }
  }

  const [sortedIds, setSortedIds] = useState([]);


      //Trình xử lý để chuyển đổi tất cả các hộp kiểm
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;

        // Cập nhật trạng thái đã kiểm tra của tất cả các mục
        const updatedItems = productData.map((item) => ({
            ...item,
            checked: isChecked,
        }));
        setProductData(updatedItems);

        // Cập nhật trạng thái ID đã sắp xếp
        if (isChecked) {
            const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
            console.log(ids)
            setSortedIds(ids);
        } else {
            setSortedIds([]);
      }
    };

    // Chọn 1 Sản phẩm ở checkbox
  const handleCheckboxChange = (e, id, index) => {

      const updatedItems = productData.map((item) =>
        item._id === id ? { ...item, checked: !item.checked } : item
      );
      setProductData(updatedItems);

      // Cập nhật trạng thái ID đã sắp xếp
      const selectedIds = updatedItems
        .filter((item) => item.checked)
        .map((item) => item._id)
        .sort((a, b) => a - b);
      setSortedIds(selectedIds);

      console.log(selectedIds)
    };
  


// Biểu đồ
const [ chart1Data, setChart1Data ] = useState([
  {
    name: 'JAN',
    TotalUsers: 4000,
    TotalSales: 2400,
    amt: 2400,
  },
  {
    name: 'FEB',
    TotalUsers: 3000,
    TotalSales: 1398,
    amt: 2210,
  },
  {
    name: 'MARCH',
    TotalUsers: 2000,
    TotalSales: 9800,
    amt: 2290,
  },
  {
    name: 'APRIL',
    TotalUsers: 2780,
    TotalSales: 3908,
    amt: 2000,
  },
  {
    name: 'MAY',
    TotalUsers: 1890,
    TotalSales: 6800,
    amt: 2181,
  },
  {
    name: 'JUNE',
    TotalUsers: 2390,
    TotalSales: 3800,
    amt: 2500,
  },
  {
    name: 'JULY',
    TotalUsers: 3490,
    TotalSales: 300,
    amt: 2100,
  },
   {
    name: 'AUG',
    TotalUsers: 3490,
    TotalSales: 4300,
    amt: 2100,
  },
   {
    name: 'SEP',
    TotalUsers: 2490,
    TotalSales: 4300,
    amt: 2100,
  },
   {
    name: 'OCT',
    TotalUsers: 3490,
    TotalSales: 4300,
    amt: 2100,
  },
   {
    name: 'NOV',
    TotalUsers: 3490,
    TotalSales: 5300,
    amt: 2100,
  },
   {
    name: 'DEC',
    TotalUsers: 3490,
    TotalSales: 1300,
    amt: 2100,
  },
]);

// Lời chào Admin
const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return {
      greet: "Chào buổi sáng",
      desc: "Đây là những gì đang diễn ra tại cửa hàng của bạn sáng nay. Xem số liệu thống kê ngay."
    };
  }

  if (hour < 18) {
    return {
      greet: "Chào buổi chiều",
      desc: "Đây là những gì đang diễn ra tại cửa hàng của bạn chiều nay. Cập nhật số liệu kinh doanh ngay."
    };
  }

  return {
    greet: "Chào buổi tối",
    desc: "Đây là những gì đang diễn ra tại cửa hàng của bạn tối nay. Tổng hợp nhanh doanh thu và đơn hàng."
  };
};
const { greet, desc } = getGreeting();

  return (
    <>
      <div className="w-full py-2 px-5 border border-[rgba(0,0,0,0.1)] bg-[#f1faff] flex items-center gap-8 mb-5 justify-between rounded-md">
        <div className="info">
          <h1 className="text-[35px] font-bold leading-10 mb-3">
            {greet} <br /> Admin 
          </h1>
          <p>{desc}</p>
          <br />
          <Button className="btn-blue !capitalize gap-1"
           onClick={()=>context.setIsOpenFullScreenPanel({ open: true,
                                                          model: 'Thêm Sản Phẩm'})}>
            <MdAddCircle className="text-[20px]" /> Thêm Sản Phẩm
          </Button>
        </div>
        <img
          src="/shop.png"
          className="w-[250px]"
        />
      </div>
      <DashboardBoxes />

     <div className="card my-4 pt-5  shadow-md sm:rounded-lg bg-white">
          
            {/* Bộ lọc */}
            <div className="flex items-center w-full  px-5 justify-between gap-4">
                 
                  {/* Bộ lọc danh mục chính */}
                  <div className="col w-[18%]">
                    <h4 className="text-[13px] font-[600] mb-2">Danh Mục Chính</h4>
                   {
                        context?.catData?.length !== 0 &&
                        
                         <Select
                        labelId="demo-simple-select-label"
                        id="productCatDrop"
                        size='small'
                        style={{ zoom: '80%' }}
                        className='w-full'
                        value={productCat}
                        label="Category"
                        onChange={handleChangeProductCat}
                        >

                        {
                            context?.catData?.map(((cat,index)=>{
                            return(
                                <MenuItem   value={cat?._id} >  {cat?.name}</MenuItem>
                            )
                            }))
                        }
                            
                        </Select>
                    }
         
                  </div>


                   {/* Bộ lọc danh mục phụ */}
                   <div className="col w-[18%]">
                    <h4 className="text-[13px] font-[600] mb-2">Danh Mục Phụ</h4>
                     {
                        context?.catData?.length !== 0 &&
                        
                         <Select
                        labelId="demo-simple-select-label"
                        id="productCatDrop"
                        size='small'
                        style={{ zoom: '80%' }}
                        className='w-full'
                        value={productSubCat}
                        label="Sub Category"
                        onChange={handleChangeProductSubCat}
                        >

                        {
                            context?.catData?.map(((cat,index)=>{
                            return(
                                    cat?.children?.length !== 0 && cat?.children?.
                                        map((subCat, index_) => {
                                        return (
                                                <MenuItem   value={subCat?._id}> {subCat?.name}</MenuItem>
                                            )
                                        })
                                    )
                            }))
                        }
                            
                        </Select>
                    }
         
                  </div>

                  {/* Bộ lọc danh mục con */}
                  
                   <div className="col w-[18%]">
                    <h4 className="text-[13px] font-[600] mb-2">Danh Mục Con</h4>
                       {
                        context?.catData?.length !== 0 &&
                        
                         <Select
                        labelId="demo-simple-select-label"
                        id="productCatDrop"
                        size='small'
                        style={{ zoom: '80%' }}
                        className='w-full'
                        value={productThirdLavelCat}
                        label="Sub Category"
                        onChange={handleChangeProductThirdLavelCat}
                        >

                        {
                            context?.catData?.map(((cat)=>{
                            return(
                                    cat?.children?.length !== 0 && cat?.children?.
                                        map((subCat) => {
                                        return (
                                                subCat?.children?.length!==0 && subCat?.children?.map(((thirdLavelCat, index)=>
                                                        {
                                                            return (
                                                                    <MenuItem   value={thirdLavelCat?._id} key={index}>
                                                                        {thirdLavelCat?.name}
                                                                    </MenuItem>
                                                                    )
                                                        }))
                                                
                                                )
                                        })
                                    )
                            }))
                        }
                            
                        </Select>
                    }
         
                  </div>
    
                <div className="col w-[20%] ml-auto">

                    <SearchBox />
                </div>
               
            </div>
          <br/>
    
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead className="">
          <TableRow>  

              {/* Hộp kiểm tất cả sản phẩm  */}
                <TableCell> 
                    <Checkbox {...label} size="small"
                    onChange={handleSelectAll}
                    checked={ (productData?.length > 0 ? productData.every((item) => item.checked) : false)}
                  />
                </TableCell>
                    {
                      columns.map((column) => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} > 
                                {column.label} 
                      </TableCell>
                      ))
                    }
            </TableRow>
        </TableHead>
              
        <TableBody>

               {/* Hiển thị dữ liệu sản phẩm tại đây */}
        {
          isLoading=== false ? productData?.length !==0 && productData?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
            )
              ?.map(((product, index)=>{
                      return(

                <TableRow key={index} >

                          {/* Hộp kiểm của 1 sản phẩm */}
                    <TableCell style={{ minWidth: columns.minWidth }}> 
                          <Checkbox {...label} size="small"
                          // Chọn Tất cả sản phẩm
                          checked={product.checked === true ? true : false}
                          // Chọn 1 sản phẩm
                          onChange={(e) => handleCheckboxChange(e, product._id, index)}
                          />
                    </TableCell>
                    
                    {/* Hiển Thị Hình Ảnh */}
                    <TableCell style={{ minWidth: columns.minWidth }}>
                        <div className="flex items-center gap-4 w-[300px]">
                          <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group"> 
                      
                                <Link to={`/product/${product?._id}`} data-discover="true"> 
                                    <LazyLoadImage
                                        alt={"image"}
                                        effect="blur"
                                        className="w-full group-hover:scale-105 transition-all"
                                        src={product?.images[0]}
                                      />
                                </Link>
                          
                          </div>
                          <div className="info w-[75%]">
                              <h3 className="text-[12px] font-[600] leading-4 hover:text-[#3872fa]">
                                    <Link to={`/product/${product?._id}`} > {product?.name}</Link>
                              </h3>
                                    <span className="text-[12px]">  {product?.brand} </span>
                          </div>
                        </div>
      
                    </TableCell>

                    <TableCell style={{ minWidth: columns.minWidth }}> {product?.catName} </TableCell>
              
                    <TableCell style={{ minWidth: columns.minWidth }}> {product?.subCat} </TableCell>
        
                    <TableCell style={{ minWidth: columns.minWidth }}> 
                          
                        <div className='flex items-center gap-1 flex-col'>
                              <span className='oldPrice line-through leading-3 font-[500] text-gray-500 text-[14px]'> {product?.price} &#8363; </span>
                              <span className='price text-primary font-[600] text-[14px] '>{product?.oldPrice}&#8363; </span>
                        </div>
                          
                    </TableCell>

                    <TableCell style={{ minWidth: columns.minWidth }}> 
                          
                            <p className="text-[14px] w-[100px]">
                                  <span className="font-[600]"> {product?.sale}  </span> sale
                            </p>
                    </TableCell>

                     <TableCell style={{ minWidth: columns.minWidth }}> 
                          
                            <p className="text-[14px] w-[100px]">
                                <Rating name="half-rating" defaultValue={product?.rating} size='small' readOnly />
                            </p>
                            
                    </TableCell>
                          
                    <TableCell style={{ minWidth: columns.minWidth }}> 
                          
                        <div className="flex items-center gap-1">
                            
                          <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]"
                                   onClick={()=>context.setIsOpenFullScreenPanel({ open: true, model: 'Sửa Sản Phẩm',id: product?._id})}>
                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]"/>
                          </Button>

                            <Link to={`/product/${product?._id}`}> 
                          <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]">
                            <LuEye className="text-[rgba(0,0,0,0.7)] text-[18px]"/>
                          </Button>
                          </Link>
                          
                         
                          <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]"
                                  onClick={() => deleteProduct(product?._id)}>
                            <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]"/>
                          </Button>
                         
                          
                        </div>
                          
                    </TableCell>
                </TableRow>

                )
            }))

            :
            <>
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="flex items-center justify-center w-full min-h-[400px]">
                    <CircularProgress color="inherit" /> 
                </div>
                </TableCell>
              </TableRow>
            </>
            
        }
                
          

        </TableBody>
      </Table>
    </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={productData?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage} />
    
  </div>

       

{/* Thành Phần Sản Phẩm 2 */}
      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
        </div>

        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  {" "}
                  &nbsp;{" "}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {" "}
                  Order Id{" "}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {" "}
                  Paymant Id{" "}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {" "}
                  Name{" "}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {" "}
                  Phone Number{" "}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {" "}
                  Address{" "}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {" "}
                  Pincode{" "}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {" "}
                  Total Amount{" "}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {" "}
                  Email
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {" "}
                  User Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {" "}
                  Order Status
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {" "}
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 font-[500]">
                <td className="px-6 py-4 font-[500]">
                  <Button
                    className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                    onClick={() => isShowOrderdProduct(0)}
                  >
                    {isOpenOrderdProduct === 0 ? (
                      <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    ) : (
                      <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    )}
                  </Button>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary font-[600]">6849aec8228db479bb5bb849</span>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary whitespace-nowrap font-[600]">
                    CASH ON DELIVERY
                  </span>
                </td>

                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  {" "}
                  Sophia-Pham
                </td>
                <td className="px-6 py-4 font-[500]"> 9198724897 </td>

                <td className="px-6 py-4 font-[500]">
                  <span className="block w-[400px]">
                    Tam Sơn, Thập Thất, Sơn Thủy
                  </span>
                </td>

                <td className="px-6 py-4 font-[500]"> 3989047 </td>
                <td className="px-6 py-4 font-[500]"> 3998</td>
                <td className="px-6 py-4 font-[500]">
                  {" "}
                  tranhoakelvin@gmail.com{" "}
                </td>

                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary font-[600]">683eb6b8228db479bb4fd37c</span>
                </td>

                <td className="px-6 py-4 font-[500]">
                  {" "}
                  <Badge status="confirm" />{" "}
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  {" "}
                  2025-06-11{" "}
                </td>
              </tr>
              {isOpenOrderdProduct === 0 && (
                <tr>
                  <td className="pl-20" colSpan="6">
                    <div className="relative overflow-x-auto mt-5">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              {" "}
                              Product Id{" "}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              {" "}
                              Product Title
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              {" "}
                              Image{" "}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              {" "}
                              Quantity{" "}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              {" "}
                              Price{" "}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              {" "}
                              Sub Total{" "}
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 font-[500]">
                            <td className="px-6 py-4 font-[500]">
                              <span className="text-gray-600">
                                6849ae91228db479bb5bb7ca
                              </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              Men Pure Cotton Striped Casual Shirt
                            </td>

                            <td className="px-6 py-4 font-[500] ">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742462729828_zoom_0-1673275594.webp"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 font-[500]"> 2 </td>

                            <td className="px-6 py-4 font-[500]">₹1,999.00 </td>
                            <td className="px-6 py-4 font-[500]">₹3,998.00</td>
                          </tr>

                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 font-[500]">
                            <td className="px-6 py-4 font-[500]">
                              <span className="text-gray-600">
                                6849ae91228db479bb5bb7ca
                              </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              Men Pure Cotton Striped Casual Shirt
                            </td>

                            <td className="px-6 py-4 font-[500] ">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742462729828_zoom_0-1673275594.webp"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 font-[500]"> 2 </td>

                            <td className="px-6 py-4 font-[500]">₹1,999.00 </td>
                            <td className="px-6 py-4 font-[500]">₹3,998.00</td>
                          </tr>
                          <tr>
                            <td className="bg-[#f1f1f1]" colSpan="12"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}

              {/* Thành phần 2 */}

                 <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 font-[500]">
                <td className="px-6 py-4 font-[500]">
                  <Button
                    className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                    onClick={() => isShowOrderdProduct(1)}
                  >
                    {isOpenOrderdProduct === 1 ? (
                      <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    ) : (
                      <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    )}
                  </Button>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary font-[600]">6849aec8228db479bb5bb849</span>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary whitespace-nowrap font-[600]">
                    CASH ON DELIVERY
                  </span>
                </td>

                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  {" "}
                  Sophia-Pham
                </td>
                <td className="px-6 py-4 font-[500]"> 9198724897 </td>

                <td className="px-6 py-4 font-[500]">
                  <span className="block w-[400px]">
                    Tam Sơn, Thập Thất, Sơn Thủy
                  </span>
                </td>

                <td className="px-6 py-4 font-[500]"> 3989047 </td>
                <td className="px-6 py-4 font-[500]"> 3998</td>
                <td className="px-6 py-4 font-[500]">
                  {" "}
                  tranhoakelvin@gmail.com{" "}
                </td>

                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary font-[600]">683eb6b8228db479bb4fd37c</span>
                </td>

                <td className="px-6 py-4 font-[500]">
                  {" "}
                  <Badge status="confirm" />{" "}
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  {" "}
                  2025-06-11{" "}
                </td>
              </tr>
              {isOpenOrderdProduct === 1 && (
                <tr>
                  <td className="pl-20" colSpan="6">
                    <div className="relative overflow-x-auto mt-5">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              {" "}
                              Product Id{" "}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              {" "}
                              Product Title
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              {" "}
                              Image{" "}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              {" "}
                              Quantity{" "}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              {" "}
                              Price{" "}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              {" "}
                              Sub Total{" "}
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 font-[500]">
                            <td className="px-6 py-4 font-[500]">
                              <span className="text-gray-600">
                                6849ae91228db479bb5bb7ca
                              </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              Men Pure Cotton Striped Casual Shirt
                            </td>

                            <td className="px-6 py-4 font-[500] ">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742462729828_zoom_0-1673275594.webp"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 font-[500]"> 2 </td>

                            <td className="px-6 py-4 font-[500]">₹1,999.00 </td>
                            <td className="px-6 py-4 font-[500]">₹3,998.00</td>
                          </tr>

                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 font-[500]">
                            <td className="px-6 py-4 font-[500]">
                              <span className="text-gray-600">
                                6849ae91228db479bb5bb7ca
                              </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              Men Pure Cotton Striped Casual Shirt
                            </td>

                            <td className="px-6 py-4 font-[500] ">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742462729828_zoom_0-1673275594.webp"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 font-[500]"> 2 </td>

                            <td className="px-6 py-4 font-[500]">₹1,999.00 </td>
                            <td className="px-6 py-4 font-[500]">₹3,998.00</td>
                          </tr>
                          <tr>
                            <td className="bg-[#f1f1f1]" colSpan="12"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
{/* Thành phần biểu đồ */}
       <div className="card my-4 shadow-md sm:rounded-lg bg-white">
              <div className="flex items-center justify-between px-5 py-5">
                <h2 className="text-[18px] font-[600]">Total Users & Total Sales</h2>
              </div>

               <div className="flex items-center gap-5 px-5 py-5 pt-1">
                <span className="flex items-center gap-1 text-[15px]"> 
                    <span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span> Total Users:
                </span>

                 <span className="flex items-center gap-1 text-[15px]"> 
                    <span className="block w-[8px] h-[8px] rounded-full bg-[#3872fa]"></span> Total Sales:
                </span>
                
              </div>

          <LineChart
                  width={1000}
                  height={500}
                  data={chart1Data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
          <CartesianGrid strokeDasharray="3 3" stroke="none"/>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="TotalSales" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="TotalUsers" stroke="#82ca9d" strokeWidth={3}/>
        </LineChart>
       </div>
    </>
  );
};

export default Dashboard;
