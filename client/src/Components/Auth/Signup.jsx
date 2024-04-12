import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Signup = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const handleOnChange = (event) => {
        const { name, value } = event.target
        setUser((prevValues) => ({ ...prevValues, [name]: value }))
    }
    const handleSignUp = (event) => {
        event.preventDefault()
        axios.post('https://flight-search-api.onrender.com/user/create', user)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        console.log(user)
    }
    return (
        <div className='h-full w-full bg-white flex flex-col md:justify-center items-center'>
            <div className='flex flex-col items-center bg-white md:w-[28%] px-8 pt-10 pb-5 rounded-md'>
                <h3 className='font-medium text-lg'>Tạo tài khoản</h3>
                <p className='text-xs text-slate-500'>Nhập thông tin của bạn để tạo tài khoản</p>
                <form onSubmit={handleSignUp}>
                    <div className='grid grid-cols-2 gap-x-6 mt-5'>
                        <label htmlFor='first-name' className='text-xs text-slate-400'>Tên</label>
                        <label htmlFor='last-name' className='text-xs text-slate-400'>Họ</label>
                        <input
                            className='text-sm border-t border-x border-b-2 border-b-slate-300 rounded-lg shadow-lg py-2 px-1'
                            type='text'
                            name='username'
                            placeholder='John'
                            value={user.username}
                            onChange={handleOnChange}
                            required
                        />
                        <input
                            className='text-sm border-t border-x border-b-2 border-b-slate-300 rounded-lg shadow-lg py-2 px-1'
                            type='text'
                            name='surname'
                            placeholder='Doe'
                            required
                        />
                    </div>
                    <div className='flex flex-col mt-2'>
                        <label htmlFor='email' className='text-xs text-slate-400'>Email</label>
                        <input
                            className='text-sm  border-t border-x border-b-2 border-b-slate-300 rounded-lg shadow-lg py-2 px-1'
                            type='email'
                            name='email'
                            placeholder='Johndoe123@gmail.com'
                            value={user.email}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className='flex flex-col mt-2'>
                        <label htmlFor='password' className='text-xs text-slate-400'>Mật khẩu</label>
                        <input
                            className='text-sm  border-t border-x border-b-2 border-b-slate-300 rounded-lg shadow-lg py-2 px-1'
                            type='password'
                            name='password'
                            placeholder='Johndoe123@gmail.com'
                            value={user.password}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <p className='text-[11px] mt-3'>
                        <input type='checkbox' required /> Tôi đồng ý với điểu khoản & điều kiện
                    </p>
                    <button className='bg-blue-950 w-full mt-3 text-center text-white font-medium text-sm py-2 border-t border-x border-b-2 border-b-slate-300 rounded-md shadow-lg px-1'>Đăng ký</button>
                </form>
                <div className='flex flex-row w-full gap-2 items-center mt-3'>
                    <div className='border border-gray-200 h-[2px] w-full'></div>
                    <p className='text-sm'>Hoặc </p>
                    <div className='border border-gray-200 w-full'></div>
                </div>
                <p className='text-sm mt-3 text-slate-600 font-medium'> Bạn đã có tài khoản? <Link to='/login' className='text-blue-600 '>Đăng nhập</Link></p>
            </div>
        </div>
    )
}

export default Signup