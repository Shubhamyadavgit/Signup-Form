import React, { useState } from "react";
import "./Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { NavLink } from "react-router-dom";
import emailjs from "emailjs-com";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    cpassword: "",
  });

  const validateName = (name) => /^[A-Za-z]+$/.test(name);
  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otpVerified) {
      toast.error("Please verify the OTP before submitting.");
      return;
    }

    const allFieldsFilled = Object.values(data).every(
      (field) => field.trim() !== ""
    );
    if (!allFieldsFilled) {
      toast.error("Please fill out all fields");
      return;
    }

    if (!validateName(data.name)) {
      toast.error("Invalid name");
      return;
    }
    if (!validateName(data.lastname)) {
      toast.error("Invalid lastname");
      return;
    }
    if (!validateEmail(data.email)) {
      toast.error("Invalid email");
      return;
    }
    if (!validatePhone(data.phone)) {
      toast.error("Invalid phone");
      return;
    }
    if (
      !validatePassword(data.password) ||
      data.password.length < 10 ||
      data.password.length > 20
    ) {
      toast.error(
        "Password must be 10-20 characters and include a number and uppercase letter"
      );
      return;
    }
    if (data.password !== data.cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success("Submitted successfully!");
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
    setOtp("");
    setOtpVerified(false);
    setOtpSent(false);
  };

  const sendOtp = () => {
    if (!validateEmail(data.email)) {
      toast.error("Please enter a valid email before sending OTP");
      return;
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate 4-digit OTP
    setGeneratedOtp(otp);

    // Sending the email using EmailJS
    const emailParams = {
      user_email: data.email,
      user_otp: otp,
      to_email: "Shubham",
      message:
        "Your OTP for the verification is :  " +
        otp +
        "Please enter this otp to verify email and dont share the otp with anyone.",
    };

    emailjs
      .send(
        "service_a2y363p",
        "template_irjscfr",
        emailParams,
        "kk7iXWfzsEPtNfufG"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setOtpSent(true);
          toast.success(`OTP sent to ${data.email}`);
        },
        (error) => {
          console.error("FAILED...", error);
          toast.error("Failed to send OTP. Please try again.");
        }
      );
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true);
      toast.success("OTP verified successfully");
    } else {
      toast.error("Invalid OTP");
    }
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
        <div className="email">
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
            <button type="button" onClick={sendOtp} disabled={otpSent}>
              {otpSent ? "OTP Sent" : "Send OTP"}
            </button>
          </div>
        </div>
        {otpSent && (
          <div className="verify">
            <label htmlFor="otp">Enter OTP</label>
            <div className="otp-input-container">
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
              <button type="button" onClick={verifyOtp}>
                Verify OTP
              </button>
            </div>
          </div>
        )}

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
            placeholder="Confirm Your Password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!otpVerified}
          className={otpVerified ? "btn-active" : "btn-inactive"}
        >
          Submit
        </button>

        <div className="login-container">
          <h4>
            Already have an account?{" "}
            <span>
              <NavLink to="/login">Click here</NavLink>
            </span>
          </h4>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default Signup;
