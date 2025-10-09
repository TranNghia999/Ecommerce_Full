import React from 'react'
import HomeSlider from '../../components/HomeSlider';
import HomeCatSlider from '../../components/HomeCatSlider';
import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from '../../components/AdsBannerSliderV1';

import ProductsSlider from '../../components/ProductsSlider';
import BlogItem from '../../components/BlogItem';

// Các thư viện viện cần thiết
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// Thanh trượt
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';

import HomeBannerV2 from '../../components/HomeSliderV2';
import BannerBoxV2 from '../../components/BannerBoxV2';
import { fetchDataFromApi } from '../../utils/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { MyContext } from '../../App';
import { useContext } from 'react';
import ProductLoading from '../../components/ProductLoading';
import AdsBannerSliderV1 from '../../components/AdsBannerSliderV1';
import AdsBannerSliderV2 from '../../components/AdsBannerSliderV2';

const Home = () => {

  // Code cho Tab
  const [value, setValue] = React.useState(0);

  // Chọn các danh mục phụ
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Của Server
  const context = useContext(MyContext);

  const [homeSlidesData, setHomeSlidesData] = useState([]);
  const [popularProductsData, setPopularProductsData] = useState([]);

  // của lấy sản phẩm mới nhất
  const [productsData, setAllProductsData] = useState([]);
  // Của lấy Sản phẩm nổi bật
  const [featuredProducts, setFeaturedProducts] = useState([]);
  // Của banner QC
  const [bannerV1Data, setBannerV1Data] = useState([]);
  // Của Banner Nổi bật
const [bannerV2Data, setBannerV2Data] = useState([]);
  // Của Blogs
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    
    window.scrollTo(0, 0);

    // Lấy Slide phụ [ thư mục phụ ]
    fetchDataFromApi("/api/homeSlides").then((res) => {
      setHomeSlidesData(res?.data)
    })
    // lấy sản phẩm mới nhất
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      setAllProductsData(res?.products)
    })
    // lấy Sản phẩm nổi bật
    fetchDataFromApi("/api/product/getAllFeaturedProducts").then((res) => {
      setFeaturedProducts(res?.products)
    })
    // Lấy Banner QC
    fetchDataFromApi("/api/bannerV1").then((res) => {
      setBannerV1Data(res?.data);
    });
    // Lấy Banner Nổi Bật
    fetchDataFromApi("/api/bannerV2").then((res) => {
      setBannerV2Data(res?.data);
      console.log("bannerV2Data:", bannerV2Data);
    });
    // Lấy Blogs - Tin Tức
    fetchDataFromApi("/api/blog").then((res) => {
      setBlogData(res?.blogs);
    });

  }, [])

  useEffect(() => {
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${context?.catData[0]?._id}`).then((res) => {
      if (res?.error === false) {
        setPopularProductsData(res?.products)
      }
    })
  }, [context?.catData])

  const filterByCatId = (id) => {
    // Hiển thị ProductLoading xong mới hiện ProductsSlider
    setPopularProductsData([]);
    // Lấy sản phẩm để hiển thị ra ngoài
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res) => {
      if (res?.error === false) {
        setPopularProductsData(res?.products)
      }
    })
  }

  return (
    <>
      {
        homeSlidesData?.length !== 0 && <HomeSlider data={homeSlidesData} />
      }

      {
        context?.catData?.length !== 0 && <HomeCatSlider data={context?.catData} />
      }


      {/* Thanh sản phẩm phổ biến  */}
      <section className='bg-white py-8'>
        <div className='container'>
          <div className='flex items-center justify-between '>
            <div className='leftSec'>
              <h2 className='text-[20px] font-[600]'>Sản phẩm phổ biến</h2>
              <p className='text-[14px] font-[400] mt-0 mb-0'>Giá tốt cho sản phẩm bán chạy – Thời gian có hạn!</p>
            </div>

            <div className='rightSec w-[60%]'>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example">
                {
                  context?.catData?.length !== 0 && context?.catData?.map((cat, index) => {
                    return (
                      <Tab label={cat?.name} onClick={() => filterByCatId(cat?._id)} />
                    )
                  })
                }

              </Tabs>

            </div>
          </div>
          {
            popularProductsData?.length === 0 && <ProductLoading />
          }

          {
            popularProductsData?.length !== 0 && <ProductsSlider item={6} data={popularProductsData} />
          }

        </div>
      </section>

      <section className='py-6 pt-0 bg-white'>
        <div className='container flex gap-5'>
          <div className='part1 w-[70%]'>
            {
              productsData?.length !== 0 && <HomeBannerV2 data={productsData} />
            }

          </div>
          
          <div className='part2 w-[30%] flex items-center justify-between flex-col gap-5'>
            <BannerBoxV2 info="left" image={'https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg'} />
            <BannerBoxV2 info="right" image={'https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg'} />
          </div>

        </div>
      </section>

      {/* Thanh giao hàng miễn phí */}
      <section className='py-4 pt-4 bg-white'>
        <div className='container'>
          <div className='freeShipping w-[80%] m-auto py-2 p-4 border-2 border-[#ff5252] flex items-center justify-between rounded-md mb-7'>
            {/* Biểu tượng freeShip */}
            <div className='col1 flex items-center gap-4'>
              <LiaShippingFastSolid className='text-[50px]' />
              <span className='text-[20px] font-[700] uppercase'>Free Shipping</span>
            </div>

            {/* dòng giữ */}
            <div className='col2'>
              <p className='mb-0 font-[400]'>- Miễn phí vận chuyển mọi đơn hàng đối với thành viên Smem và SVip</p>
            </div>

            <span className='font-bold text-[22px] uppercase'> 200.000₫</span>

          </div>
          {
            bannerV1Data?.length !== 0 && <AdsBannerSliderV1 item={4} data={bannerV1Data} />
          }


        </div>
      </section>

      {/* Thanh sản phẩm mới */}
      <section className='py-5 pt-0 bg-white'>
        <div className='container'>
          <h2 className='text-[20px] font-[600]'>Sản phẩm mới nhất </h2>
          {/* Trạng thái loading xong mới chạy data */}
          {
            productsData?.length === 0 && <ProductLoading />
          }

          {
            productsData?.length !== 0 && <ProductsSlider item={6} data={productsData} />
          }

        </div>
      </section>

      {/* Thanh sản phẩm nổi bật */}
      <section className='py-5 pt-0 bg-white'>
        <div className='container'>
          <h2 className='text-[20px] font-[600]'>Sản phẩm nổi bật</h2>

          {/* Hiển thị loading ròi mới tới data */}

          {
            featuredProducts?.length === 0 && <ProductLoading />
          }
          {
            featuredProducts?.length !== 0 && <ProductsSlider item={6} data={featuredProducts} />
          }


          {/* Chưa Làm ADS */}

          {
            bannerV2Data?.length !== 0 && <AdsBannerSliderV2 item={4} data={bannerV2Data} />
          }

        </div>
      </section>
      
      {/* Blog cá nhân */}
      {
        blogData?.length !== 0 &&
        <section className='py-5 pb-8 pt-0 bg-white blogSection'>
          <div className='container'>
            <h2 className='text-[20px] font-[600] mb-4'>Tin Tức</h2>
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              navigation={true}
              modules={[Navigation]} className="blogSlider">
              {
                blogData?.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <BlogItem item={item}/>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </div>
        </section>
      }





    </>
  )
}

export default Home
