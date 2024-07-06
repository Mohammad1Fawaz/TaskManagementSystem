import React, { useEffect, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
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
import { setCurrentProject, updateTaskStatus } from '../../common/redux/actions';
const Board = () => {
    const [users, setUsers] = useState([]);
    const [boardData, setBoardData] = useState([]);
    const [filteredBoardData, setFilteredBoardData] = useState([]);
    const [boardProjects, setBoardProjects] = useState([]);
    const [taskTypes, setTaskTypes] = useState([]);
    const [taskPriorities, setTaskPriorities] = useState([]);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [statuses, setStatuses] = useState(null);
    const currentProject = useSelector((state) => state.currentProject);
    const dispatch = useDispatch();

    const { data: fetchedUsers, isLoading: loadingUsers, error: usersError } = useGetRequest('/User/get-users', null, null, true);
    const { data: fetchedBoardWorkFlow, isLoading: loadingWorkFlow, error: workFlowError } = useGetRequest('/Board/get-project-workflow', '', null, true);
    const { data: projects, isLoading: loadingBoardProjects, error: projectsError } = useGetRequest('/Board/get-client-projects', '', null, true);
    const { data: priorities, isLoading: loadingPriorities, error: prioritiesError } = useGetRequest('/Constants/get-task-priorities', '', null, true);
    const { data: types, isLoading: loadingTypes, error: typesError } = useGetRequest('/Constants/get-task-types', '', null, true);
    const userCollaborators = useSelector((state) => state.collaborators);
    const { mutate: createTask } = usePostRequest('/Task/create-task', true, '/Board/get-client-projects');
    const { mutate: updateTask } = useUpdateRequest('/Board/update-task-status', true, '/Board/get-client-projects');
    const onlineUsers = useSelector((state) => state.onlineUsers);

    const typeIcons = {
        Story: {
            icon: <AutoStoriesIcon sx={{ color: green[500], width: 20 }} />,
        },
        Bug: {
            icon: <BugReportIcon sx={{ color: red[500], width: 20 }} />,
        },
        Task: {
            icon: <TaskIcon sx={{ color: blue[500], width: 20 }} />,
        },
        Plan: {
            icon: <CropLandscapeIcon sx={{ color: green[500], width: 20 }} />,
        },
    };

    const priorityIcons = {
        Highest: {
            icon: <KeyboardDoubleArrowRightIcon sx={{ color: red[500], width: 20 }} />,
        },
        High: {
            icon: <KeyboardArrowRightIcon sx={{ color: red[500], width: 20 }} />,
        },
        Medium: {
            icon: <KeyboardArrowRightIcon sx={{ color: amber[500], width: 20 }} />,
        },
        Low: {
            icon: <KeyboardArrowRightIcon sx={{ color: blue[500], width: 20 }} />,
        },
        Lowest: {
            icon: <KeyboardDoubleArrowRightIcon sx={{ color: blue[500], width: 20 }} />,
        },
    };

    useEffect(() => { if (fetchedUsers) { setUsers(fetchedUsers)} }, [fetchedUsers]);

    useEffect(() => {
        if (projects) {
            setBoardProjects(projects.message.boardProjects);
            const selectedProject = projects.message.boardProjects.find(project => project.projectId === currentProject.projectId);
            if (selectedProject) {
                dispatch(setCurrentProject(selectedProject));
            }
        }
    }, [projects, currentProject.projectId, dispatch]);

    useEffect(() => { if (types) { setTaskTypes(types)} }, [types]);
    useEffect(() => { if (priorities) { setTaskPriorities(priorities)} }, [priorities]);
    useEffect(() => { if (fetchedBoardWorkFlow) { setStatuses(fetchedBoardWorkFlow?.message); } }, [fetchedBoardWorkFlow]);
    useEffect(() => {
        const body = document.querySelector('body');
        if (body) {
            body.style.overflowY = 'hidden';
        }
        console.log("onlineUsers", onlineUsers);
    }, [onlineUsers]);
    useEffect(() => {
        if (fetchedBoardWorkFlow && projects) {
            const combinedData = fetchedBoardWorkFlow?.message.map((workflow, index) => {
                return {
                    id: workflow,
                    title: workflow,
                    items: currentProject?.boardTasks?.filter(task => task.status == workflow)
                };
            });
            setBoardData(combinedData);
            setFilteredBoardData(combinedData);
        }
    }, [fetchedBoardWorkFlow, projects, currentProject]);

    const handleDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const column = filteredBoardData.find(col => col.id === source.droppableId);
            const newItems = [...column.items];
            const [removed] = newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, removed);
            const updatedColumns = filteredBoardData.map(col => {
                if (col.id === source.droppableId) {
                    return { ...col, items: newItems };
                }
                return col;
            });
            setFilteredBoardData(updatedColumns);
        } else {
            const sourceColumn = filteredBoardData.find(col => col.id === source.droppableId);
            const destColumn = filteredBoardData.find(col => col.id === destination.droppableId);
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            const updatedColumns = filteredBoardData.map(col => {
                if (col.id === source.droppableId) {
                    return { ...col, items: sourceItems };
                }
                if (col.id === destination.droppableId) {
                    return { ...col, items: destItems };
                }
                return col;
            });
            setFilteredBoardData(updatedColumns);

            const updateFormData = {
                id: currentProject.projectId,
                data: {
                    taskId: removed.taskId,
                    newStatus: destination.droppableId
                }
            }
            await updateTask(updateFormData, {
                onError: ({ response: result }) => {
                    if (result.data.errors) {
                        const errors = result.data.errors;
                    }
                    if (result.data.message) {
                        HelpersService.notify(result.data.message, "error");
                    }
                    if (result.data.errorMessage) {
                        HelpersService.notify(result.data.errorMessage, "error");
                    }
                },
                onSuccess: () => {
                    dispatch(updateTaskStatus(removed.taskId, destination.droppableId));
                    //HelpersService.notify("Task status updated successfully", "success");
                }
            });
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCreateTask = async (task) => {
        await createTask(task, {
            onError: ({ response: result }) => {
                if (result.data.errors) {
                    const errors = result.data.errors;
                }
                if (result.data.message) {
                    HelpersService.notify(result.data.message, "error");
                }
                if (result.data.errorMessage) {
                    HelpersService.notify(result.data.errorMessage, "error");
                }
            },
            onSuccess: () => {
                HelpersService.notify("Task created successfully", "success");
                setIsModalOpen(false);
            }
        });
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setIsTaskModalOpen(true);
    };

    const handleCloseTaskModal = () => {
        setIsTaskModalOpen(false);
        setSelectedTask(null);
    };

    const handleClickAvatarFilter = (userId) => {
        const filteredData = boardData.map(column => {
            return {
                ...column,
                items: column.items.filter(task => task.assigneeId == userId)
            };
        });
        setFilteredBoardData(filteredData);
    }


    if (loadingUsers || loadingWorkFlow) {
        return <div className="flex h-[100vh] justify-center align-center"><CircularProgress /></div>;
    } else if (usersError || workFlowError) {
        return window.location.reload();
    } else {
        return (
            <div className="flex flex-col h-screen overflow-hidden">
                <Box sx={{ fontWeight: 500, fontSize: 18 }} className="pt-2 px-2 flex-none">
                    Projects<KeyboardDoubleArrowRightIcon />
                    <Box component="span" sx={{ fontWeight: 500, fontSize: 18, color: 'var(--button-primary-color)' }}>
                        {currentProject.projectName}
                    </Box>
                    <Box sx={{ fontWeight: 500, fontSize: 18, color: 'var(--button-primary-color)', py: 2 }}>
                        Consolidation 2 & Optimization
                        <Box sx={{ fontWeight: 500, fontSize: 12, overflowWrap: 'anywhere', maxWidth: 1100 }}>
                            {currentProject.projectDescription}
                        </Box>
                    </Box>
                    <Box className="!my-4 flex">
                        {userCollaborators?.map((user) => (
                            <Avatar
                                text={user.userName?.charAt(0).toUpperCase()}
                                size="30px"
                                sx={{
                                    width: '35px',
                                    height: '35px',
                                }}
                                status={Boolean(onlineUsers.includes(user.userId))}
                                key={user.userId}
                                id={user.userId}
                                className={`mx-[1px] cursor-pointer ${user.userId}`}
                                onClick={() => { handleClickAvatarFilter(user.userId); }}
                            />
                        ))}
                        <div className="ml-2">
                            <PrimaryButton onClick={handleOpenModal} text="Create" type="button" className="btn-sm shadow mt-1" />
                            <TaskCreateModal
                                taskTypes={taskTypes}
                                currentProject={currentProject}
                                userCollaborators={userCollaborators}
                                boardProjects={boardProjects}
                                taskPriorities={taskPriorities}
                                isOpen={isModalOpen}
                                onClose={handleCloseModal}
                                onSubmit={handleCreateTask}
                            />
                        </div>
                    </Box>
                </Box>
                <div className="flex-grow overflow-auto max-w-full mb-[4.3rem]">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="flex w-full min-w-full min-h-screen">
                            {filteredBoardData?.map((column) => (
                                <div key={column?.id} className="flex-1 min-w-[260px] flex flex-col mr-2 min-h-screen">
                                    <h2 className="sticky shadow-x top-0 p-3 bg-[var(--board-title-color)] rounded-top-2 z-1">{column?.title}</h2>
                                    <Droppable droppableId={column?.id}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className="flex-grow p-2 bg-[var(--board-color)] rounded-bottom-2 min-h-screen"
                                            >
                                                {column?.items?.map((item, index) => (
                                                    <Draggable key={item?.taskId} draggableId={item?.taskId} index={index}>
                                                        {(dragProvided) => (
                                                            <div
                                                                ref={dragProvided.innerRef}
                                                                {...dragProvided.draggableProps}
                                                                {...dragProvided.dragHandleProps}
                                                                className="p-2 min-h-[80px] mb-2 appCard flex flex-column justify-between"
                                                                onClick={() => handleTaskClick(item)}
                                                            >
                                                                <div>{item.title}</div>
                                                                <div className="flex justify-between align-items-center">
                                                                    <div className="flex align-items-center">
                                                                        <span>
                                                                            {typeIcons[(taskTypes.find(tp => tp.value === item?.taskType)?.key)?.toString()]?.icon}
                                                                        </span>
                                                                        <div className="mt-auto flex justify-between">
                                                                            <span className='text-xs font-semibold ms-2'>{item.taskId}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex align-items-center">
                                                                        <span className='text-[9px] font-semibold ms-2 bg-[var(--main-background-primary-color)] rounded-circle p-1'>
                                                                            {item.progress}
                                                                        </span>
                                                                        <span>
                                                                            {priorityIcons[(taskPriorities.find(tp => tp.value === item?.priority)?.key)?.toString()]?.icon}
                                                                        </span>
                                                                        <Avatar
                                                                            text={users?.find(user => user?.id === item.assigneeId)?.userName?.charAt(0).toUpperCase()}
                                                                            size="40px"
                                                                            sx={{
                                                                                width: '22px',
                                                                                height: '22px',
                                                                            }}
                                                                            className="!inline-block ms-2"
                                                                        />
                                                                    </div>
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
                            ))}
                        </div>
                    </DragDropContext>
                    <TaskModal
                        isOpen={isTaskModalOpen}
                        onClose={handleCloseTaskModal}
                        task={selectedTask}
                        users={users}
                        taskPriorities={taskPriorities}
                        priorityIcons={priorityIcons}
                        statuses={statuses}
                    />
                </div>
            </div>
        );
    }
}

export default Board;
