import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ State for error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // ✅ Clear error before making the request

    try {
      const res = await API.post("/Authentication", { email, password });
      const token = res.data.token;
      console.log("Token:", token);

      localStorage.setItem("token", token);
      navigate("/batches");
    } catch (err) {
      setError("Invalid credentials"); // ✅ Set error only on failure
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>} {/* ✅ Display error */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
