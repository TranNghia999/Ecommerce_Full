import React from 'react'
import TextField from '@mui/material/TextField';
import  Button  from '@mui/material/Button';
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = () => {
  return (
    <section className='py-10'>
        {/* trang bên trái */}
        <div className='container flex gap-5'>
            <div className='leftCol w-[70%]'>
                <div className='cart bg-white shadow-md p-5 rounded-md w-full'>
                    <h1>Billing Details</h1>
                        <form className='w-full mt-5'>
                            <div className='flex items-center gap-5 pb-5'>
                                <div className='col w-[50%]'>
                                     <TextField size='small' label="Full Name" variant="outlined" className='w-full'/>
                                </div>

                                <div className='col w-[50%]'>
                                     <TextField type='email' size='small' label="Email" variant="outlined" className='w-full'/>
                                </div>
                            </div>
                                <h6 className='text-[14px] font-[500] mb-3'>Street address *</h6>
                                <div className='flex items-center gap-5 pb-5'>
                                    <div className='col w-[100%]'>
                                        <TextField size='small' label="House No and Streed Name" variant="outlined" className='w-full'/>
                                    </div>
                                </div>

                                <div className='flex items-center gap-5 pb-5'>
                                    <div className='col w-[100%]'>
                                        <TextField size='small' label="Apartment, suite, unit, etc. (optional)" variant="outlined" className='w-full'/>
                                    </div>
                                </div>

                                <div className='flex items-center gap-5 pb-5'>
                                    <div className='col w-[50%]'>
                                        <TextField size='small' label="Town / City" variant="outlined" className='w-full'/>
                                    </div>

                                    <div className='col w-[50%]'>
                                        <TextField type='text' size='small' label="State / County" variant="outlined" className='w-full'/>
                                    </div>
                                </div>
                                 <h6 className='text-[14px] font-[500] mb-3'>Postcode / ZIP *</h6>
                                  <div className='flex items-center gap-5 pb-5'>
                                    <div className='col w-[100%]'>
                                        <TextField size='small' label="Zip Code" variant="outlined" className='w-full'/>
                                    </div>
                                </div>

                                 <div className='flex items-center gap-5 pb-5'>
                                    <div className='col w-[50%]'>
                                        <TextField size='small' label="Phone Number" variant="outlined" className='w-full'/>
                                    </div>

                                    <div className='col w-[50%]'>
                                        <TextField type='text' size='small' label="Email Address" variant="outlined" className='w-full'/>
                                    </div>
                                </div>
                           
                        </form>
                    
                </div>
            </div>
        {/* trang bên phải */}

        <div className='rightCol w-[30%]'>
            <div className='card shadow-md bg-white p-5 rounded-md'>
                <h2 className='mb-4'>Your Order</h2>

                <div className='flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)]'>
                    <span className='text-[14px] font-[600]'>Product</span>
                    <span className='text-[14px] font-[600]'>Subtotal</span>
                </div>

                <div className='scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2 mb-5'>
                    <div className='flex items-center justify-between py-2'>
                        <div className='part1 flex items-center gap-3'>
                            <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                                <img src='https://api.spicezgold.com/download/file_1734526033421_hp-15s-fr5012tu-standard-laptop-intel-core-i3-1215u-8-gb-512-gb-ssd-intel-uhd-graphics-windows-11-home-mso-fhd-39-6cm-15-6-inch-digital-o494421633-p609466420-1-202407041151.webp' 
                                className='w-full transition-all group-hover:scale-105'/>
                            </div>

                            <div className='info'>
                                <h4 className='text-[14px]'>/Windows 11/MSO/FHD), 39... </h4>
                                <span className='text-[13px]'>Qty : 1 </span>

                            </div>

                        </div>

                        <span className='text-[14px] font-[500]'>$100</span>
                    </div>
                    
                    <div className='flex items-center justify-between py-2'>
                        <div className='part1 flex items-center gap-3'>
                            <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                                <img src='https://api.spicezgold.com/download/file_1734526033421_hp-15s-fr5012tu-standard-laptop-intel-core-i3-1215u-8-gb-512-gb-ssd-intel-uhd-graphics-windows-11-home-mso-fhd-39-6cm-15-6-inch-digital-o494421633-p609466420-1-202407041151.webp' 
                                className='w-full transition-all group-hover:scale-105'/>
                            </div>

                            <div className='info'>
                                <h4 className='text-[14px]'>/Windows 11/MSO/FHD), 39... </h4>
                                <span className='text-[13px]'>Qty : 1 </span>

                            </div>

                        </div>

                        <span className='text-[14px] font-[500]'>$100</span>
                    </div>

                    <div className='flex items-center justify-between py-2'>
                        <div className='part1 flex items-center gap-3'>
                            <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                                <img src='https://api.spicezgold.com/download/file_1734526033421_hp-15s-fr5012tu-standard-laptop-intel-core-i3-1215u-8-gb-512-gb-ssd-intel-uhd-graphics-windows-11-home-mso-fhd-39-6cm-15-6-inch-digital-o494421633-p609466420-1-202407041151.webp' 
                                className='w-full transition-all group-hover:scale-105'/>
                            </div>

                            <div className='info'>
                                <h4 className='text-[14px]'>/Windows 11/MSO/FHD), 39... </h4>
                                <span className='text-[13px]'>Qty : 1 </span>

                            </div>

                        </div>

                        <span className='text-[14px] font-[500]'>$100</span>
                    </div>

                    <div className='flex items-center justify-between py-2'>
                        <div className='part1 flex items-center gap-3'>
                            <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                                <img src='https://api.spicezgold.com/download/file_1734526033421_hp-15s-fr5012tu-standard-laptop-intel-core-i3-1215u-8-gb-512-gb-ssd-intel-uhd-graphics-windows-11-home-mso-fhd-39-6cm-15-6-inch-digital-o494421633-p609466420-1-202407041151.webp' 
                                className='w-full transition-all group-hover:scale-105'/>
                            </div>

                            <div className='info'>
                                <h4 className='text-[14px]'>/Windows 11/MSO/FHD), 39... </h4>
                                <span className='text-[13px]'>Qty : 1 </span>

                            </div>

                        </div>

                        <span className='text-[14px] font-[500]'>$100</span>
                    </div>

                    <div className='flex items-center justify-between py-2'>
                        <div className='part1 flex items-center gap-3'>
                            <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                                <img src='https://api.spicezgold.com/download/file_1734526033421_hp-15s-fr5012tu-standard-laptop-intel-core-i3-1215u-8-gb-512-gb-ssd-intel-uhd-graphics-windows-11-home-mso-fhd-39-6cm-15-6-inch-digital-o494421633-p609466420-1-202407041151.webp' 
                                className='w-full transition-all group-hover:scale-105'/>
                            </div>

                            <div className='info'>
                                <h4 className='text-[14px]'>/Windows 11/MSO/FHD), 39... </h4>
                                <span className='text-[13px]'>Qty : 1 </span>

                            </div>

                        </div>

                        <span className='text-[14px] font-[500]'>$100</span>
                    </div>
                </div>


                    <Button className='btn-org btn-lg w-full flex gap-2 items-center'>
                        <BsFillBagCheckFill className='text-[20px]'/>Checkout</Button>
            </div>

        </div>
        </div>
    </section>
  )
}

export default Checkout;
