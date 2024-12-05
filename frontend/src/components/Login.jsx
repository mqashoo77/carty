import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate,Navigate } from 'react-router-dom'
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const disptach = useDispatch();
    // const {user} = useSelector((state) => state.auth);
    const [loginUser, {isLoading: loginLoading}] = useLoginUserMutation()
    const navigate = useNavigate()
    
    // handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            username,
            password
        }

       try {
        
        const response = await loginUser(data).unwrap();
        console.log(response)
        const {token, user} = response;
        disptach(setUser({user}))
        switch (user?.role) {
            case 'admin':
                navigate("/dashboard", { replace: true });
                break; 
            case 'user': 
              navigate('/')
              break;
          
            default:
                navigate("/login", { replace: true });
                break;
          }
       } catch (error) {
        setMessage("Wrong Username or Password")
       }

    }
    return (
        <section className='h-screen flex items-center justify-center'>
            <div className='max-w-sm border shadow bg-white mx-auto p-8'>
                <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
                <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto pt-8'>
                    <input type="username" name="username" id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Username' required
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                    />
                    <input type="password" name="password" id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password' required
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                    />
                    {
                        message && <p className='text-red-500'>{message}</p>
                    }

                    <button type='submit'
                        className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'
                    >Login</button>
                </form>

                <p className='my-5 italic text-sm text-center'>Don't have an account?
                    <Link to="/register" className='text-red-700 px-1 underline'>Register</Link> here.</p>
            </div>
        </section>
    )
}

export default Login