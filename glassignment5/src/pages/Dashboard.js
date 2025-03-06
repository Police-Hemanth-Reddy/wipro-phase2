import React from "react";
import TaskList from "../components/TaskList";

const Dashboard = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <TaskList />
        </div>
    );
};

export default Dashboard;
