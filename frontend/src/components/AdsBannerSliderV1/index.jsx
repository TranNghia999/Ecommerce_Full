import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';
import BannerBoxV2 from '../BannerBoxV2';

// Các Slider Quảng Cáo Phụ
const AdsBannerSliderV1 = (props) => {
  return (
    <div className='py-5 w-full'>
        <Swiper
            slidesPerView={props.item}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="smlBtn">
            {
                props?.data?.map((item,index)=>{
                    return(
                    <SwiperSlide key={index}>
                        <BannerBoxV2 info={item?.alignInfo} item={item} image={item?.images[0]} link={'/'}/>
                    </SwiperSlide>
                    )
                })
            }
        </Swiper>
    </div>

  )
}

export default AdsBannerSliderV1;

