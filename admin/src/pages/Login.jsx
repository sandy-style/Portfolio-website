import React from "react";
import { Lock, User } from "lucide-react";
import { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/admin/login", {
        userName,
        password,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setToken(response.data.token);

        localStorage.setItem("token", response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-2xl">
        {" "}
        <div className="text-center mb-8">
          {" "}
          <h1 className="text-3xl font-bold text-black"> Admin Login </h1>{" "}
          <p className="text-gray-500 mt-2 text-sm">
            {" "}
            Sign in to access the admin panel{" "}
          </p>{" "}
        </div>{" "}
        <form onSubmit={submitHandler} className="space-y-5">
          {" "}
          <div>
            {" "}
            <label className="block text-sm font-semibold text-black mb-2">
              {" "}
              Admin Name{" "}
            </label>{" "}
            <div className="relative">
              {" "}
              <User
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />{" "}
              <input
                id="adminname"
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="Enter admin name"
                className="w-full h-12 pl-11 pr-4 border border-gray-300 rounded-lg outline-none text-black placeholder:text-gray-400 focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />{" "}
            </div>{" "}
          </div>{" "}
          <div>
            {" "}
            <label className="block text-sm font-semibold text-black mb-2">
              {" "}
              Password{" "}
            </label>{" "}
            <div className="relative">
              {" "}
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />{" "}
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                className="w-full h-12 pl-11 pr-4 border border-gray-300 rounded-lg outline-none text-black placeholder:text-gray-400 focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />{" "}
            </div>{" "}
          </div>{" "}
          <button
            type="submit"
            className="w-full h-12 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
          >
            {" "}
            Login{" "}
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};

export default Login;
