import React, { useState } from "react";
import "./Signup.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {NavLink} from 'react-router-dom'
const Signup = () => {

  const[showPassword,setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    cpassword: "",
  });

  const validateName = (name)=>{
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
  }

  const validateEmail = (email)=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]/;
    return emailRegex.test(email);
  }

  const validatePhone = (phone)=>{
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  }
  const validatePassword = (password)=>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    return passwordRegex.test(password);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(data).every(field => field.trim() !== "");

    if (!allFieldsFilled) {
      toast.error('Please fill out all fields');
      return;
    }

    if(!validateName(data.name)){
      toast.error('Invalid name');
      return;
    }
    if(!validateName(data.lastname)){
      toast.error('Invalid lastname');
      return;
    }
    if(!validateEmail(data.email)){
      toast.error('Invalid email');
      return;
    }
    if(!validatePhone(data.phone)){
      toast.error('Invalid phone');
      return;
    }
    if(!validatePassword(data.password)){
      toast.error('Invalid password');
      return;
    }
    if(data.password !== data.cpassword){
        toast.error('Passwords do not match');
        return;
    }
    toast.success("Submitted successfully!")
    console.log("Form data submitted:", data); 
    setData({
      name: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
      cpassword: "",
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter First Name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={data.lastname}
            onChange={handleChange}
            placeholder="Enter Last Name"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="Enter Your Mobile Number"
            required
          />
        </div>

        <div>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={data.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="password-field">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            <VisibilityIcon/>
            </span>
          </div>
        </div>
        <div className="password-field">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type={showPassword ?  "text" : "password"}
            id="cpassword"
            name="cpassword"
            value={data.cpassword}
            onChange={handleChange}
            placeholder="Confirm Your Password"
            required
          />
        </div>

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <div className="login-container">
          <h4>Already have an account ? <span><NavLink to="/login"> Click here</NavLink></span></h4>
        </div>
      </form>
      <ToastContainer 
        position="top-center"
        autoClose={5000}
      />
    </div>
  );
};

export default Signup;
