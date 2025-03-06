import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem("auth", "true");
        navigate("/dashboard");
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Login</h1>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter Username" 
                className="border p-2 rounded mr-2"
            />
            <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">Login</button>
        </div>
    );
};

export default Login;