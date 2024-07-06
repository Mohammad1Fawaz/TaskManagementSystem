import {
    ADD_PROJECT,
    ADD_TASK,
    ADD_USER,
    LOGIN_USER,
    LOGOUT_USER,
    ASSIGN_USER_TO_PROJECT,
    ASSIGN_TASK_TO_USER,
    SET_ACTIVE_PAGE,
    RESET_ACTIVE_PAGE,
    SET_USER_PROJECTS,
    SET_USER_COLLABORATORS,
    SET_CURRENT_PROJECT,
    SET_ONLINE_USERS,
    UPDATE_TASK_STATUS
} from './actionTypes';

export const addProject = (project) => ({
    type: ADD_PROJECT,
    payload: project,
});

export const addTask = (projectId, task) => ({
    type: ADD_TASK,
    payload: { projectId, task },
});

export const assignUserToProject = (userId, projectId) => ({
    type: ASSIGN_USER_TO_PROJECT,
    payload: { userId, projectId },
});

export const addUser = (user) => ({
    type: ADD_USER,
    payload: user,
});

export const assignTaskToUser = (userId, taskId) => ({
    type: ASSIGN_TASK_TO_USER,
    payload: { userId, taskId },
});

export const loginUser = (user) => ({
    type: LOGIN_USER,
    payload: user,
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
});

export const setActivePage = (page) => ({
    type: SET_ACTIVE_PAGE,
    payload: page,
});

export const resetActivePage = () => ({
    type: RESET_ACTIVE_PAGE,
});

export const setUserProjects = (projects) => ({
    type: SET_USER_PROJECTS,
    payload: projects,
});

export const setUserCollaborators = (collaborators) => ({
    type: SET_USER_COLLABORATORS,
    payload: collaborators,

});

export const setCurrentProject = (project) => ({
    type: SET_CURRENT_PROJECT,
    payload: project,
});

export const setOnlineUsers = (users) => ({
    type: SET_ONLINE_USERS,
    payload: users,
});

export const updateTaskStatus = (taskId, newStatus) => ({
    type: UPDATE_TASK_STATUS,
    payload: { taskId, newStatus }
});