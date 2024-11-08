import React, { useState } from "react";
import './css/LoginSignup.css';
import { useAppContext } from '../Context/Context';

function LoginSignup() {
  const { baseURL } = useAppContext();
  const [state, setState] = useState("LogIn");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = async () => {
    console.log("Login Function executed", formData);
    let responseData;
    try {
      const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('user-first-name', responseData.username); 
        localStorage.setItem('userId', responseData.userId);
        localStorage.setItem('user', JSON.stringify(responseData.user));
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Failed to fetch", error);
      alert("Login failed. Please try again.");
    }
  };
  

  const signup = async () => {
    console.log("Signup Function executed", formData);
    let responseData;
    try {
      const response = await fetch(`${baseURL}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          address1: "",
          address2: "",
          city: "",
          state: "",
          pincode: ""
      }),
      });
      responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('user-first-name', responseData.username); 
        localStorage.setItem('userId', responseData.userId);
        localStorage.setItem('user', JSON.stringify(responseData.user));
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Failed to fetch", error);
      alert("Signup failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    state === "LogIn" ? login() : signup();
  };

  return (
    <div className="signUp">
      <div className="signUpContainer">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>{state}</h2>
          {state === "SignUp" && (
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {state === "SignUp" && (
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          )}
          {state === "SignUp" && (
            <div className="form-group">
              <label htmlFor="vehicle">Which bike do you own?:</label>
              <input
                type="text"
                id="vehicle"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            {state === "SignUp" ? (
              <p className="loginSignupCheck">
                Already have an account?{" "}
                <span
                  onClick={() => setState("LogIn")}
                  className="loginSignupButton"
                >
                  Login In
                </span>
              </p>
            ) : (
              <p className="loginSignupCheck">
                Create account{" "}
                <span
                  onClick={() => setState("SignUp")}
                  className="loginSignupButton"
                >
                  Click here
                </span>
              </p>
            )}
          </div>
          <div
            className="form-group"
            style={{ border: "3px solid black", borderRadius: "7px" }}
          >
            <button type="submit">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginSignup;