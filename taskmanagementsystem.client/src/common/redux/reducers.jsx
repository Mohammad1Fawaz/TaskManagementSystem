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
import { combineReducers } from 'redux';

const initialProjectsState = [];
const initialUsersState = [];
const initialLoggedInUserState = {};
const initialActivePageState = 0;
const initialUserProjects = [];
const initialUserCollaborators = [];
const initialCurrentProjectState = {};
const onlineUsers = [];

const projectsReducer = (state = initialProjectsState, action) => {
    switch (action.type) {
        case ADD_PROJECT:
            return [...state, action.payload];
        case ADD_TASK:
            return state.map((project) =>
                project.id === action.payload.projectId
                    ? {
                        ...project,
                        tasks: [...project.tasks, action.payload.task],
                    }
                    : project
            );
        case ASSIGN_USER_TO_PROJECT:
            return state.map((project) =>
                project.id === action.payload.projectId
                    ? {
                        ...project,
                        users: [...project.users, action.payload.userId],
                    }
                    : project
            );
        case UPDATE_TASK_STATUS:
            return state.map((project) =>
                project.id === action.payload.projectId
                    ? {
                        ...project,
                        tasks: project.tasks.map(task =>
                            task.id === action.payload.taskId
                                ? { ...task, status: action.payload.newStatus }
                                : task
                        ),
                    }
                    : project
            );
        default:
            return state;
    }
};

const userReducer = (state = initialUsersState, action) => {
    switch (action.type) {
        case ADD_USER:
            return [...state, action.payload];
        case ASSIGN_TASK_TO_USER:
            return state.map((user) =>
                user.id === action.payload.userId
                    ? {
                        ...user,
                        tasks: [...user.tasks, action.payload.taskId],
                    }
                    : user
            );
        default:
            return state;
    }
};

const loggedInUserReducer = (state = initialLoggedInUserState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return action.payload;
        case LOGOUT_USER:
            return initialLoggedInUserState;
        default:
            return state;
    }
};

const activePageReducer = (state = initialActivePageState, action) => {
    switch (action.type) {
        case SET_ACTIVE_PAGE:
            return action.payload;
        case RESET_ACTIVE_PAGE:
            return initialActivePageState;
        default:
            return state;
    }
};

const userCollaboratorsReducer = (state = initialUserCollaborators, action) => {
    switch (action.type) {
        case SET_USER_COLLABORATORS:
            return action.payload;
        default:
            return state;
    }
};

const currentProjectReducer = (state = initialCurrentProjectState, action) => {
    switch (action.type) {
        case SET_CURRENT_PROJECT:
            return action.payload;
        default:
            return state;
    }
};

const onlineUsersReducer = (state = onlineUsers, action) => {
    switch (action.type) {
        case SET_ONLINE_USERS:
            return action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    projects: projectsReducer,
    user: userReducer,
    loggedInUser: loggedInUserReducer,
    activePage: activePageReducer,
    collaborators: userCollaboratorsReducer,
    currentProject: currentProjectReducer,
    onlineUsers: onlineUsersReducer
});


export default rootReducer;
