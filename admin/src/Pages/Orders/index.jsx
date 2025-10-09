import React, { useState } from 'react'
import Button from "@mui/material/Button";
import Badge from "../../components/Badge";

// Icon
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import SearchBox from '../../Components/SearchBox';

const Orders = () => {

      const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);

        const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };

  return (
    <div className="card my-4 shadow-md sm:rounded-lg bg-white">
            <div className="flex items-center justify-between px-5 py-5">
              <h2 className="text-[18px] font-[600]">Recent Orders</h2>

              <div className='w-[40%]'>
                <SearchBox />
              </div>
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
  )
}

export default Orders;
