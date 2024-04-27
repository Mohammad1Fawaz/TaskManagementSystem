import * as signalR from "@microsoft/signalr";
import AuthService from "./AuthService";
import config from '../../../config';

const baseUrl = config.apiBaseUrl;

const realTimeConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${baseUrl}/notificationHub`, {
        accessTokenFactory: () => {
            const token = AuthService.getToken();
            return token;
        },
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();

realTimeConnection.onclose((error) => {
    console.log("SignalR connection closed." , error);
    if (shouldRestartConnection(error)) {
        console.log("Attempting to restart SignalR connection...");
        realTimeConnection.start()
            .then(() => console.log("SignalR Connected"))
            .catch((err) => console.error("Error restarting SignalR connection:", err));
    } else {
        console.log("SignalR connection not restarted.");
    }
});

function shouldRestartConnection(error) {
    return error && isNetworkError(error);
}

function isNetworkError(error) {
    const errorMessage = error && error.toString().toLowerCase();
    return errorMessage.includes("network") || errorMessage.includes("timeout");
}



const startConnection = async () => {
    try {
        await realTimeConnection.start();
        console.log("SignalR Connected");
    } catch (err) {
        console.error("Error starting SignalR connection:", err);
    }
};
const stopConnection = async () => {
    try {
        await realTimeConnection.stop();
        console.log("SignalR stopped");
    } catch (err) {
        console.error("Error stopping SignalR connection:", err);
    }
};

const invokeMethodSafely = async (methodName, ...args) => {
    if (realTimeConnection.state !== signalR.HubConnectionState.Connected) {
        console.warn("SignalR connection is not open. Attempting to start...");
        await startConnection();
    }

    try {
        return await realTimeConnection.invoke(methodName, ...args);
    } catch (error) {
        console.error(`Error invoking '${methodName}':`, error);
        throw error;
    }
};

const NotificationService = {

    notifyAllAsync: async () => {
        return invokeMethodSafely("NotifyAllAsync");
    },

    notifyAsync: async () => {
        return invokeMethodSafely("NotifyAsync");
    },

    getUnreadNotifications: () => {
        return invokeMethodSafely("GetUnreadNotifications");
    },

    markNotificationsAsReaded: () => {
        return invokeMethodSafely("MarkAllNotificationAsReadAsync");
    },

    startConnection:async () => {
        await startConnection();
    },

    sendOnlineUserNotification: async () => {
        return invokeMethodSafely("SendOnlineUserNotification");
    },

    stopConnection: async () => {
        await stopConnection();
    },

    getOnlineUsers: async () => {
        return invokeMethodSafely("GetOnlineUsers");
    }
};

export { NotificationService, realTimeConnection };
