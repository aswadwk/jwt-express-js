import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    try {
      const { status } = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      console.log(status);
      if (status === 200) navigate("dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-indigo-500">
      <div className="w-full px-6 py-10 space-y-8 bg-black/75 md:px-14 md:max-w-md">
        <h1 className="text-2xl font-semibold text-white">Login</h1>

        <form onSubmit={Login}>
          <div className="flex flex-col space-y-4">
            <label htmlFor="" className="inline-block w-full">
              <input
                className="input"
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label htmlFor="" className="inline-block w-full">
              <input
                className="input"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
          </div>

          <button className="w-full py-3.5 px-5 text-white font-semibold bg-red-500 rounded mt-8">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
