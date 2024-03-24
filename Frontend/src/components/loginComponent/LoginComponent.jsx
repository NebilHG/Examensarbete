import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3500/signup", {
        email,
        password,
      });
      if (response.data.success) {
        alert("Account created successfully!");
        console.log("Account created:", response.data);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3500/login", {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        console.log("User logged in:", email);
        navigate("/shop"); // Redirect to /shop
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleSignup}>Create Account</button>
          <button onClick={handleLogin}>Login</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginComponent;
