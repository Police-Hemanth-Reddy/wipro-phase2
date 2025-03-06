import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/actions';

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    
    return (
        <li className="flex justify-between p-2 border-b">
            <span>{task.title}</span>
            <button onClick={() => dispatch(deleteTask(task.id))} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
            </button>
        </li>
    );
};

export default TaskItem;
