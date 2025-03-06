import React from 'react';
import TaskItem from './TaskItem';
import { useSelector } from 'react-redux';

const TaskList = () => {
    const tasks = useSelector(state => state.tasks);
    
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;