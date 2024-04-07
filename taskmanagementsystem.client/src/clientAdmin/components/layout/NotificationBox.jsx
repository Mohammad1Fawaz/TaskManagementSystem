// NotificationBox.js
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const NotificationBox = ({ notifications }) => {
    return (
        <List className ="bg-[var(--main-background-primary-color)]">
            {notifications?.map(notification => (
                <ListItem key={notification.id}>
                    <ListItemText primary={notification.content}  />
                </ListItem>
            ))}
        </List>
    );
};

export default NotificationBox;
