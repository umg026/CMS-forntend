import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { pb } from '../../Pocketbase/pocketbase'
import { useDispatch } from 'react-redux'
import { login } from './redux/userSlicer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/login.css';


function Login() {
    const redirect = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setError] = useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch();

    const storeLoginData = () => {
        const loginData = {
            email,
            loginTime: new Date().getTime()
        };
        localStorage.setItem('loginData', JSON.stringify(loginData));
    };
    const removeLoginData = () => {
        localStorage.clear()
    }

    function validation() {
        let isValid = true;
        const newErrors = {};
        if (!email) {
            isValid = false;
            newErrors.email = 'Please enter email';
        }
        if (!password) {
            isValid = false;
            newErrors.password = 'Please enter password';
        }

        setError(newErrors);
        return isValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("from submit")
        if (validation()) {
            try {
                const authData = await pb.collection('users').authWithPassword(
                    email, password,
                );

                if (!authData) {
                    return;
                }
                const record_id = authData.record.id;
                const new_record = await pb.collection('user_view').getOne(`${record_id}`, {
                    expand: 'permission_id,roleid'
                });

                if (new_record.is_deleted == false && (new_record.role_type == "admin" || new_record.role_type == "content_author")) {
                    dispatch(login({ email, password }));
                    localStorage.setItem("userData", JSON.stringify(new_record))
                    storeLoginData()
                    toast.success("Welcome")
                    redirect("/")
                }
                else {
                    toast.error("Login Failed ! You are deleted")
                    redirect("/login")
                    localStorage.clear()
                    return
                }

            }
            catch (error) {

                if (error.message === "Failed to authenticate.") {
                    toast.error("Email or Password is incorrect!")
                }
                toast.error(`${error.message}`)
                console.log(error);
            }
        }

    }


    useEffect(() => {
        const loginData = JSON.parse(localStorage.getItem('loginData'));
        if (loginData) {

            const getCurrentTime = new Date().getTime()
            const { loginTime } = loginData;
            const twentyFourHours = 24 * 60 * 60 * 1000;
            if (getCurrentTime - loginTime >= twentyFourHours) {
                removeLoginData()
            }
            else {
                redirect("/")
            }
        }
    }, [])

    return (
        <>
            <ToastContainer />

            <div className="login-body">
                <div className="login-box-container">
                    <div className="card-body">
                        <div className="authent-text">
                            <h1 className='text-black text-[25px] p-2 pb-2 mb-3 -mt-3'>Login</h1>
                            <p>Sign in to your account.</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating">
                                <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Email address</label>
                                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

                            </div>
                            <div className="form-floating">
                                <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword">Password</label>
                                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                            </div>
                            <div className="dx-grid">
                                <button type="submit" className="btn signin-btn">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </>

    )
}

export default Login