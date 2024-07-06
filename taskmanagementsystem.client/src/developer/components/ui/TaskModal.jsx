import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import TextInput from '../../../common/components/ui/inputs/TextInput';
import TaskDescriptionEditor from '../ui/TaskDescriptionEditor';
import PrimaryButton from '../../../common/components/ui/buttons/PrimaryButton';
import PopoverDropdown from '../../../common/components/ui/inputs/PopoverDropdown';
import Avatar from '../../../common/components/ui/other/Avatar';
import SelectInput from '../../../common/components/ui/inputs/SelectInput';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { green, amber, orange, red, grey, blue } from '@mui/material/colors';
import BugReportIcon from '@mui/icons-material/BugReport';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TaskIcon from '@mui/icons-material/Task';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import { Editor } from '@tinymce/tinymce-react';

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

const Fade = React.forwardRef(function Fade(props, ref) {
    const {
        children,
        in: open,
        onEnter,
        onExited,
        ...other
    } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.node.isRequired,
    in: PropTypes.bool,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: 'flex',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    height: '90vh',
    bgcolor: 'var(--main-background-primary-color)',
    borderRadius: '5px',
    boxShadow: 24,
    py: 4,
    px: 3,
};

export default function TaskModal({ task, isOpen, onClose, users, changeTaskAssignee, taskPriorities, setTask, statuses }) {
    const modalRef = React.useRef(null);
    const [showCommentEditor, setShowCommentEditor] = React.useState(false);
    const [showDescriptionEditor, setShowDescriptionEditor] = React.useState(false);
    const [comment, setComment] = React.useState("");

    const handleBackdropClick = (event) => {
        if (modalRef.current && modalRef.current.contains(event.target)) {
            return;
        }
        onClose();
    };

    const stripHtmlTags = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const handleEditorChange = (content) => {
        setComment(content);
    };

    const handleOpenDescriptionEditor = () => {
        setShowDescriptionEditor(true);
    };

    const closeDescriptionEditor = () => {
        setShowDescriptionEditor(false);
    };


    const handleInputClick = () => {
        setShowCommentEditor(true);
    };

    const closeCommentEditor = () => {
        setShowCommentEditor(false);
    };

    const handleSaveComment = () => {
        // Save the comment logic here
        console.log("Comment saved:", comment);
        setShowCommentEditor(false);
    };

    const [thisTask, setThisTask] = React.useState(task)

    const dropdownOptions = users.map(project => ({
        key: (
            <div className='flex align-items-center'>
                <Avatar
                    text={project.userName.charAt(0).toUpperCase()}
                    sx={{ width: '35px', height: '35px', marginRight: '8px' }}
                    className="me-2"
                />
                {project.userName}
            </div>
        ),
        value: project.userId,
    }));

    const handleSelectChange = (name) => (selectedOption) => {
        setTask((prevTask) => ({
            ...prevTask,
            [name]: selectedOption ? selectedOption.value : '',
        }));
    };

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isOpen}
                onClick={handleBackdropClick}
            >
                <Fade in={isOpen}>
                    <Box ref={modalRef} sx={modalStyle} className="shadow">
                        <Box className="w-[70%] h-full overflow-y-auto pr-2 border-r-2">
                            <h6 id="spring-modal-title" className="mb-3">
                                {task?.taskId}
                            </h6>
                            <TextInput className="mb-3 text-center" value={task?.title} onChange={() => { console.log("hello") }} />
                            <Grid item xs={12} sx={{ my: 4 }}>
                                Description
                                {showDescriptionEditor ? (
                                    <div className='flex flex-column w-full !min-h-[10vh]'>
                                        <TaskDescriptionEditor setTask={setThisTask} initialValue={task?.description} />
                                        <div className='mt-2'>
                                            <PrimaryButton text='save' type='button' className='btn-sm w-[10%] me-2' />
                                            <PrimaryButton text='cancle' type='button' className='btn-sm w-[10%]' onClick={closeDescriptionEditor} />
                                        </div>
                                    </div>
                                ) : (
                                        <div className="flex appCard p-2" onClick={handleOpenDescriptionEditor}>
                                            {stripHtmlTags(task?.description)}
                                        </div>
                                )}
                            </Grid>
                            <div className="mb-3 mt-3">
                                Attachments
                                <div className="flex mt-2 appCard">
                                </div>
                            </div>
                            <div>
                                Activity
                            </div>
                            <Grid item xs={12} sx={{my: 4 }} className="w-full mt-2 appCard">
                                {showCommentEditor ? (
                                    <div className='flex flex-column w-full !min-h-[10vh]'>
                                        <TaskDescriptionEditor setTask={setThisTask} initialValue={task?.description} handleEditorChange={handleEditorChange} />
                                        <div className='mt-2'>
                                            <PrimaryButton text='save' type='button' className='btn-sm w-[10%] me-2' />
                                            <PrimaryButton text='cancle' type='button' className='btn-sm w-[10%]' onClick={closeCommentEditor} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex">
                                        <Avatar
                                            text={users?.find(user => user.id == task?.assigneeId)?.userName.charAt(0).toUpperCase()}
                                            sx={{ width: '25px', height: '25px', marginRight: '8px' }}
                                            className=""
                                        />
                                       <TextInput placeholder="Add a comment" type="text" name="taskComment" className="w-full" onClick={handleInputClick} />
                                    </div>
                                )}
                                <div className='flex flex-column w-full mt-2 p-2 appCard'>
                                    <div className="flex mt-3">
                                        <Avatar
                                            text={users?.find(user => user.id == task?.assigneeId)?.userName.charAt(0).toUpperCase()}
                                            sx={{ width: '25px', height: '25px', marginRight: '8px' }}
                                            className=""
                                        /><p>get comments for this task to reder them  here</p>
                                    </div>
                                    <div className="flex mt-3">
                                        <Avatar
                                            text={users?.find(user => user.id == task?.assigneeId)?.userName.charAt(0).toUpperCase()}
                                            sx={{ width: '25px', height: '25px', marginRight: '8px' }}
                                            className=""
                                        /><p>get comments for this task to reder them  here</p>
                                    </div>
                                    <div className="flex mt-3">
                                        <Avatar
                                            text={users?.find(user => user.id == task?.assigneeId)?.userName.charAt(0).toUpperCase()}
                                            sx={{ width: '25px', height: '25px', marginRight: '8px' }}
                                            className=""
                                        /><p>get comments for this task to reder them  here</p>
                                    </div>
                                </div>
                            </Grid>
                        </Box>
                        <Box sx={{ ml: 3 }} className="w-[30%] h-full overflow-y-auto">
                            <PopoverDropdown
                                btnText={task?.status}
                                className=""
                                contentClassName="!w-[250px]"
                                selectedValue={task?.status}
                                handleSelect={changeTaskAssignee}
                                dropdownContent={statuses?.map(status => ({
                                    key: status,
                                    value: status,
                                }))}
                                popoverPosition="left"
                                btnClassName="btn-sm"
                            />
                            <h6 className="my-3">Details</h6>
                            <div className="mt-3 appCard p-3" key={task?.taskId}>
                                <div className="flex align-items-center mt-3">
                                    <label className="mr-1 flex align-items-center ">
                                        <h6 className="me-1 text-sm">Assignee</h6>
                                        <Avatar
                                            text={users?.find(user => user.id == task?.assigneeId)?.userName.charAt(0).toUpperCase()}
                                            sx={{ width: '25px', height: '25px', marginRight: '8px' }}
                                            className=""
                                        />
                                    </label>
                                    <PopoverDropdown
                                        btnText={users?.find(user => user?.id == task?.assigneeId)?.userName}
                                        className=""
                                        contentClassName="!w-[250px]"
                                        selectedValue={task?.assigneeId}
                                        handleSelect={changeTaskAssignee}
                                        dropdownContent={dropdownOptions}
                                        popoverPosition="right"
                                        btnClassName="btn-sm"
                                    />
                                </div>
                                <div className="flex  align-items-center mt-3">
                                    <label className="mr-1 flex align-items-center ">
                                        <h6 className="me-1 text-sm">priority</h6>
                                    </label>
                                    <PopoverDropdown
                                        btnText={taskPriorities?.find(user => user?.value == task?.priority)?.key}
                                        className=""
                                        contentClassName="!w-[100px]"
                                        selectedValue={task?.priority}
                                        handleSelect={changeTaskAssignee}
                                        dropdownContent={taskPriorities?.map(priority => ({
                                            key: (
                                                <div className='flex align-items-center'>
                                                    {priorityIcons[(priority?.key)?.toString()]?.icon}
                                                    {priority.key}
                                                </div>
                                            ),
                                            value: priority.value,
                                        }))}
                                        popoverPosition="left"
                                        btnClassName="btn-sm"
                                    />

                                </div>
                                <div className="flex  align-items-center mt-3">
                                    <label className="mr-1 flex align-items-center ">
                                        <h6 className="me-1 text-sm">story points</h6>
                                    </label>
                                    <TextInput className="w-[50%]" placeholder="story points" value={task?.progress} onChange={() => { console.log("hello") }} />
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Fade>
            </Backdrop>
        </div>
    );
}
