import React from 'react';
// thanh trượt Silders
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
// icon
import { GoGift } from "react-icons/go";
import { IoStatsChartSharp } from "react-icons/io5";
import { AiOutlinePieChart } from "react-icons/ai";
import { BsBank } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";


const DashboardBoxes = () => {
  return (
    <>
     <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider">
        <SwiperSlide>
           <div className='box bg-[#3872fa] p-5 py-6 cursor-pointer hover:bg-[#346ae8] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
           <GoGift className='text-[40px] text-[#fff]'/>
             <div className='info w-[70%]'>
                <h3 className='text-white'>Đơn Hàng Mới</h3>
                <b className='text-white text-[20px]'>299</b>
             </div>
                <IoStatsChartSharp className='text-[50px] text-[#fff]'/>
           </div>
        </SwiperSlide>

         <SwiperSlide>
           <div className='box bg-[#10b981] p-5 py-6  cursor-pointer hover:bg-[#289974] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
           <AiOutlinePieChart className='text-[45px] text-[#fff]'/>
             <div className='info w-[70%]'>
                <h3 className='text-white'>Doanh Số</h3>
                <b className='text-white text-[20px]'>90.298.000đ</b>
             </div>
                <IoStatsChartSharp className='text-[50px] text-[#fff]'/>
           </div>
        </SwiperSlide>

         <SwiperSlide>
           <div className='box p-5  bg-[#f22c61]  py-6 cursor-pointer hover:bg-[#d52c59] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
           <BsBank className='text-[40px] text-white'/>
             <div className='info w-[70%]'>
                <h3 className='text-white'>Doanh Thu</h3>
                <b className='text-white text-[20px]'>70.890.000đ</b>
             </div>
                <IoStatsChartSharp className='text-[50px] text-[#fff]'/>
           </div>
        </SwiperSlide>

         <SwiperSlide>
           <div className='box p-5 bg-[#312be1d8]  py-6  cursor-pointer hover:bg-[#423eadd8] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
           <RiProductHuntLine className='text-[45px] text-white'/>
             <div className='info w-[70%]'>
                <h3 className='text-white'>Sản Phẩm</h3>
                <b className='text-white text-[20px]'>549</b>
             </div>
                <IoStatsChartSharp className='text-[50px] text-[#fff]'/>
           </div>
        </SwiperSlide>

      </Swiper>
      
    </>
  )
}

export default DashboardBoxes;
