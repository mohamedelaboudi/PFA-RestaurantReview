import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Corrected import statement
import './LoginPopup.css'; // Corrected import path
import cross_icon from '../../assets/cross_icon.png'; // Corrected import statement
import axios from 'axios';
import PropTypes from 'prop-types';
import { StoreContext } from '../../Context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Sign Up");
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'user'
    });
    const { url, setToken } = useContext(StoreContext);
    const navigate = useNavigate(); // Corrected hook usage

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        console.log(data);
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/Autho/login";
        } else {
            newUrl += "/api/Autho/register";
        }
        try {
            const response = await axios.post(newUrl, data);
            if (response.status === 200) {
                console.log("token", response.data.token);
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                if (data.role === 'admin') {
                    window.location.href = 'http://localhost:5174/'; // Redirect to admin project
                } else {
                    navigate('/'); // Corrected navigate usage
                }
                setShowLogin(false);
            } else {
                alert(response.data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("User already exists. Please use a different email or login.");
            } else {
                console.error('Error:', error);
                alert("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    {currState}
                    <img onClick={() => setShowLogin(false)} src={cross_icon} alt="close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" && (
                        <>
                            <label htmlFor="role">Role:</label>
                            <select name="role" id="role" value={data.role} onChange={onChangeHandler}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </>
                    )}
                    {currState === "Login" ? null : (
                        <>
                            <input type="text" name='firstname' value={data.firstname} onChange={onChangeHandler} required placeholder='firstname' />
                            <input type="text" name='lastname' value={data.lastname} onChange={onChangeHandler} required placeholder='lastname' />
                        </>
                    )}
                    <input type="email" name='email' value={data.email} onChange={onChangeHandler} required placeholder='email' />
                    <input type="password" name='password' value={data.password} onChange={onChangeHandler} required placeholder='password' />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing I agree to the terms of use & privacy policy</p>
                </div>
                {currState === "Login" ? (
                    <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                )}
            </form>
        </div>
    );
};

LoginPopup.propTypes = {
    setShowLogin: PropTypes.func.isRequired,
};

export default LoginPopup;
