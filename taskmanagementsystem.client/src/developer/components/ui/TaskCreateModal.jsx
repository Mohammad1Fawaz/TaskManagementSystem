/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Grid } from '@mui/material';
import PrimaryButton from '../../../common/components/ui/buttons/PrimaryButton';
import TextInput from '../../../common/components/ui/inputs/TextInput';
import SelectInput from '../../../common/components/ui/inputs/SelectInput';
import TaskDescriptionEditor from '../ui/TaskDescriptionEditor';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '45%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 4,
};

const TaskCreateModal = ({
    isOpen,
    onClose,
    onSubmit,
    boardProjects,
    currentProject,
    taskTypes,
    taskPriorities,
    userCollaborators
}) => {
    const [task, setTask] = useState({
        taskId: '0',
        projectId: currentProject?.projectId || '',
        type: '',
        title: '',
        description: '',
        dueDate: '',
        assigneeId: '',
        reporter: 0,
        status: 'ToDo',
        priority: '',
        progress: 0,
    });

    const [invalidFields, setInvalidFields] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleSelectChange = (name) => (selectedOption) => {
        setTask((prevTask) => ({
            ...prevTask,
            [name]: selectedOption ? selectedOption.value : '',
        }));
    };

    const validateForm = () => {
        const requiredFields = ['type', 'title', 'priority','assigneeId'];
        const invalids = requiredFields.filter(field => !task[field]);
        setInvalidFields(invalids);
        return invalids.length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(task);
        }
    };

    const getInputClass = (name) => invalidFields.includes(name) ? '!border !border-red-500' : '';

    if (!isOpen) {
        return null;
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onClick={onClose}
        >
            <Box sx={modalStyle} onClick={(e) => e.stopPropagation()}>
                <AppBar position="static" sx={{ bgcolor: 'var(--main-background-primary-color)', borderRadius: '8px 8px 0 0' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Create Task
                        </Typography>
                        <PrimaryButton text="Close" color="inherit" className="btn-sm" onClick={onClose} />
                    </Toolbar>
                </AppBar>
                <Box p={2} sx={{ maxHeight: '70vh', bgcolor: 'var(--main-background-primary-color)', overflow: 'auto' }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                Project<span className="text-danger">*</span>
                                <SelectInput
                                    selectOptions={boardProjects?.map(project => ({
                                        key: `${project.projectName} (${project.projectKey})`,
                                        value: project.projectId,
                                    }))}
                                    selectedValue={task?.projectId}
                                    className={`relative w-[335px] mt-1`}
                                    handleSelectChange={handleSelectChange('projectId')}
                                    isMulti={false}
                                    placeholder="Select a project"
                                    inputHeight={`${getInputClass('projectId')}`}
                                    icon="fa-project-diagram"
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex' }}>
                                <Box sx={{ flex: 1 }}>
                                    Task type<span className="text-danger">*</span>
                                    <SelectInput
                                        selectOptions={taskTypes?.map(type => ({
                                            key: type.key,
                                            value: type.value,
                                        }))}
                                        selectedValue={task?.type}
                                        className={`relative w-[335px] mt-1`}
                                        handleSelectChange={handleSelectChange('type')}
                                        isMulti={false}
                                        placeholder="Task type"
                                        inputHeight={`${getInputClass('type')}`}
                                        icon="fa-project-diagram"
                                    />
                                </Box>
                                <Box sx={{ ml: 6 }}>
                                    <Typography variant="h6">
                                        Status<span className="text-danger">!</span>
                                    </Typography>
                                    <PrimaryButton
                                        text="To Do"
                                        disabled
                                        className="btn-sm py-0 border-b-1 !m-auto !text-[12px]"
                                    />
                                    <Typography variant="body2" className="!text-[11px] mt-1">
                                        This is the issue&apos;s initial status upon creation
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                Title<span className="text-danger">*</span>
                                <TextInput
                                    placeholder="Title"
                                    name="title"
                                    value={task?.title}
                                    onChange={handleChange}
                                    className={getInputClass('title')}
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ height: '300px', my: 1 }}>
                                Description
                                <TaskDescriptionEditor setTask={setTask} task={task} />
                            </Grid>
                            <Grid item xs={12} sx={{ my: 1 }}>
                                Assignee
                                <SelectInput
                                    selectOptions={userCollaborators?.map(user => ({
                                        key: user.userName,
                                        value: user.userId,
                                    }))}
                                    selectedValue={task?.assigneeId}
                                    className="relative w-[50%] mt-1"
                                    handleSelectChange={handleSelectChange('assigneeId')}
                                    isMulti={false}
                                    placeholder="Automatic"
                                    inputHeight={`${getInputClass('assigneeId')}`}
                                    icon="fa-project-diagram"
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex' }} className="justify-between">
                                <Grid item xs={5}>
                                    Priority<span className="text-danger">*</span>
                                    <SelectInput
                                        selectOptions={taskPriorities?.map(priority => ({
                                            key: priority.key,
                                            value: priority.value,
                                        }))}
                                        selectedValue={task?.priority}
                                        className={`relative  mt-1`}
                                        handleSelectChange={handleSelectChange('priority')}
                                        isMulti={false}
                                        placeholder="Priority"
                                        inputHeight={`${getInputClass('priority')}`}
                                        icon="fa-project-diagram"
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    Story point estimate
                                    <TextInput
                                        placeholder="Progress"
                                        name="progress"
                                        type="number"
                                        value={task?.progress}
                                        onChange={handleChange}
                                        className="relative text-sm  mt-1"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                <AppBar position="static" sx={{ top: 'auto', bottom: 0, bgcolor: 'var(--main-background-primary-color)', borderRadius: '0 0 8px 8px' }}>
                    <Toolbar sx={{ ml: 'auto' }}>
                        <PrimaryButton text="Cancel" variant="contained" color="primary" className="btn-sm !bg-transparent me-2" onClick={onClose} />
                        <PrimaryButton text="Create" variant="contained" color="primary" className="btn-sm" onClick={handleSubmit} />
                    </Toolbar>
                </AppBar>
            </Box>
        </Box>
    );
};

export default TaskCreateModal;
