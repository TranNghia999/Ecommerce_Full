import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails';


// Chi tiết sản phẩm mở
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ProductZoom from './components/ProductZoom';
import { IoCloseSharp } from "react-icons/io5";
import ProductDetailsComponent from './components/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import CartPage from './pages/Cart';
import Verify from './pages/Verify';
import ForgotPassword from './pages/ForgotPassword';
import Checkout from './pages/Checkout';
import MyAccount from './pages/MyAccount';
import MyList from './pages/MyList';
import Orders from './pages/Orders';
// thông báo
import toast, { Toaster } from 'react-hot-toast';
// của server API
import { fetchDataFromApi } from './utils/api';
import Address from './pages/MyAccount/address';


const MyContext = createContext()

function App() {

  // Kết nối API server cổng 8000
const apiUrl = import.meta.env.VITE_API_URL;

 

  // code Chi tiết sản phẩm mở
const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
  open:false,
  item:{}
});
const [maxWidth, setMaxWidth] = useState('lg');
const [fullWidth, setFullWidth] = useState(true);
const [ isLogin, setIsLogin] = useState(false);
// Code của hồ sơ người dùng
const [userData, setUserData] = useState(null);
// code giỏ hàng
const [openCartPanel, setOpenCartPanel] = useState(false);
 // hiển thị Địa chỉ
const [address, setAddress] = useState([]);

// mở trang hàng
const handleOpenProductDetailsModal = (status, item) => {
    setOpenProductDetailsModal({
        open: status,
        item: item
    });
}

// đóng trang hàng
const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal({
      open:false,
      item:{}
    });
  };

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };

// code thông báo
  const openAlertBox = (status, msg)=>{
    // lệnh thông báo đúng
    if(status === "Success"){   
      toast.success(msg);
    }
    // lệnh thông báo sai
      if(status === "error"){
      toast.error(msg);
    }
  }

  const alertBox = (type, msg ) => {
      if (type === "success") {
        toast.success(msg)
      }
      if (type === "error") {
        toast.error(msg)
      }
    }

  // Của  Server để hiển thị, người dùng chỉ cần [context?.catData] vô useEffect là dùng

  const [catData, setCatData] = useState([]);

  useEffect(() => {
      fetchDataFromApi("/api/category").then((res) => {
        if (res?.error === false) {
          setCatData(res?.data);
        }
      });
    }, []);

    // code của kết nối server api
  useEffect(()=>{

  const token = localStorage.getItem('accessToken');

  if(token!== undefined && token !== null && token !== ""){
        setIsLogin(true);

    fetchDataFromApi(`/api/user/user-details`).then((res) => {
      setUserData(res.data);
        if (res?.response?.data?.error === true) {
          if (res?.response?.data?.message === "Bạn chưa đăng nhập") {
            localStorage.removeItem("accessToken", res?.data?.accessToken);
            localStorage.removeItem("refreshToken", res?.data?.refreshToken);

            alertBox("error", "Tài khoản của bạn đã đóng, vui lòng đăng nhập lại")
            setIsLogin(false);
          }
        }
    })

    }else{
        setIsLogin(false);
    }
  },[isLogin])

  const values = {
    handleOpenProductDetailsModal,
    setOpenProductDetailsModal,
    setOpenCartPanel,
    openCartPanel,
    toggleCartPanel,
    openAlertBox,
    isLogin, 
    setIsLogin,
    alertBox,
    userData,
    setUserData,
    address, 
    setAddress,
    catData, 
    setCatData
    
  }

  return (
  <>
  <BrowserRouter>
    <MyContext.Provider value = {values}>
      <Header />
            <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/products"} element={<ProductListing/>}/>
                    <Route path={"/product/:id"} element={<ProductDetails/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/cart"} element={<CartPage/>}/>
                    <Route path={"/verify"} element={<Verify/>}/>
                    <Route path={"/forgot-password"} element={<ForgotPassword/>}/>
                    <Route path={"/checkout"} element={<Checkout/>}/>
                    <Route path={"/my-account"} element={<MyAccount/>}/>
                    <Route path={"/my-list"} element={<MyList/>}/>
                    <Route path={"/my-orders"} element={<Orders/>}/>
                    <Route path={"/address"} element={<Address/>}/>
            </Routes>
        <Footer />
    </MyContext.Provider>
  </BrowserRouter>

          {/* thông báo */}
              <Toaster />
  {/* code chi tiết sản phẩm */}
   <Dialog
        open={openProductDetailsModal.open}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" 
        className='productDetailsModal'>

       
        <DialogContent>
            <div className='flex items-center w-full ProductDetailsModalContainer relative'>
              <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[15px] right-[15px] !bg-[#f1f1f1]'
                      onClick={handleCloseProductDetailsModal}><IoCloseSharp className='text-[20px]'/>
              </Button>
              {
                openProductDetailsModal?.item?.length !== 0 &&
                <>
                   <div className='col1 w-[40%] px-3 PY-8'>
                    <ProductZoom images={openProductDetailsModal?.item?.images}/>
                </div>
                <div className='col2 w-[60%] px-8 py-8 pr-16 productContent'>
                    <ProductDetailsComponent item={openProductDetailsModal?.item}/>
                </div>
                </>
              }
               

            </div>
        </DialogContent>
      
    </Dialog>
   

  <Toaster />

  </>
  )
}

export default App

// Xuất ngữ cảnh cho mở chi tiết
export {MyContext}