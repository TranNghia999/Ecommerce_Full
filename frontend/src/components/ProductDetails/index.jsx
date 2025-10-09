import React, { useState } from 'react'
import Button from "@mui/material/Button";
import QtyBox from "../QtyBox";
import Rating from "@mui/material/Rating";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";
import { formatCurrency } from '../../utils/api';

const ProductDetailsComponent = (props) => {

  // nút chọn size
  const [productActionIndex, setProductActionIndex] = useState(null);

  return (
    <>

      <h3 className="text-[24px] font-[600] mb-2">
        {props?.item?.name}
      </h3>

      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-[13px]">
          Thương hiệu :
          <span className="font-[500] text-black opacity-75"> {props?.item?.brand}</span>
        </span>
        <Rating
          name="size-small"
          defaultValue={4}
          size="small"
          readOnly
        />

        <span className="text-[13px] cursor-pointer">Reviews (5)</span>
      </div>
      {/* Giá sản phẩm */}
      {/* Giá sản phẩm + Kho còn */}
<div className="flex items-center gap-5 mt-2">
  <span className='price text-primary font-[600] text-[24px]'>
    {formatCurrency(props?.item?.price)}
  </span>

  <span className="text-[14px]">
    Kho còn :
    <span className="text-green-600 text-[14px] font-bold">
      {props?.item?.countInStock}
    </span>
  </span>
</div>

{/* Giá cũ + % giảm */}
<div className="flex items-center gap-2">
  <span className="oldPrice line-through font-[500] text-gray-500 text-[14px]">
    {formatCurrency(props?.item?.oldPrice)}
  </span>
  <span className="text-gray-500 font-[600] text-[14px]">
    (-{props?.item?.discount}%)
  </span>
</div>

      
        <div
    className="mt-3 pr-10 mb-1"
    dangerouslySetInnerHTML={{
     __html: props?.item?.description
    }}
     />

      {/* Dung lượng điện thoại  */}
      {
        props?.item?.productRam?.length !== 0 &&
        <div className="flex items-center gap-3">
          <span className="text-[16px]">RAM :</span>
          <div className="flex items-center gap-1 actions">
            {
              props?.item?.productRam?.map((item, index) => {
                return (
                  <Button
                    className={`${productActionIndex === index ? "!bg-[#ff5252] !text-white" : ""
                      }`}
                    onClick={() => setProductActionIndex(index)}
                  >
                    {item}
                  </Button>
                )
              })
            }



          </div>
        </div>
      }

      {/* kích thước */}

      {
        props?.item?.size?.length !== 0 &&
        <div className="flex items-center gap-3">
          <span className="text-[16px]">Size :</span>
          <div className="flex items-center gap-1 actions">
            {
              props?.item?.size?.map((item, index) => {
                return (
                  <Button
                    className={`${productActionIndex === index ? "!bg-[#ff5252] !text-white" : ""
                      }`}
                    onClick={() => setProductActionIndex(index)}
                  >
                    {item}
                  </Button>
                )
              })
            }



          </div>
        </div>
      }
      {/* trọng lượng */}
      {
        props?.item?.productWeight?.length !== 0 &&
        <div className="flex items-center gap-3">
          <span className="text-[16px]">Trọng lượng :</span>
          <div className="flex items-center gap-1 actions">
            {
              props?.item?.productWeight?.map((item, index) => {
                return (
                  <Button
                    className={`${productActionIndex === index ? "!bg-[#ff5252] !text-white" : ""
                      }`}
                    onClick={() => setProductActionIndex(index)}
                  >
                    {item}
                  </Button>
                )
              })
            }



          </div>
        </div>
      }



      <p className="text-[14px] mt-5 mb-2 text-[#000]">
        Miễn phí vận chuyển ( Giao hàng dự kiến 2-3 ngày )
      </p>

      <div className="flex items-center gap-4 py-4">
        <div className="qtyBoxWrapper w-[70px]">
          <QtyBox />
        </div>

        <Button className="btn-org1 flex gap-2">
          {" "}
          <MdOutlineShoppingCart className="text-[22px]" /> Add to card{" "}
        </Button>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
          <FaRegHeart className="text-[18px]" />
          Add to Wishlist
        </span>

        <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
          <IoGitCompareSharp className="text-[18px]" />
          Add to Compare
        </span>
      </div>
    </>
  )
}

export default ProductDetailsComponent;
