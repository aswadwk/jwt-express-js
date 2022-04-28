import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import jwt_decode from "jwt-decode"

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState('');

  useEffect = (() => {
    refreshToken();
  }, [])
  const refreshToken = async () => {
    try {
      const res = await axios.get("http://localhost:5000/token");
      setToken(res.data.accessToken);
      const decoded = jwt_decode(res.data.accessToken);
      console.log(decoded);
      setName(decoded.name);
    } catch (e) {
      console(e)
    }
  }

  return (
    <div>
      <Navbar />
      <main className="px-4 py-2">
        <h1>Hello  : {name}</h1>

        <button className="px-5 py-3 text-white bg-indigo-400 rounded">
          Get Users
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
