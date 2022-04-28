import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    console.log("Submit");
    try {
      const res = await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confirmPassword: passwordConfirm,
      });
      console.log(res);
      if (res.status === 200) navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-indigo-500">
      <div className="w-full px-6 py-10 space-y-8 bg-black/75 md:px-14 md:max-w-md">
        <h1 className="text-2xl font-semibold text-white">Register</h1>
        <form className="" onSubmit={Register}>
          <div className="flex flex-col space-y-4">
            <label htmlFor="" className="inline-block w-full">
              <input
                className="input"
                type="text"
                placeholder="Nama"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
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
            <label htmlFor="" className="inline-block w-full">
              <input
                className="input"
                type="password"
                placeholder="Password Confirm"
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-5 text-white font-semibold bg-red-500 rounded mt-8"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
