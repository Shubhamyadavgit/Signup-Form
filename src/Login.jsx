import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios'; // Import axios for HTTP requests

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
        return passwordRegex.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const allFieldsFilled = Object.values(data).every(field => field.trim() !== "");
        if (!allFieldsFilled) {
            toast.error('Please fill out all fields');
            return;
        }
        if (!validateEmail(data.email)) {
            toast.error('Invalid email');
            return;
        }
        if (!validatePassword(data.password) || data.password.length < 10 || data.password.length > 20) {
            toast.error('Password must be at least 10 characters long and contain at least one number and one uppercase letter');
            return;
        }

        // Make a POST request to the backend
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', data);
            toast.success(response.data); // Show success message
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Invalid credentials');
            } else {
                toast.error('Login failed. Please try again');
            }
        }
    };

    return (
        <div className="container">
            <form action="" onSubmit={handleSubmit}>
                <h3>Login</h3>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter Your Email"
                    />
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
                            <VisibilityIcon />
                        </span>
                    </div>
                </div>
                <button type="submit" onClick={handleSubmit}>Login</button>
                <div className="login-container">
                    <h4>
                        New User?{" "}
                        <span>
                            <NavLink to="/">Signup</NavLink>
                        </span>
                    </h4>
                </div>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={5000}
            />
        </div>
    );
};

export default Login;
