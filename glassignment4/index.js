const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// In-memory task storage
let tasks = [];
let users = {}; // Store connected users { socketId: username }

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Assign username on connection
    socket.on("registerUser", (username) => {
        users[socket.id] = username;
        console.log(`User registered: ${username}`);
    });

    // Send initial tasks
    socket.emit("loadTasks", tasks);

    // Add a task
    socket.on("addTask", (task) => {
        tasks.push(task);
        io.emit("taskUpdated", tasks);
    });

    // Delete a task
    socket.on("deleteTask", (taskId) => {
        tasks = tasks.filter(task => task.id !== taskId);
        io.emit("taskUpdated", tasks);
    });

    // Assign/Reassign a task (Admin only)
    socket.on("assignTask", ({ taskId, assignee }) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.assignee = assignee;
            io.emit("taskUpdated", tasks);

            // Notify the assigned user
            const assignedUserSocket = Object.keys(users).find(
                (socketId) => users[socketId] === assignee
            );
            if (assignedUserSocket) {
                io.to(assignedUserSocket).emit("taskAssigned", task);
            }
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete users[socket.id];
    });
});

server.listen(5000, () => console.log("✅ Server running on port 5000"));
