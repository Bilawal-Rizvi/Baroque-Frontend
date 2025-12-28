import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
function Registeration() {
const BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();
      const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [para, setPara] = useState("");
  const data = {
    name: user,
    email: email,
    password: password,
  };

  const handleSubmit = () => {
    setUser("");
    setEmail("");
    setPassword("");
  };
  const DataSUmbit = async  () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/register/r`,
        data
      );
      // console.log("Success:", response.data); // Or show a toast/alert
      setPara("Form submitted successfully!!!");     
      navigate('/login');
      // Reset form or redirect if needed
    } catch (error) {
      if(!user || !email || !password){
        setPara("All fields are required");
        return;
      }
      if(error.response.status==400){
        alert(error.response.data.message);
        navigate('/login');
        return
      }
      alert(error.response.data.message);
           // Show error message to user
    }
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
   DataSUmbit();
   handleSubmit();  
  };
  return (
   <>
       <div className="flex items-center justify-center">
        {" "}
        <div className="  bg-black h-fit m-10 p-10 w-100 flex flex-col  justify-center items-center text-white">
          <h1 className="text-2xl">Bilawal and fullstack</h1>
          <p className="text-xl pt-1 pb-1">FORM</p>
          <form onSubmit={onFormSubmit} className="flex  flex-col gap-y-2">
            {" "}
            <input
              type="text"
              className="outline-none bg-white text-black p-2 rounded-lg "
              placeholder="Name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            ></input>
            <input
              type="email"
              className="outline-none bg-white text-black p-2 rounded-lg "
              placeholder="Email"
              value={email}

              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              className="outline-none bg-white text-black p-2 rounded-lg "
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <p className="text-red-500" >{para}</p>
            <button
              type="submit"
              className="bg-blue-700 outline-none rounded-lg w-fit pt-1 pb-1 pr-2 pl-2 self-end "
            >
              Submit
            </button>
          </form>
        </div>
      </div></>
  )
}

export default Registeration