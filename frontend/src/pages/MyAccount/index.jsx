import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import AccountSidebar from '../../components/AccountSidebar';
// Kết Nối API Server tại đây
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { editData, postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { Collapse } from 'react-collapse';
// Thêm định danh số đt
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';


const MyAccount = () => {

    // code kết nối API server và FE

    // code định danh số điện thoại
    const [phone, setPhone] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    // Đặt lại mật khẩu
    const [isLoading2, setIsLoading2] = useState(false);

    const [isChangePasswordFormShow, setIsChangePasswordFormShow] = useState(false);

    const [userId, setUserId] = useState("");
    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        mobile: ''
    });

    const [changePassword, setChangePassword] = useState({
        email: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const context = useContext(MyContext)
    const history = useNavigate();

    const onChangeInput = (e) => {
        const { name, value } = e.target;

        if (["oldPassword", "newPassword", "confirmPassword"].includes(name)) {
            setChangePassword(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setFormFields(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const valideValue = Object.values(formFields).every(el => el)

    // Hàm kết nối API data
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formFields.name === "") {
            context.alertBox("error", "Vui lòng nhập tên ");
            return false
        }

        if (formFields.email === "") {
            context.alertBox("error", "Vui lòng nhập email của bạn");
            return false;
        }

        if (formFields.mobile === "") {
            context.alertBox("error", "Vui lòng nhập số điện thoại của bạn");
            return false;
        }

        setIsLoading(true);

        // ✅ Làm sạch số điện thoại
        const cleanedPhone = phone
            .replace(/^(\+84|84)0/, '+84') // +840xxxx → +84xxxx
            .replace(/^0/, '+84');         // 0xxxx → +84xxxx

        // ✅ Cập nhật lại vào formFields (không đổi biến gốc)
        formFields.mobile = cleanedPhone;

        editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then((res) => {
            console.log(res)

            if (res?.error !== true) {
                setIsLoading(false);
                context.alertBox("success", res?.data?.message);



            } else {
                context.alertBox("error", res?.data?.message);
                setIsLoading(false);
            }
        })
    }

    const valideValue2 = Object.values(changePassword).every(el => el)

    // Hàm kết nối API data
    const handleSubmitChangePassword = (e) => {
        e.preventDefault();

        if (changePassword.oldPassword === "") {
            context.alertBox("error", "Nhập mật khẩu hiện tại");
            return false
        }

        if (changePassword.newPassword === "") {
            context.alertBox("error", "Nhập mật khẩu mới");
            return false;
        }

        if (changePassword.confirmPassword === "") {
            context.alertBox("error", "Nhập lại mật khẩu mới");
            return false;
        }

        if (changePassword.confirmPassword !== changePassword.newPassword) {
            context.alertBox("error", "Mật khẩu chưa trùng khớp");
            return false;
        }

        setIsLoading2(true);

        postData(`/api/user/reset-password`, changePassword, { withCredentials: true }).then((res) => {
            console.log(res)

            if (res?.error !== true) {
                setIsLoading2(false);
                context.alertBox("success", res?.message);



            } else {
                context.alertBox("error", res?.message);
                setIsLoading2(false);
            }
        })
    }


    useEffect(() => {
        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
            setUserId(context?.userData?._id);

            const rawPhone = String(context.userData.mobile || '');
            // Nếu bắt đầu bằng '0', thay bằng +84 (hoặc giữ nguyên nếu đã có mã quốc tế)
            const formattedPhone = rawPhone.startsWith('0')
                ? '+84' + rawPhone.slice(1)
                : rawPhone;

            setFormFields({
                name: context.userData.name,
                email: context.userData.email,
                mobile: formattedPhone
            });

            setPhone(formattedPhone);

            setChangePassword({
                email: context?.userData?.email

            })
        }

    }, [context?.userData])

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token === null) {
            history("/");
        }
    }, [context?.isLogin])


    return (
        <section className='py-10 w-full'>
            <div className='container flex gap-5'>
                <div className='col1 w-[20%]'>

                    <AccountSidebar />
                </div>

                <div className='col2 w-[50%]'>
                    <div className='card bg-white p-5 shadow-md rounded-md mb-5'>
                        <div className="flex items-center pb-3">
                            <h2 className="pb-0">Thông tin cá nhân</h2>
                            <Button className='!ml-auto'
                                onClick={() => setIsChangePasswordFormShow(!isChangePasswordFormShow)}>
                                Thay đổi mật khẩu
                            </Button>
                        </div>

                        <hr />

                        <form className='mt-8' onSubmit={handleSubmit}>
                            <div className='flex items-center gap-5'>
                                <div className='w-[50%]'>
                                    <TextField label="Full Name" variant="outlined" size='small' className='w-full'
                                        name='name'
                                        onChange={onChangeInput}
                                        value={formFields.name}
                                        disabled={isLoading === true ? true : false}
                                    />
                                </div>

                                <div className='w-[50%]'>
                                    <TextField variant="outlined" size='small' className='w-full'
                                        type='email'
                                        name='email'
                                        onChange={onChangeInput}
                                        value={formFields.email}
                                        disabled={true}
                                    />
                                </div>

                            </div>

                            <div className='flex items-center mt-4 gap-5'>
                                <div className='w-[50%]'>
                                    {/* Sử dụng định danh số điện thoại */}
                                    <PhoneInput
                                        defaultCountry="vn"
                                        value={phone}
                                        disabled={isLoading}
                                        onChange={(phone) => {
                                            setPhone(phone);
                                            setFormFields((prev) => ({
                                                ...prev,
                                                mobile: phone
                                            }));
                                        }}
                                        // ✅ Không cho người dùng xóa mã quốc gia bằng bàn phím
                                        forceDialCode={true}
                                        disableDialCodePrefill={false}
                                    />
                                </div>
                            </div>

                            <br />

                            <div className='flex items-center gap-4'>
                                <Button type='submit' 
                                    className='btn-org1 btn-sm w-[170px]'>
                                    {
                                        isLoading === true ? <CircularProgress color="inherit" /> : 'Cập nhật hồ sơ'
                                    }
                                </Button>
                            </div>

                        </form>
                    </div>

                    <Collapse isOpened={isChangePasswordFormShow}>

                        <div className='card bg-white p-5 shadow-md rounded-md'>
                            <div className="flex items-center pb-3">
                                <h2 className="pb-0">Đổi mật khẩu</h2>
                            </div>
                            <hr />

                            <form className='mt-8' onSubmit={handleSubmitChangePassword}>
                                <div className='grid grid-cols-2 gap-5'>

                                    {
                                        context?.userData?.signUpWithGoogle === false &&
                                        <div className='col'>
                                            <TextField label="Nhập mật khẩu hiện tại" variant="outlined" size='small' className='w-full'
                                                name='oldPassword'
                                                onChange={onChangeInput}
                                                value={changePassword.oldPassword}
                                                disabled={isLoading2 === true ? true : false}
                                            />
                                        </div>
                                    }

                                    <div className='col'>
                                        <TextField label="Nhập mật khẩu mới" variant="outlined" size='small' className='w-full'
                                            type='text'
                                            name='newPassword'
                                            onChange={onChangeInput}
                                            value={changePassword.newPassword}
                                        />
                                    </div>

                                    <div className='col'>
                                        <TextField label="Nhập lại mật khẩu" variant="outlined" size='small' className='w-full'
                                            name='confirmPassword'
                                            onChange={onChangeInput}
                                            value={changePassword.confirmPassword}
                                        />
                                    </div>

                                </div>

                                <br />

                                <div className='flex items-center gap-4'>
                                    <Button type='submit' disabled={!valideValue2}
                                        className='btn-org1 btn-sm w-[200px]'>
                                        {
                                            isLoading2 === true ? <CircularProgress color="inherit" /> : 'Cập nhật mật khẩu'
                                        }
                                    </Button>
                                </div>

                            </form>


                        </div>

                    </Collapse>




                </div>
            </div>
        </section>
    )
}

export default MyAccount;
