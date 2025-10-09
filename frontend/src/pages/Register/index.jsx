import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
// Các Hàm Sử Dụng với Server
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';
import { useNavigate } from "react-router-dom";


// Của ĐK bằng Tài Khoản Google
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from '../../firebase';
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Register = () => {

    // Ẩn hiện mật khẩu
    const [isPasswordShow, setIsPasswordShow] = useState(false)
    // lấy từ server => user.model.js
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        password: ""
    })

    const context = useContext(MyContext)
    const history = useNavigate();

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(formFields).every(el => el)

    // Hàm kết nối API data
    const handleSubmit = (e) => {
        e.preventDefault();



        if (formFields.name === "") {
            context.alertBox("error", "Vui lòng nhập tên đầy đủ");
            return false
        }
        if (formFields.email === "") {
            context.alertBox("error", "Vui lòng nhập id email");
            return false
        }

        // Đã Thêm Mật khẩu nâng cao tại đây
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!strongPasswordRegex.test(formFields.password)) {
            context.alertBox(
                "error",
                "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
            );
            return false;
        }

        setIsLoading(true);

        postData("/api/user/register", formFields).then((res) => {

            if (res?.error !== true) {
                setIsLoading(false);
                context.alertBox("success", res?.message);
                localStorage.setItem("userEmail", formFields.email)
                setFormFields({
                    name: "",
                    email: "",
                    password: ""
                })

                history("/verify")
            } else {
                context.alertBox("error", res?.message);
                setIsLoading(false);
            }
        })
    }

    // Của ĐK tài khoản Google

    const authwithGoogle = () => {

        signInWithPopup(auth, googleProvider)
            .then((result) => {

                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                // phần user.model
                const fields = {
                    name: user.providerData[0].displayName,
                    email: user.providerData[0].email,
                    password: null,
                    avatar: user.providerData[0].photoURL,
                    mobile: user.providerData[0].phoneNumber,
                    role: "USER"
                };

                postData("/api/user/authWithGoogle", fields).then((res) => {

                    if (res?.error !== true) {
                        setIsLoading(false);
                        context.alertBox("success", res?.message);
                        localStorage.setItem("userEmail", fields.email)

                        localStorage.setItem("accessToken", res?.data?.accessToken);
                        localStorage.setItem("refreshToken", res?.data?.refreshToken);

                         // 🔥 Cập nhật lại context.userData
                        context.setUserData(res?.data?.user);

                        context.setIsLogin(true);

                        history("/")
                    } else {
                        context.alertBox("error", res?.message);
                        setIsLoading(false);
                    }
                })

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });

    }


    return (
        <section className='section py-10'>
            <div className='container'>
                <div className='card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10 '>
                    <h3 className='text-center text-[18px] text-black '>Đăng ký tài khoản mới</h3>
                    <form className='w-full mt-5' onSubmit={handleSubmit}>

                        <div className='form-group w-full mb-5'>
                            <TextField type='text' id="name" name='name' label="Họ và Tên" variant="outlined"
                                className='w-full' onChange={onChangeInput} value={formFields.name} disabled={isLoading === true ? true : false} />
                        </div>

                        <div className='form-group w-full mb-5'>
                            <TextField type='email' id="email" name='email' label="Email" variant="outlined"
                                className='w-full' onChange={onChangeInput} value={formFields.email} disabled={isLoading === true ? true : false} />
                        </div>

                        <div className='form-group w-full mb-5 relative'>
                            <TextField type={isPasswordShow === false ? 'password' : 'text'} id="password" name='password' label="Mật khẩu *" variant="outlined"
                                className='w-full' onChange={onChangeInput} value={formFields.password} disabled={isLoading === true ? true : false} />
                            <Button className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black'
                                onClick={() => { setIsPasswordShow(!isPasswordShow) }}>
                                {
                                    isPasswordShow === false ? <IoMdEye className='text-[20px] opacity-75' /> :
                                        <IoMdEyeOff className='text-[20px] opacity-75' />
                                }
                            </Button>
                        </div>
                        <div className='flex items-center w-full mt-3 mb-3'>
                            <Button type='submit' disabled={!valideValue}
                                className='btn-org1 btn-lg w-full flex gap-3'>
                                {
                                    isLoading === true ? <CircularProgress color="inherit" /> : 'ĐĂNG KÝ'
                                }
                            </Button>
                        </div>
                        <p className='text-center'>Bạn đã có tài khoản? &nbsp;
                            <Link className='link text-[14px] font-[600] text-primary ' to='/login'>Đăng nhập</Link>
                        </p>

                        <p className='text-center font-[500]'>Hoặc đăng ký bằng tài khoản xã hội</p>

                        <Button className='flex gap-3 w-full !bg-[#f1f1f1] !text-black'
                            onClick={authwithGoogle}>
                            <FcGoogle className='text-[20px]' /> ĐĂNG KÝ VỚI GOOGLE
                        </Button>

                    </form>
                </div>

            </div>
        </section>
    )
}

export default Register;
