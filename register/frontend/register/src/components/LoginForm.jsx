import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";


const LoginForm = () => {

  const [formData,setFormData]=useState({
    EmailId:"",
    Password:"",
  })

  function handlechange(e){
    const name=e.target.name;
    const value=e.target.value;
    setFormData((prev)=>{
      return {...prev,[name]:value}
    })
  }
  function handlesubmit(e){
    e.preventDefault();
    axios.post("http://localhost:7000/task/login",formData)
    .then((res)=>{
      if(res.data.status===200){
        alert(res.data.message);
      }
      else{
        alert(res.data.message);
      }
      setFormData({
        EmailId:"",
        Password:"",
      })

    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    
    <div
      className="card shadow p-4"
      style={{
        width: "24rem",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        color: "white",
        border: "none"
      }}
    >
      <h3 className="text-center mb-4">
        <i className="bi bi-person-circle"></i> Login
      </h3>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="EmailId"
            value={formData.EmailId}
            className="form-control"
            placeholder="Email Id"
            onChange={handlechange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="Password"
            value={formData.Password}
            className="form-control"
            placeholder="Password"
            onChange={handlechange}
          />
        </div>
        <button type="submit" className="btn btn-light w-100 text-dark fw-bold">
          Login
        </button>
      </form>
      <p className="text-center mt-3">
        Don't have an account?{" "}
        <Link
          to="/Register"
          className="btn btn-link p-0 text-decoration-none"
          style={{ color: "#ffd700", fontWeight: "bold" }}
        >
          Register Here
        </Link>
      </p>
    </div>
   
  );
};

export default LoginForm;
