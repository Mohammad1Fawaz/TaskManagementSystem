import React, { useEffect, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useDeleteRequest, useGetRequest, usePostRequest, useUpdateRequest } from "../../common/hooks/useGetRequest";

import Avatar from '../../common/components/ui/other/Avatar';

const Board = ({ onlineUsers }) => {

    const [users, setUsers] = useState([]);
    const { data: fetchedUsers, isLoading: loadingUsers, error: usersError } = useGetRequest('/User/get-users', null, null, true);

    useEffect(() => { if (fetchedUsers) { setUsers(fetchedUsers); console.log(users) } }, [fetchedUsers]);
    useEffect(() => {
        const rootElement = document.querySelector('#root');
        if (rootElement) {
            rootElement.style.overflowY = 'hidden';
            rootElement.classList.add('scrollbar-bottom');
        }
    }, []);

    const [boardData, setBoardData] = useState([
        { id: 'todo', title: 'To Do', items: ['Task 1', 'Task 2', 'Task 3'] },
        { id: 'pending', title: 'Pending', items: ['Task 4', 'Task 5'] },
        { id: 'inProgress', title: 'In Progress', items: ['Task 6', 'Task 7'] },
        { id: 'codeReview', title: 'Code Review', items: ['Task 8', 'Task 9', 'Task 10'] },
        { id: 'toDeployQa', title: 'To Deploy QA', items: ['Task 11', 'Task 12', 'Task 13'] },
        { id: 'qa', title: 'QA', items: ['Task 14', 'Task 15', 'Task 16'] },
        { id: 'toDeplyDev', title: 'To Deploy Dev', items: ['Task 17', 'Task 18', 'Task 19'] },
        { id: 'done', title: 'Done', items: ['Task 20', 'Task 21', 'Task 22'] },
    ]);
    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const column = boardData.find(col => col.id === source.droppableId);
            const newItems = [...column.items];
            const [removed] = newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, removed);
            const updatedColumns = boardData.map(col => {
                if (col.id === source.droppableId) {
                    return { ...col, items: newItems };
                }
                return col;
            });
            setBoardData(updatedColumns);
        } else {
            const sourceColumn = boardData.find(col => col.id === source.droppableId);
            const destColumn = boardData.find(col => col.id === destination.droppableId);
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            const updatedColumns = boardData.map(col => {
                if (col.id === source.droppableId) {
                    return { ...col, items: sourceItems };
                }
                if (col.id === destination.droppableId) {
                    return { ...col, items: destItems };
                }
                return col;
            });
            setBoardData(updatedColumns);
        }
    };

    if (loadingUsers) {
        return <div className="flex h-[100vh] justify-center align-center"><CircularProgress /></div>;
    } else if (usersError) {
        return window.location.reload();
    } else {
        return (
            <div className="flex flex-col h-screen mt-8">
                <div className="h-[20%] py-5 px-2">
                    <div className="flex">
                        {users?.map((user) => (
                            <Avatar
                                text={user.userName?.charAt(0).toUpperCase()}
                                size="30px"
                                sx={{
                                    width: '35px',
                                    height: '35px',
                                }}
                                status={onlineUsers?.map(user => user.toString()).includes(user.id.toString())}
                                key={user.id}
                                className="mx-[1px]"
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-grow overflow-auto mb-[63px]">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        {boardData.map((column) => (
                            <div key={column.id} className="px-2  min-w-[260px]">
                                <h2 className="sticky rounded-top-2 top-0 p-2 bg-[#161a1d]">{column.title}</h2>
                                <Droppable droppableId={column.id}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="bg-[#161a1d] p-2 rounded-bottom-2 min-h-[150px]"
                                        >
                                            {column.items.map((item, index) => (
                                                <Draggable key={item} draggableId={item} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="bg-[var(--main-background-primary-color)] p-2 mb-2 rounded"
                                                        >
                                                            {item}
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
                    </DragDropContext>
                </div>
            </div>
        );
    }
}

export default Board;
