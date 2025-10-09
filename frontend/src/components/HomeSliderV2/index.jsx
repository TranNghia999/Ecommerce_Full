import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Link } from 'react-router-dom';

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import Button from "@mui/material/Button";
import { MyContext } from "../../App";
import { useContext } from "react";
import { formatCurrency } from "../../utils/api";

const HomeBannerV2 = (props) => {
  // Của Server
  const context = useContext(MyContext);
  return (
    <Swiper
      loop={true}
      spaceBetween={30}
      effect={"fade"}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      modules={[EffectFade, Navigation, Pagination, Autoplay]}
      className="homeSliderV2"
    >
      {props?.data?.map((item, index) => {
        if (item?.isDisplayOnHomeBanner === true) {
          return (
            <SwiperSlide key={index}>
              <div className="item w-full rounded-md overflow-hidden relative">
                <img src={item?.bannerimages[0]} />
                <div
                  className="info absolute top-0 -right-[100%] w-[50%] h-[100%] opacity-0 z-50 p-8 
                            flex items-center flex-col justify-center transition-all duration-500"
                >
                  <h4 className="text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0">
                    {item?.bannerTitleName}
                  </h4>
                  <h2 className="text-[35px] font-[700] w-full relative -right-[100%] opacity-0">
                    {item?.name}
                  </h2>
                  <h3
                    className="flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3
                                            relative -right-[100%] opacity-0"
                  > Giá chỉ từ 
                    <span className="text-primary text-[30px] font-[700]">
                      {formatCurrency(item?.price)}
                    </span>
                  </h3>
                  <div className="btn_ w-full relative -right-[100%] opacity-0">
                    <Link to={`/product/${item?._id}`}>
                      <Button className="btn-org1">SHOP NOW</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
};

export default HomeBannerV2;
