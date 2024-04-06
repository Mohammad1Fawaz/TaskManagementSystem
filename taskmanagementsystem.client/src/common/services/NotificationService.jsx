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

realTimeConnection.onclose(() => {
    console.log("SignalR connection closed . trying to restart ...");
    realTimeConnection.start()
        .then(() => console.log("SignalR Connected"))
        .catch((err) => console.error("Error starting SignalR connection:", err));
});

const startConnection = async () => {
    try {
        await realTimeConnection.start();
        console.log("SignalR Connected");
    } catch (err) {
        console.error("Error starting SignalR connection:", err);
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

};

export { NotificationService, realTimeConnection };
