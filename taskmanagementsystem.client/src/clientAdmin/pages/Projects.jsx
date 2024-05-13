import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PrimaryButton from '../../common/components/ui/buttons/PrimaryButton';
import TextInput from '../../common/components/ui/inputs/TextInput';
import Form from 'react-bootstrap/Form';
import SelectInput from '../../common/components/ui/inputs/SelectInput';
import { useGetRequest, usePostRequest } from '../../common/hooks/useGetRequest';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import HelpersService from '../../common/services/HelpersService';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
const Projects = () => {
    const initialStages = [
        {
            id: 'todo', title: 'ToDo'
        },
        {
            id: 'pending', title: 'Pending'
        },
        {
            id: 'inProgress', title: 'In Progress'
        },
        {
            id: 'feedback', title: 'Feedback'
        },
        {
            id: 'toDeployQA', title: 'To Deploy QA'
        },
        {
            id: 'qa', title: 'QA'
        },
        {
            id: 'toDeployDev', title: 'To Deploy Dev'
        },
        {
            id: 'dev', title: 'Dev'
        },
        {
            id: 'readyForProduction', title: 'Production'
        },
    ];
    const initialFormData = {
        projectName: '',
        projectKey: '',
        projectType: '',
        projectDescription: '',
        projectLead: 0,
        projectPermissions: '',
        userIds: [],
        projectWorkFlow: []
    };

    const [stages, setStages] = useState(initialStages);
    const [projectNameValidationMessage, setProjectNameValidationMessage] = useState('');
    const [projectKeyValidationMessage, setProjectKeyValidationMessage] = useState('');
    const [projectLeadValidationMessage, setProjectLeadValidationMessage] = useState('');
    const [projectDescriptionValidationMessage, setProjectDescriptionValidationMessage] = useState('');

    const [formData, setFormData] = useState(initialFormData);

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const { data: fetchedUsers, isLoading: loadingUsers, error: usersError } = useGetRequest('/User/get-users', null, null, true);
    const [checkedMembers, setCheckedMembers] = useState([]);
    const { mutate: createProject } = usePostRequest('/Project/create-project', true);
    
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    useEffect(() => {
        if (fetchedUsers) {
            setUsers(
                fetchedUsers.map(user => ({
                    value: user.id,
                    key: user.userName
                }))
            );
        }
    }, [fetchedUsers]);


    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            userIds: checkedMembers,
            projectWorkFlow: stages
        }));
    }, [checkedMembers, stages]);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const updatedStages = Array.from(stages);
        const [removed] = updatedStages.splice(source.index, 1);
        updatedStages.splice(destination.index, 0, removed);

        setStages(updatedStages);
    };

    const handleAddBox = () => {
        const newBox = { id: new Date().getTime().toString(), title: "your stage's title", tasks: [] };
        setStages([...stages, newBox]);
    };

    const handleRemoveBox = (boxId) => {
        const updatedStages = stages.filter((stage) => stage.id !== boxId);
        setStages(updatedStages);
    };

    const handleTitleChange = (event, boxId) => {
        const updatedStages = stages.map((stage) => {
            if (stage.id === boxId) {
                return { ...stage, title: event.target.value };
            }
            return stage;
        });
        setStages(updatedStages);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectChange = (selectedOption, input) => {
        if (selectedOption) {
            if (input === "projectLead") {
                setFormData({ ...formData, projectLead: selectedOption.value });
            } else {
                setFormData({ ...formData, projectMembers: selectedOption.map((option) => { return option.value; }) });
            }
        }
    };


    const handleCheckBoxChange = (userId) => {
        const isChecked = checkedMembers.includes(userId);
        if (isChecked) {
            setCheckedMembers(checkedMembers.filter(memberId => memberId !== userId));
        } else {
            setCheckedMembers([...checkedMembers, userId]);
        }
    };

    const handleSubmit = async () => {
        const projectViewModel = {
            projectName: formData.projectName,
            projectKey: formData.projectKey,
            projectType: formData.projectType,
            projectDescription: formData.projectDescription,
            projectLead: formData.projectLead,
            projectPermissions: formData.projectPermissions,
            userIds: formData.userIds,
            projectWorkFlow: formData.projectWorkFlow.map(stage => stage.title)
        };
        setIsLoading(true);
        try {
            await createProject(projectViewModel, {
                onError: ({ response: result }) => {
                    setIsLoading(false);
                    if (result.data.errors) {
                        const errors = result.data.errors;
                        setProjectNameValidationMessage(errors.projectName ?? errors.projectName);
                        setProjectKeyValidationMessage(errors.projectKey ?? errors.projectKey);
                        setProjectLeadValidationMessage(errors.projectLead ?? errors.projectLead);
                        setProjectDescriptionValidationMessage(errors.projectDescription ?? errors.projectDescription);
                    }
                    if (result.data.message) {
                        HelpersService.notify(result.data.message, "error");
                    }
                    if (result.data.errorMessage) {
                        HelpersService.notify(result.data.errorMessage, "error");
                    }
                },
                onSuccess: () => {
                    setIsLoading(false);
                }
            });

        } catch (error) {
            HelpersService.notify('Something went wrong', "error");
            setIsLoading(false);
        }
    }




    if (loadingUsers) {
        return <div className="flex h-[100vh] justify-center align-center"><CircularProgress /></div>;
    } else if (usersError) {
        return window.location.reload();
    } else {
        return (
            <div>
                <h1 className="">Projects</h1>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabIndex} onChange={handleTabChange}>
                        <Tab label="Add New Project" />
                        <Tab label="Existing Projects" />
                    </Tabs>
                </Box>

                {tabIndex === 0 && (
                    <div>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className=" mt-5 shadow pt-4 px-4 rounded-2">
                                <div className="flex justify-between">
                                    <h1>Workflow</h1>
                                    <button className="ml-auto" onClick={handleAddBox} >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                                <div className="flex-center mt-2">
                                    <Droppable droppableId="workflow" direction="horizontal">
                                        {(provided) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className="flex overflow-auto"
                                            >
                                                {stages.map((stage, index) => (
                                                    <Draggable key={stage.id} draggableId={stage.id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="ml-2 mr-2 shadow text-center min-w-[200px] rounded-lg min-h-[100px]"
                                                            >
                                                                <div className="p-2 bg-[var(--button-primary-color)] flex flex-center rounded-top-2">
                                                                    <TextInput
                                                                        type="text"
                                                                        name="title"
                                                                        value={stage.title}
                                                                        className="mr-2"
                                                                        onChange={(event) => handleTitleChange(event, stage.id)}
                                                                    />
                                                                    <button className="ml-auto" onClick={() => handleRemoveBox(stage.id)}>
                                                                        <i className="fas fa-trash-alt text-danger"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            </div>
                        </DragDropContext>
                        <div className="mt-5 p-3 shadow p-3 rounded-2">
                            <form className="flex justify-between flex-wrap p-3">
                                <div className="relative  mt-3 w-[33%]">
                                    <small className="text-danger text-xs absolute top-[-20px]">{projectNameValidationMessage}</small>
                                    <TextInput type="text" name="projectName" value={formData.projectName} placeholder="Project Name" className="relative" onChange={handleChange} icon="fa-project-diagram" />
                                </div>
                                <div className="relative  mt-3 w-[33%]">
                                    <small className="text-danger text-xs absolute top-[-20px]">{projectKeyValidationMessage}</small>
                                    <TextInput type="text" name="projectKey" value={formData.projectKey} placeholder="Project Key" className="relative" onChange={handleChange} icon="fa-key" />
                                </div>
                                <div className="relative  mt-3 w-[33%]">
                                    <small className="text-danger text-xs absolute top-[-20px]">{projectLeadValidationMessage}</small>
                                    <SelectInput placeholder="Team Leader" selectOptions={users} name="projectLead" value={formData.projectLead} handleSelectChange={(e) => handleSelectChange(e, "projectLead")} className="relative" icon="fa-user" />
                                </div>
                                <div className="relative mt-5 w-[48%]  pl-5 py-2 border rounded-2 pl-2">
                                    <FormControlLabel
                                        label="Project Members"
                                        control={
                                            <Checkbox
                                                checked={checkedMembers.length === users.length}
                                                indeterminate={checkedMembers.length > 0 && checkedMembers.length < users.length}
                                                onChange={() => setCheckedMembers(checkedMembers.length === users.length ? [] : users.map(user => user.value))}
                                            />
                                        }
                                        sx={{
                                            color: "var(--text-primary-color)",
                                            '@media (max-width: 600px)': {
                                                fontSize: '12px !important',
                                            },
                                            '@media (min-width: 601px) and (max-width: 960px)': {
                                                fontSize: '14px !important',
                                            },
                                            '@media (min-width: 961px)': {
                                                fontSize: '15px !important',
                                            },
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', ml: 3 }}>
                                        {users.map(user => (
                                            <FormControlLabel
                                                key={user.value}
                                                label={user.key}
                                                control={
                                                    <Checkbox
                                                        checked={checkedMembers.includes(user.value)}
                                                        onChange={() => handleCheckBoxChange(user.value)}
                                                        sx={{
                                                            color: "var(--text-primary-color)",
                                                            '&.Mui-checked': {
                                                                color: "var(--button-primary-color)",
                                                            },
                                                        }}
                                                    />
                                                }
                                                sx={{
                                                    color: "var(--text-primary-color)",
                                                    '@media (max-width: 600px)': {
                                                        fontSize: '12px !important',
                                                    },
                                                    '@media (min-width: 601px) and (max-width: 960px)': {
                                                        fontSize: '14px !important',
                                                    },
                                                    '@media (min-width: 961px)': {
                                                        fontSize: '15px !important',
                                                    },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </div>
                                <div className="relative w-[48%] mt-5">
                                    <small className="text-danger text-xs absolute top-[-20px]">{projectDescriptionValidationMessage}</small>
                                    <Form.Group className="">
                                        <Form.Control as="textarea" id="projectDescription" name="projectDescription" className="h-[250px]" onChange={handleChange} value={formData.projectDescription} placeholder="Project Description" />
                                    </Form.Group>
                                </div>
                            </form>
                            <div className="flex justify-end mt-3">
                                <PrimaryButton text="Add Project" type="button" onClick={handleSubmit} />
                            </div>
                        </div>
                    </div>
                )}
                {tabIndex === 1 && (
                    <div>
                        hello
                    </div>
                )}

            </div>
        );
    }

};

export default Projects;
