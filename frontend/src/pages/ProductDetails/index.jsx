import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import ProductZoom from "../../components/ProductZoom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import ProductsSlider from '../../components/ProductsSlider';
import TextField from '@mui/material/TextField';
import ProductDetailsComponent from "../../components/ProductDetails";

import CircularProgress from '@mui/material/CircularProgress';
import { fetchDataFromApi } from "../../utils/api";

const ProductDetails = (props) => {

    // nút đánh giá
    const [activeTab, setActiveTab] = useState(0)



    const [isLoading, setIsLoading] = useState(false)
    const [productData, setProductData] = useState();
    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true)
        fetchDataFromApi(`/api/product/${id}`).then((res) => {
            if (res?.error === false) {
                setProductData(res?.product);
                setIsLoading(false)
            }
        })
    }, [id])

    return (
        <>
            <div className="py-5 ">
                <div className="container">

                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                            to="/"
                            className="link transition !text-[14px]" > {" "} Home{" "}
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            to="/"
                            className="link transition !text-[14px]" > {" "} Fashion{" "}
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            className="link transition !text-[14px]"> {" "} Cropped Satin Bomber Jacket{" "}
                        </Link>
                    </Breadcrumbs>
                </div>

            </div>

            <section className="bg-white py-5">
            {
                
            }

                <div className="flex items-center justify-center">
                    <CircularProgress />
                </div>

                <div className="container flex gap-8 items-center">
                    <div className="productZoomContainer w-[40%] ">
                        <ProductZoom images={productData?.images} />
                    </div>

                    <div className="productContent w-[60%] pr-10 pl-10">

                        <ProductDetailsComponent item={productData} />
                    </div>
                </div>

                <div className="container pt-10">
                    <div className="flex items-center gap-8">
                        <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab == 0 && 'text-primary'}`}
                            onClick={() => setActiveTab(0)}> Description
                        </span>
                        <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab == 1 && 'text-primary'}`}
                            onClick={() => setActiveTab(1)}>Product Details
                        </span>
                        <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab == 2 && 'text-primary'}`}
                            onClick={() => setActiveTab(2)}> Reviews (10)
                        </span>
                    </div>
                    {/* Thông tin sản phẩm */}
                    {
                        activeTab === 0 && (
                            <div className="shadow-md w-full py-5 px-8 rounded-md">
                                <p>
                                    Contrary to popular belief, Lorem Ipsum is not simply random text.
                                    It has roots in a piece of classical Latin literature from 45 BC,
                                    making it over 2000 years old. Richard McClintock. as opposed to
                                    using 'Content here, content here', making it look like readable
                                    English. Many desktop publishing packages and web page editors now
                                    use Lorem Ipsum as their default model
                                </p>
                                <h4>Regular Fit Spread Collar</h4>
                                <p>
                                    There are many variations of passages of Lorem Ipsum available,
                                    but the majority have suffered alteration in some form, by
                                    injected humour, or randomised words which don't look even
                                    slightly believable.
                                </p>
                                <h4>Free Shipping (Est. Delivery Time 2-3 Days)</h4>
                                <p>
                                    It is a long established fact that a reader will be distracted by
                                    the readable content of a page when looking at its layout.
                                </p>
                                <h4>Men Opaque Casual Shirt</h4>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text
                                    ever since the 1500s
                                </p>
                                <h4>Striped Casual Shirt</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                    nulla pariatur.{" "}
                                </p>
                            </div>
                        )}
                    {/* Thông tin chi tiết */}
                    {
                        activeTab === 1 && (
                            <div className="shadow-md w-full py-5 px-8 rounded-md">
                                <div class="relative overflow-x-auto">
                                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">
                                                    Stand Up
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Folded (w/o wheels)
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Folded (w/ wheels)
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Door Pass Through
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 font-[500]">
                                                <td class="px-6 py-4 font-[500]"> 35″L x 24″W x 37-45″H(front to back wheel) </td>
                                                <td class="px-6 py-4 font-[500]"> 32.5″L x 18.5″W x 16.5″H  </td>
                                                <td class="px-6 py-4 font-[500]"> 32.5″L x 24″W x 18.5″H </td>
                                                <td class="px-6 py-4 font-[500]"> 24</td>
                                            </tr>

                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 font-[500]">
                                                <td class="px-6 py-4 font-[500]"> 35″L x 24″W x 37-45″H(front to back wheel) </td>
                                                <td class="px-6 py-4 font-[500]"> 32.5″L x 18.5″W x 16.5″H  </td>
                                                <td class="px-6 py-4 font-[500]"> 32.5″L x 24″W x 18.5″H </td>
                                                <td class="px-6 py-4 font-[500]"> 24</td>
                                            </tr>

                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 font-[500]">
                                                <td class="px-6 py-4 font-[500]"> 35″L x 24″W x 37-45″H(front to back wheel) </td>
                                                <td class="px-6 py-4 font-[500]"> 32.5″L x 18.5″W x 16.5″H  </td>
                                                <td class="px-6 py-4 font-[500]"> 32.5″L x 24″W x 18.5″H </td>
                                                <td class="px-6 py-4 font-[500]"> 24</td>
                                            </tr>

                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 font-[500]">
                                                <td class="px-6 py-4 font-[500]"> 35″L x 24″W x 37-45″H(front to back wheel) </td>
                                                <td class="px-6 py-4 font-[500]"> 32.5″L x 18.5″W x 16.5″H  </td>
                                                <td class="px-6 py-4 font-[500]"> 32.5″L x 24″W x 18.5″H </td>
                                                <td class="px-6 py-4 font-[500]"> 24</td>
                                            </tr>

                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 font-[500]">
                                                <td class="px-6 py-4 font-[500]"> 35″L x 24″W x 37-45″H(front to back wheel) </td>
                                                <td class="px-6 py-4 font-[500]"> 32.5″L x 18.5″W x 16.5″H  </td>
                                                <td class="px-6 py-4 font-[500]"> 32.5″L x 24″W x 18.5″H </td>
                                                <td class="px-6 py-4 font-[500]"> 24</td>
                                            </tr>

                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 font-[500]">
                                                <td class="px-6 py-4 font-[500]"> 35″L x 24″W x 37-45″H(front to back wheel) </td>
                                                <td class="px-6 py-4 font-[500]"> 32.5″L x 18.5″W x 16.5″H  </td>
                                                <td class="px-6 py-4 font-[500]"> 32.5″L x 24″W x 18.5″H </td>
                                                <td class="px-6 py-4 font-[500]"> 24</td>
                                            </tr>

                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 font-[500]">
                                                <td class="px-6 py-4 font-[500]"> 35″L x 24″W x 37-45″H(front to back wheel) </td>
                                                <td class="px-6 py-4 font-[500]"> 32.5″L x 18.5″W x 16.5″H  </td>
                                                <td class="px-6 py-4 font-[500]"> 32.5″L x 24″W x 18.5″H </td>
                                                <td class="px-6 py-4 font-[500]"> 24</td>
                                            </tr>





                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                    {
                        activeTab === 2 && (
                            <div className="shadow-md w-[80%] py-5 px-8 rounded-md">
                                <div className="w-full productReviewsContainer">
                                    <h2 className="text-[18px]">Customer questions & answers</h2>

                                    <div className="reviewScroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-5 pr-5">
                                        <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                                            <div className="info w-[60%] flex items-center gap-3">
                                                {/* Ảnh của người dùng khi đánh giá */}
                                                <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                                                    <img src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/473657Xhj/tiem-anh-thang-ba-1149327.jpg"
                                                        className="w-full" />
                                                </div>
                                                {/* thông tin tên, ngày tháng của người đánh giá */}
                                                <div className="w-[80%]">
                                                    <h4 className="text-[16px]">Nguyễn Thị Mai</h4>
                                                    <h5 className="text-[13px] mb-0">2025-04-19</h5>
                                                    <p className="mt-0 mb-0">
                                                        Content here, content here',
                                                        making it look like readable English. Many desktop publishing
                                                        packages and web page editors now use Lorem Ipsum as their default model text,
                                                        and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                                                    </p>
                                                </div>
                                            </div>

                                            <Rating name="size-small" defaultValue={4} readOnly />

                                        </div>

                                        <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                                            <div className="info w-[60%] flex items-center gap-3">
                                                {/* Ảnh của người dùng khi đánh giá */}
                                                <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                                                    <img src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/473657Xhj/tiem-anh-thang-ba-1149327.jpg"
                                                        className="w-full" />
                                                </div>
                                                {/* thông tin tên, ngày tháng của người đánh giá */}
                                                <div className="w-[80%]">
                                                    <h4 className="text-[16px]">Nguyễn Thị Mai</h4>
                                                    <h5 className="text-[13px] mb-0">2025-04-19</h5>
                                                    <p className="mt-0 mb-0">
                                                        Content here, content here',
                                                        making it look like readable English. Many desktop publishing
                                                        packages and web page editors now use Lorem Ipsum as their default model text,
                                                        and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                                                    </p>
                                                </div>
                                            </div>

                                            <Rating name="size-small" defaultValue={4} readOnly />

                                        </div>

                                        <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                                            <div className="info w-[60%] flex items-center gap-3">
                                                {/* Ảnh của người dùng khi đánh giá */}
                                                <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                                                    <img src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/473657Xhj/tiem-anh-thang-ba-1149327.jpg"
                                                        className="w-full" />
                                                </div>
                                                {/* thông tin tên, ngày tháng của người đánh giá */}
                                                <div className="w-[80%]">
                                                    <h4 className="text-[16px]">Nguyễn Thị Mai</h4>
                                                    <h5 className="text-[13px] mb-0">2025-04-19</h5>
                                                    <p className="mt-0 mb-0">
                                                        Content here, content here',
                                                        making it look like readable English. Many desktop publishing
                                                        packages and web page editors now use Lorem Ipsum as their default model text,
                                                        and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                                                    </p>
                                                </div>
                                            </div>

                                            <Rating name="size-small" defaultValue={4} readOnly />

                                        </div>

                                        <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                                            <div className="info w-[60%] flex items-center gap-3">
                                                {/* Ảnh của người dùng khi đánh giá */}
                                                <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                                                    <img src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/473657Xhj/tiem-anh-thang-ba-1149327.jpg"
                                                        className="w-full" />
                                                </div>
                                                {/* thông tin tên, ngày tháng của người đánh giá */}
                                                <div className="w-[80%]">
                                                    <h4 className="text-[16px]">Nguyễn Thị Mai</h4>
                                                    <h5 className="text-[13px] mb-0">2025-04-19</h5>
                                                    <p className="mt-0 mb-0">
                                                        Content here, content here',
                                                        making it look like readable English. Many desktop publishing
                                                        packages and web page editors now use Lorem Ipsum as their default model text,
                                                        and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                                                    </p>
                                                </div>
                                            </div>

                                            <Rating name="size-small" defaultValue={4} readOnly />

                                        </div>



                                    </div>


                                    <br />
                                    {/* Bảng đánh giá của người dùng */}
                                    <div className="reviewForm bg-[#f1f1f1] p-4 rounded-md">
                                        <h2 className="text-[18px]">Add a review</h2>

                                        <form className="w-full mt-5 ">
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label="Write a Review"
                                                multiline
                                                rows={5}
                                                className="w-full " />

                                            <br /><br />

                                            <Rating name="size-small" defaultValue={4} />

                                            <div className="flex items-center mt-5">
                                                <Button className="btn-org">Submit Review</Button>
                                            </div>
                                        </form>
                                    </div>




                                </div>
                            </div>
                        )}
                </div>


                <div className="container pt-8">
                    <h2 className='text-[20px] font-[600] pb-0'>RELATED Products </h2>
                    <ProductsSlider item={6} />

                </div>

            </section>
        </>
    );
};

export default ProductDetails;
