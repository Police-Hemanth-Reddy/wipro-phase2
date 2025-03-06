import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Welcome to Task Manager</h1>
            <p>Manage your tasks efficiently with our app.</p>
            <Link to="/login" className="text-blue-500">Login</Link>
        </div>
    );
};
export default Home;
