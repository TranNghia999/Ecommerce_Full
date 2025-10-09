import React, { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import '../Sidebar/style.css';
import { Collapse } from 'react-collapse';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Button from '@mui/material/Button';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
// đánh giá
import Rating from '@mui/material/Rating';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { postData } from '../../utils/api';

// Assuming you have a CSS file for styling

const Sidebar = (props) => {

  // code mở đống  nút danh mục
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(false);

  // Của BE kết nối Server đến FE
  const context = useContext(MyContext);

  const [filters, setFilters] = useState({
    catId: [],
    subCatId: [],
    thirdsubCatId: [],
    minPrice: '',
    maxPrice: '',
    rating: '',
    page: 1,
    limit: 25
  })

  // giá trị mặc định
  const [price, setPrice] = useState([0, 100000000]);

  // Format tiền VNĐ  -- -- của Lọc Giá Tiền
  const formatPrice = (value) => {
    return value.toLocaleString('vi-VN') + 'đ';
  };

  // Xử lý slider, làm tròn về bội số -- của Lọc Giá Tiền
  const handlePriceChange = (val) => {
    let [min, max] = val;

    // Min xử lý
    if (min <= 1000000) {
      min = Math.round(min / 100000) * 100000; // dưới hoặc bằng 1 triệu thì làm tròn 100k
    } else {
      min = Math.round(min / 1000000) * 1000000; // trên 1 triệu thì làm tròn 1 triệu
    }

    // Max xử lý
    if (max <= 1000000) {
      max = 1000000; // không bao giờ nhỏ hơn 1 triệu
    } else {
      max = Math.round(max / 1000000) * 1000000; // trên 1 triệu thì làm tròn 1 triệu
    }

    setPrice([min, max]);
  };

  const handleCheckboxChange = (field, value) => {

    const currentValues = filters[field] || []
    const updatedValues = currentValues?.includes(value) ?
      currentValues.filter((item) => item !== value) :
      [...currentValues, value];

    setFilters((prev) => ({
      ...prev,
      [field]: updatedValues
    }))

    console.log(filters)

    if (field === "catId") {
      setFilters((prev) => ({
        ...prev,
        subCatId: [],
        thirdsubCatId: []
      }))

    }
  }


  const location = useLocation();

  useEffect(() => {
    const url = window.location.href;
    const queryParameters = new URLSearchParams(location.search);

    if (url.includes("catId")) {
      const categoryId = queryParameters.get("catId");
      const catArr = [];
      catArr.push(categoryId);
      filters.catId = catArr;
      filters.subCatId = [];
      filters.thirdsubCatId = [];
      filters.rating = [];
    }

    if (url.includes("subCatId")) {
      const subcategoryId = queryParameters.get("subCatId");
      const subcatArr = [];
      subcatArr.push(subcategoryId);
      filters.subCatId = subcatArr;
      filters.catId = [];
      filters.thirdsubCatId = [];
      filters.rating = [];
    }

    if (url.includes("thirdLavelCatId")) {
      const thirdcategoryId = queryParameters.get("thirdLavelCatId");
      const thirdcatArr = [];
      thirdcatArr.push(thirdcategoryId);
      filters.subCatId = [];
      filters.catId = [];
      filters.thirdsubCatId = thirdcatArr;
      filters.rating = [];
    }

    filters.page = 1;

    setTimeout(() => {
      filtesData();
    }, 200);

  }, [location]);

  const filtesData = () => {
    props.setIsLoading(true);
    postData('/api/product/filters', filters).then((res) => {
      props.setProductsData(res);
      props.setIsLoading(false);
      props.setTotalPages(res?.totalPages)
      window.scrollTo(0, 0);
    })
  }

  useEffect(() => {
    filters.page = props.page;
    filtesData();
  }, [filters, props.page])

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: price[0],
      maxPrice: price[1]
    }))
  }, [price]);

  return (
    <aside className='sidebar py-5 sticky top-[130px] z-[50]'>
      <div className='box'>
        <h3 className='w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>Danh mục sản phẩm
          <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rouded-full !ml-auto !text-[#000]'
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}>
            {
              isOpenCategoryFilter === true ? <FaAngleUp /> : <FaAngleDown />
            }
          </Button>
        </h3>
        <Collapse isOpened={isOpenCategoryFilter}>
          <div className='scroll px-4 relative -left-[13px]'>
            {
              context?.catData?.length !== 0 && context?.catData?.map((item, index) => {
                return (

                  <FormControlLabel key={index}
                    value={item?._id}
                    control={<Checkbox />}
                    checked={filters?.catId?.includes(item?._id)}
                    label={item?.name}
                    onChange={() => handleCheckboxChange('catId', item?._id)}
                    className="w-full"
                  />
                )
              })
            }

          </div>
        </Collapse>
      </div>

      {/* Lọc theo giá */}

      <div className='box mt-4'>
        <h3 className='w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>Khoảng giá</h3>

        <RangeSlider
          value={price}
          onInput={handlePriceChange}
          min={0}
          max={100000000}
          step={100000}
        />

        <div className='flex pt-4 pb-2 priceRange'>
          <span className='text-[13px]'>
            Từ: <strong className='text-dark'>{formatPrice(price[0])}</strong>
          </span>
          <span className='ml-auto text-[13px]'>
            Đến: <strong className='text-dark inline-block min-w-[100px] text-left'>{formatPrice(price[1])}</strong>
          </span>
        </div>
      </div>

      {/* Bộ lọc đánh giá */}

      <div className='box mt-4'>
        <h3 className='w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>Đánh giá khách hàng</h3>
        
        <div className="flex items-center">
          <FormControlLabel
            value={5}
            control={<Checkbox />}
            checked={filters?.rating?.includes(5)}
            onChange={() => handleCheckboxChange('rating', 5)}
            
          />
          <Rating name="rating" value={5} size="small" readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={4}
            control={<Checkbox />}
            checked={filters?.rating?.includes(4)}
            onChange={() => handleCheckboxChange('rating', 4)}
            
          />
          <Rating name="rating" value={4} size="small" readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={3}
            control={<Checkbox />}
            checked={filters?.rating?.includes(3)}
            onChange={() => handleCheckboxChange('rating', 3)}
            
          />
          <Rating name="rating" value={3} size="small" readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={2}
            control={<Checkbox />}
            checked={filters?.rating?.includes(2)}
            onChange={() => handleCheckboxChange('rating', 2)}
            
          />
          <Rating name="rating" value={2} size="small" readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={1}
            control={<Checkbox />}
            checked={filters?.rating?.includes(1)}
            onChange={() => handleCheckboxChange('rating', 1)}
            
          />
          <Rating name="rating" value={1} size="small" readOnly />
        </div>
       
      </div>
    </aside>

  )
}

export default Sidebar;
