import React, { useEffect, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PrimaryButton from '../../common/components/ui/buttons/PrimaryButton';
import { useDeleteRequest, useGetRequest, usePostRequest, useUpdateRequest } from "../../common/hooks/useGetRequest";
import TaskModal from '../components/ui/TaskModal';
import Avatar from '../../common/components/ui/other/Avatar';
import TaskCreateModal from '../components/ui/TaskCreateModal';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import HelpersService from '../../common/services/HelpersService';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { green, amber, orange, red, grey, blue } from '@mui/material/colors';
import BugReportIcon from '@mui/icons-material/BugReport';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TaskIcon from '@mui/icons-material/Task';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import { useDispatch } from 'react-redux';
import { updateTaskStatus } from '../../common/redux/actions';
const Board = () => {
    const [groupName, setGroupName] = useState('');
    const [project, setProject] = useState('');
    const [tasks, setTasks] = useState([{ name: '', description: '' }]);

    const handleTaskChange = (index, event) => {
        const newTasks = [...tasks];
        newTasks[index][event.target.name] = event.target.value;
        setTasks(newTasks);
    };

    const addTask = () => {
        setTasks([...tasks, { name: '', description: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const groupData = {
            groupName,
            project,
            tasks,
        };

        try {
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(groupData),
            });
            if (response.ok) {
                alert('Group added successfully!');
            } else {
                alert('Failed to add group.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add group.');
        }
    };

        return (
            <div className="flex flex-col h-screen mt-8 overflow-hidden">
                <h2>Add Group</h2>
                <label>
                    Group Name:
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Project:
                    <input
                        type="text"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        required
                    />
                </label>
                <h3>Tasks</h3>
                {tasks.map((task, index) => (
                    <div key={index}>
                        <label>
                            Task Name:
                            <input
                                type="text"
                                name="name"
                                value={task.name}
                                onChange={(e) => handleTaskChange(index, e)}
                                required
                            />
                        </label>
                        <label>
                            Task Description:
                            <input
                                type="text"
                                name="description"
                                value={task.description}
                                onChange={(e) => handleTaskChange(index, e)}
                                required
                            />
                        </label>
                    </div>
                ))}
                <button type="button" onClick={addTask}>
                    Add Task
                </button>
                <button type="submit">Save Group</button>
            </div>
    );
}

export default Board;
