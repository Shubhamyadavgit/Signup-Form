import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import axios for HTTP requests
import './Signup.css';
import { NavLink } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOtpVisible, setEmailOtpVisible] = useState(false);
  const [phoneOtpVisible, setPhoneOtpVisible] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpPhone, setOtpPhone] = useState("");
  const [data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSendEmailOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/otp/send', {
        email: data.email,
      });
      toast.success(response.data); // Show success message from backend
      setEmailOtpVisible(true); // Show email OTP field after sending
    } catch (error) {
      const errorMessage = error.response?.data || 'Error sending OTP. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleSendPhoneOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/otp/send', {
        phone: "+91" + data.phone,
      });
      toast.success(response.data); // Show success message from backend
      setPhoneOtpVisible(true); // Show phone OTP field after sending
    } catch (error) {
      const errorMessage = error.response?.data || 'Error sending OTP. Please try again.';
      toast.error(errorMessage);
    }
  };

  // Verify email OTP
  const handleOtpVerificationEmail = async () => {
    console.log("Email:", data.email); // Make sure this is correct
    console.log("OTP:", otpEmail); // Make sure this is correct
    try {
        const response = await axios.post('http://localhost:8080/api/users/otp/verify', {
            identifier: data.email, // Ensure this matches what your backend expects
            otp: otpEmail, // Ensure this matches what your backend expects
        });
        toast.success(response.data);
        setEmailOtpVisible(false); // Hide OTP field after verification
        setOtpEmail(""); // Reset email OTP input
    } catch (error) {
        const errorMessage = error.response?.data || 'OTP verification failed.';
        toast.error(errorMessage);
    }
};

const handleOtpVerificationPhone = async () => {
    console.log("Phone:", "+91" + data.phone); // Make sure this is correct
    console.log("OTP:", otpPhone); // Make sure this is correct
    try {
        const response = await axios.post('http://localhost:8080/api/users/otp/verify', {
            identifier: "+91" + data.phone, // Ensure this matches what your backend expects
            otp: otpPhone, // Ensure this matches what your backend expects
        });
        toast.success(response.data);
        setPhoneOtpVisible(false); // Hide OTP field after verification
        setOtpPhone(""); // Reset phone OTP input
    } catch (error) {
        const errorMessage = error.response?.data || 'OTP verification failed.';
        toast.error(errorMessage);
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.cpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        phone: data.phone,
        gender: data.gender,
      });
      toast.success(response.data); // Show success message from backend
      setData({
        name: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        cpassword: "",
      });
      setEmailOtpVisible(false); // Hide email OTP field after registration
      setPhoneOtpVisible(false); // Hide phone OTP field after registration
      setOtpEmail(""); // Reset email OTP input
      setOtpPhone(""); // Reset phone OTP input
    } catch (error) {
      const errorMessage = error.response?.data || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        {/* Name fields */}
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

        {/* Email Section */}
        <div>
          <label htmlFor="email">Email</label>
          <div className="email-input-container">
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              required
            />
            <button type="button" onClick={handleSendEmailOtp}>
              Send OTP
            </button>
          </div>
          {emailOtpVisible && (
            <div className="otp-input-container">
              <label htmlFor="otpEmail"></label>
              <input
                type="text"
                id="otpEmail"
                value={otpEmail}
                onChange={(e) => setOtpEmail(e.target.value)}
                placeholder="Enter OTP"
                required
              />
              <button type="button" onClick={handleOtpVerificationEmail}>Verify OTP</button>
            </div>
          )}
        </div>

        {/* Phone Section */}
        <div>
          <label htmlFor="phone">Phone</label>
          <div className="email-input-container">
            <input
              type="text"
              id="phone"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="Enter Your Phone Number"
              required
            />
            <button type="button" onClick={handleSendPhoneOtp}>
              Send OTP
            </button>
          </div>
          {phoneOtpVisible && (
            <div className="otp-input-container">
              <label htmlFor="otpPhone"></label>
              <input
                type="text"
                id="otpPhone"
                value={otpPhone}
                onChange={(e) => setOtpPhone(e.target.value)}
                placeholder="Enter OTP"
                required
              />
              <button type="button" onClick={handleOtpVerificationPhone}>Verify OTP</button>
            </div>
          )}
        </div>

        {/* Gender Section */}
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

        {/* Password fields */}
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
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              <VisibilityIcon />
            </span>
          </div>
        </div>

        <div className="password-field">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="cpassword"
            name="cpassword"
            value={data.cpassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
      <div className="login-container">
        <h4>
          Already a User?{" "}
          <span>
            <NavLink to="/login">Login</NavLink>
          </span>
        </h4>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
