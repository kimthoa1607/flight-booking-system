import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getToken } from "../redux/tokenSlice";
import { getUser } from "../redux/userSlice";
import { toast, ToastContainer } from "react-toastify";
import useFlightStore from "../zustand store/ZStore";
const Login = () => {
  const { getIsLoggedIn } = useFlightStore();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isPending, setIsPending] = useState(false);
  const navigateTo = useNavigate();
  const notify = (text) => toast(text);

  const handleOnChange = () => {
    const { name, value } = event.target;
    setLoginData((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    setIsPending(true);
    axios
      .post("https://flight-search-api.onrender.com/user/login", loginData)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          let atoken = response.data.access_token;
          Cookies.set("token", atoken);
          dispatch(getToken(atoken));
          const headers = {
            Authorization: `Bearer ${atoken}`,
          };
          axios
            .get("https://flight-search-api.onrender.com/user/me", { headers })
            .then((response) => {
              //   console.log(response);
              if (response.status === 200) {
                dispatch(getUser(response.data.data));
                let text = "Login Successful!";
                notify(text)
                getIsLoggedIn(true);
                navigateTo(-2);
              }
            })
            .catch((error) => {
              let text = "Something went wrong"
              notify(text)
              console.log(error);
            });
        }
        setIsPending(false);
      })
      .catch((error) => {
        console.log(error);
        let text = "Something went wrong, please try again!"
        notify(text)
        setIsPending(false);
      });
  };
  return (
    <div className=" h-full w-full flex flex-col items-center md:h-full bg-white md:justify-center md:items-center">
      <div className="h-[100%] md:h-fit flex flex-col items-center bg-white w-full md:w-[28%] px-8 pt-10 pb-5 rounded-md">
        <h3 className="font-medium text-lg">Chào mừng trở lại!</h3>
        <p className="text-[10px] text-slate-500">
          Đăng nhập tài khoản của bạn để tiếp tục
        </p>
        <form className="w-full" onSubmit={handleLogin}>
          <fieldset disabled={isPending}>
            <div className="flex flex-col mt-2">
              <label htmlFor="email" className="text-sm text-slate-400">
                Email
              </label>
              <input
                className="text-sm  border-t border-x border-b-2 border-b-slate-300 rounded-lg shadow-lg py-2 px-1"
                type="email"
                name="email"
                placeholder="Johndoe123@gmail.com"
                value={loginData.email}
                required
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="password" className="text-sm text-slate-400">
                Mật khẩu
              </label>
              <input
                className="text-sm  border-t border-x border-b-2 border-b-slate-300 rounded-lg shadow-lg py-2 px-1"
                type="password"
                name="password"
                placeholder="Johndoe123@gmail.com"
                value={loginData.password}
                onChange={handleOnChange}
                required
              />
            </div>
            <p className="text-sm mt-3 text-right">
              <Link to="#" className="text-blue-600">
                Quên mật khẩu
              </Link>
            </p>
            <button
              className={` w-full mt-3 text-center font-medium text-sm py-2 border-t border-x border-b-2 border-b-slate-300 rounded-md shadow-lg px-1${isPending
                  ? " bg-gray-400 text-slate-600"
                  : " bg-blue-950 text-white"
                }`}
              disabled={isPending}
            >
              Đăng nhập
            </button>
          </fieldset>
        </form>
        <p className="text-sm mt-3 text-slate-600 font-medium">
          {" "}
          Bạn chưa có tài khoản?{" "}
          <Link to="/signup" className="text-blue-600 ">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
