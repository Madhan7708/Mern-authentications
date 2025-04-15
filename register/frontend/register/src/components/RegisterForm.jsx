import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
const RegisterForm = () => {

  const [user,setUser]=useState({
    Name:"",
    EmailId:"",
    Phoneno:"",
    Password:"",
  })
  
  function handleChange(e){
    const name=e.target.name;
    const value=e.target.value;
    setUser((prev)=>{
      return{...prev,[name]:value}
    })
  }

  function handlesubmit(e){
    e.preventDefault();
    
    console.log(user);
    axios.post("http://localhost:7000/task/register/",user)
    .then((res)=>{
      console.log(res.data);
      alert(res.data.message);
      setUser({
        Name:"",
        EmailId:"",
        Phoneno:"",
        Password:"",
      })
    })
    .catch(err=>{
      console.log(err);
    })


  }

  

  return (
    <div className="card shadow p-4" style={{
      width: "24rem",
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      color: "white",
      border: "none"
    }}>
      <h3 className="text-center mb-4">Register</h3>
      <form onSubmit={handlesubmit} >
        <div className="mb-3">
          <input type="text"  name='Name' value={user.Name} className="form-control" placeholder="Name"     onChange={handleChange} required
             />
        </div>
        <div className="mb-3">
          <input type="text" name='EmailId' value={user.EmailId} className="form-control" placeholder="EmailId" onChange={handleChange} required
             />
        </div>
        <div className="mb-3">
          <input type="text" name='Phoneno' value={user.Phoneno}  className="form-control" placeholder="Phoneno" onChange={handleChange} required
             />
        </div>
        <div className="mb-3">
          <input type="password" name='Password' value={user.Password}  className="form-control" placeholder="Password" onChange={handleChange} required
             />
        </div>
        
        <button type="submit" className="btn btn-light w-100 text-dark fw-bold">Register</button>
      </form>
      <p className="text-center mt-3">
        Already have an account? 
        <Link to="/" className="btn btn-link p-0 text-decoration-none" style={{ color: "#ffd700", fontWeight: "bold" }} >
          Login Here
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
