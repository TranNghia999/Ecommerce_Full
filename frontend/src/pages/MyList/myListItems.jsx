import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import Rating from '@mui/material/Rating';
import  Button  from '@mui/material/Button';

const MyListItems = (props) => {


  return (
       <div className='cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]'>
                        <div className='img w-[15%] rounded-md overflow-hidden'>
                            <Link to='/product/9857' className='group'>
                                <img src='https://serviceapi.spicezgold.com/download/1742443661874_jiobook-11-2023-ultimate-learning-partner-nb1112mm-blu-4g-lte-mediatek-2-0-ghz-octa-core-4-gb-lpddr4-64-gb-emmc-jioos-expandable-256-gb-29-46-cm-11-6-inch-digital-o491894913-p609664147-0-202408281600.webp' 
                                     className='w-full group-hover:scale-105 transition-all'/>
                            </Link>
                        </div>
                            <div className='info w-[85%] relative'>
                                <IoCloseSharp className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all'/>
                                <span className='text-[13px]'>Sangria</span>
                                <h3 className='text-[15px]'><Link className='link'>Mediatek 8788 (JioOS)/Octa-core/4GB RAM/64 eMMC Storage/Thin and Light Laptop (11.6 inch, 990 grams)/Dual band WiFi + SIM/Blue</Link></h3>
                                     <Rating name="size-small" defaultValue={3} size="small" readOnly  />
                                
                                <div className='flex items-center gap-4 mt-2 mb-2'>
                                    <span className='price  font-[600] text-[14px]'>$58.00</span>
                                    <span className='oldPrice line-through font-[500] text-gray-500 text-[14px]'>$58.00</span>
                                     <span className='price text-primary  font-[600] text-[14px]'>55% OFF</span>
                                </div>

                                <Button className='btn-org btn-sml'>Add to Cart</Button>
                          </div>

                    </div>
  )
}

export default MyListItems;
