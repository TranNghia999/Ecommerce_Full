import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import  Button  from '@mui/material/Button';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
// Phần làm bên server
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/api';

const ForgotPassword = () => {

    const [ isPasswordShow, setIsPasswordShow] = useState(false);
    const [ isPasswordShow2, setIsPasswordShow2] = useState(false);

      // Code kết nối server
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields ] = useState({
            email:localStorage.getItem("userEmail"), 
            newPassword:'',
            confirmPassword:''
        });
    
    const context = useContext(MyContext);
    const history = useNavigate();

    // Xác nhận mật khẩu
        const onChangeInput = (e) => {
            const { name, value } = e.target;
                setFormFields(() => {
                    return {
                    ...formFields,
                    [name]: value
                }
        })
    }

    // Xác thực
    const valideValue = Object.values(formFields).every(el => el)

         // Hàm kết nối API data
                const handleSubmit = (e) => {
                    e.preventDefault();
    
                if(formFields.newPassword==="") {
                    context.alertBox("error", "Nhập lại mật khẩu mới");
                        setIsLoading(false);
                    return false
                }
        
                if (formFields.confirmPassword==="") {
                    context.alertBox("error", "Nhập lại mật khẩu mới");
                        setIsLoading(false);
                    return false;
                }

                  if (formFields.confirmPassword !== formFields.newPassword) {
                context.alertBox("error", "Mật khẩu chưa trùng khớp");
                        setIsLoading(false);
                    return false;
                }

                // Đã thêm để nâng cao bảo mật
                const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
                    if (!strongPasswordRegex.test(formFields.newPassword)) {
                        context.alertBox("error", "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, thường, số và ký tự đặc biệt");
                        return false;
                    }
        
              setIsLoading(true);

            postData(`/api/user/reset-password`, formFields).then((res) => {
                console.log(res)
                if(res?.error === false){
                    localStorage.removeItem("userEmail")
                    localStorage.removeItem("actionType")
                    context.alertBox("success", res?.message);
                    setIsLoading(false);
                    history("/login")    
                }
                else {
                    context.alertBox("error", res?.message);
                }
            })
        }

  return (
    <section className='section py-10'>
            <div className='container'>
                <div className='card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10 '>
                    <h3 className='text-center text-[18px] text-black'>Forgot Password</h3>

                <form className='w-full mt-5' onSubmit={handleSubmit}>
                    <div className='form-group w-full mb-5 relative'>
                                      {/* Pass_Word 1 */}
                            <TextField  variant="outlined" className='w-full'
                                        type={isPasswordShow === false ? 'password' : 'text'} 
                                        id="Password" 
                                        label="New Password" 
                                        name='newPassword'
                                        onChange={onChangeInput} 
                                        value={formFields.newPassword} 
                                        disabled={isLoading===true ? true : false}
                                        />
                            <Button  className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black'
                                onClick={()=>{setIsPasswordShow(!isPasswordShow)}}>
                                {
                                isPasswordShow === false ? <IoMdEye className='text-[20px] opacity-75'/> :  <IoMdEyeOff className='text-[20px] opacity-75'/>
                                }
                            </Button>
                    </div>

                    <div className='form-group w-full mb-5 relative'>
                                    {/* Pass_Word 2 */}
                              <TextField variant="outlined" className='w-full'
                                        type={isPasswordShow2 === false ? 'password' : 'text'} 
                                        id="confirm_password" 
                                        label="Confirm Password *" 
                                        name='confirmPassword'
                                        onChange={onChangeInput} 
                                        value={formFields.confirmPassword} 
                                        disabled={isLoading===true ? true : false}
                                        />
                        <Button  className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black'
                                onClick={()=>{setIsPasswordShow2(!isPasswordShow2)}}>
                                {
                                    isPasswordShow2 === false ? <IoMdEye className='text-[20px] opacity-75'/> :
                                                              <IoMdEyeOff className='text-[20px] opacity-75'/>
                                }
                        </Button>
                    </div>
                            
                            <div className='flex items-center w-full mt-3 mb-3'>
                                <Button type='submit' disabled={!valideValue}
                                    className='btn-org btn-lg w-full flex gap-3'>
                                        {
                                        isLoading === true ? <CircularProgress color="inherit" /> : 'Change Password'
                                        }
                                </Button>
                            </div>
                           
                </form>
                </div>

            </div>      
    </section>
  )
}

export default ForgotPassword;
