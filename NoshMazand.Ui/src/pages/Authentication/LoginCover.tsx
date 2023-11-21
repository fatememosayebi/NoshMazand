import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import { login } from '../../store/appConfigSlice';
import { GiCutDiamond } from 'react-icons/gi'
import { useAlert, usePost } from '../../services.js'
import * as rdd from 'react-device-detect'
const LoginCover = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('ورود'));
    });
    const [userName, setUserName] = useState<string>()
    const [passWord, setPass] = useState<string>()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const alert = useAlert()
    const post = usePost()

    return (
        <div className="flex flex-row-reverse min-h-screen">
            <div className="login-back w-2/3 border-r  min-h-screen hidden lg:flex flex-col items-center justify-center text-white dark:text-black p-4">
                <div className="w-full mx-auto mb-5">
                    <GiCutDiamond className="text-9xl mx-auto text-white shadow-primary/60" />
                </div>
                <h3 className="text-4xl font-extralight mb-4 text-white text-center">نوش مازندران</h3>
            </div>

            <div className="w-full lg:w-1/3 relative flex justify-center items-center">
                <div className="max-w-[480px] p-5 md:p-10">
                    <h2 className="font-extralight text-3xl mb-3">ورود</h2>
                    <p className="mb-7">برای ورود به سامانه لطفا نام کاربری و رمز عبور را وارد کنید</p>
                    <div className="space-y-5" >
                        <div>
                            <label htmlFor="userName">نام کاربری</label>
                            <input id="userName" type="text" className="form-input" placeholder=""
                                value={userName} onChange={e => setUserName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password">رمز عبور</label>
                            <input id="password" type="password" className="form-input" placeholder=""
                                value={passWord} onChange={e => setPass(e.target.value)} />
                        </div>
                        <div>
                            <label className="cursor-pointer">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="text-white-dark">مرا به خاطر بسپار</span>
                            </label>
                        </div>
                        <button disabled={loading} type="submit" className="btn btn-primary w-full" onClick={e => {
                            e.preventDefault()
                            setLoading(true);
                            post('auth/login', { userName, passWord })
                            .then((x: object) => {
                                debugger
                                console.log('v2', x)
                                dispatch(login(x));
                                navigate('/')
                            }).finally(() => {
                                setLoading(false)
                            })

                        }}>
                            {loading ?
                                <>
                                    <span className="animate-ping w-3 h-3 ltr:mr-4 rtl:ml-4 inline-block rounded-full bg-white"></span>
                                    لطفا منتظر بمانید
                                </>
                                :
                                <span>ورود</span>
                            }
                        </button>
                    </div>
                    <div className="relative my-7 h-5 text-center text-xs before:w-full before:h-[1px] before:absolute before:inset-0 before:m-auto before:bg-[#ebedf2]  dark:before:bg-[#253b5c]">
                        <div className="font-light text-white-dark bg-[#fafafa] dark:bg-[#060818] px-2 relative z-[1] inline-block">
                            <span>نسخه 0.0.6</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginCover;
