import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';
import BannerBox from '../BannerBox';

const AdsBannerSliderV2 = (props) => {
    return (
        <div className='py-5 w-full'>
            <Swiper
                slidesPerView={props.item}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="smlBtn">
                {
                    props?.data?.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <BannerBox image={item?.images[0]} link={'/'}/>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>

    )
}

export default AdsBannerSliderV2;