import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import config from '../../../config';
import Avatar from "../../common/components/ui/other/Avatar";
import HelpersService from '../../common/services/HelpersService';

const apiBaseUrl = config.apiBaseUrl;

const UserService = {
    initialFormData: {
        email: '',
        password: '',
        name: '',
        roles: [],
        phoneCode: '+961',
        phoneNumber: ''
    },
    reset: (setFormData, setUserEmailValidationMessage, setPasswordValidationMessage, setUserPhoneValidationMessage, setUserNameValidationMessage) => {
        setFormData(UserService.initialFormData);
        setUserEmailValidationMessage('');
        setPasswordValidationMessage('');
        setUserPhoneValidationMessage('');
        setUserNameValidationMessage('');
    },

    handleRolesSelectChange: (selectedOption, formData, setFormData) => {
        if (selectedOption) {
            setFormData({ ...formData, roles: selectedOption.map((option) => { return option.value; }) });
        }
    },

    handlePhoneSelectChange: (selectedOption, formData, setFormData) => {
        if (selectedOption && selectedOption.value) {
            setFormData({ ...formData, phoneCode: selectedOption.value });
        }
    },

    handleInputChange: (e, formData, setFormData) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    },

    handleDeleteUser: async (userId, deleteUser) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--button-primary-color)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, continue!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteUser(userId);
                } catch (error) {
                    HelpersService.notify('Something went wrong', "error");
                }
            }
        });
    },

    handleEditUser: async (userId, updatedUserData, editUser) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--button-primary-color)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, continue!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const userDataToUpdate = { ...updatedUserData };
                    const data = {
                        email: userDataToUpdate.email,
                        password: "---------------",
                        name: userDataToUpdate.userName,
                        phoneNumber: userDataToUpdate.phoneNumber,
                        phoneCode: '+961',
                        roles: [],
                    }
                    const updateFormData = {
                        data: data,
                        id: userId
                    };
                    await editUser(updateFormData, {
                        onError: ({ response: result }) => {
                            if (result.data.message) {
                                HelpersService.notify(result.data.message, "error");
                            }
                            if (result.data.errorMessage) {
                                HelpersService.notify(result.data.errorMessage, "error");
                            }
                        },
                    });
                } catch (error) {
                    HelpersService.notify('Something went wrong', "error");
                    console.error(error, "error");
                }
            }
        });
    },

    handleSubmits: async (e, formData, setFormData, setIsLoading, setUserNameValidationMessage, setUserEmailValidationMessage, setUserPhoneValidationMessage, setPasswordValidationMessage, addUser) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await addUser(formData, {
                onError: ({ response: result }) => {
                    setIsLoading(false);
                    if (result.data.errors) {
                        const errors = result.data.errors;
                        setUserNameValidationMessage(errors.name && errors.name[0]);
                        setUserEmailValidationMessage(errors.email && errors.email[0]);
                        setPasswordValidationMessage(errors.password && errors.password[0]);
                        setUserPhoneValidationMessage((errors.phoneNumber && errors.phoneNumber[0]) || (errors.phoneCode && errors.phoneCode[0]) || '');
                    }
                    if (result.data.message) {
                        HelpersService.notify(result.data.message, "error");
                    }
                    if (result.data.errorMessage) {
                        HelpersService.notify(result.data.errorMessage, "error");
                    }
                },
                onSuccess: () => {
                    UserService.reset(setFormData, setUserEmailValidationMessage, setPasswordValidationMessage, setUserPhoneValidationMessage, setUserNameValidationMessage);
                    setIsLoading(false);
                }
            });

        } catch (error) {
            HelpersService.notify('Something went wrong', "error");
            setIsLoading(false);
        }
    },
    generateUserTableColumns: (deleteUser, editUser, onlineUsers) => {
        return [
            {
                field: 'avatar',
                headerName: 'Avatar',
                width: 100,
                editable: true,
                renderCell: (params) => {
                    return (
                        <Avatar
                            text={params.row.userName?.charAt(0).toUpperCase()}
                            size="40px"
                            sx={{
                                width: '45px',
                                height: '45px',
                            }}
                            status={onlineUsers?.map(user => user.toString()).includes(params.row.id.toString())}
                        />
                    );
                },
            },
            {
                field: 'userName',
                headerName: 'User Name',
                width: 200,
                editable: true
            },
            {
                field: 'email',
                headerName: 'Email',
                width: 300
            },
            {
                field: 'emailConfirmed',
                headerName: 'Verified',
                width: 100,
                renderCell: (params) => {
                    const isVerified = params.value === true;
                    return (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {isVerified ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />}
                        </div>
                    );
                },
                renderHeader: () => (
                    <div style={{ textAlign: 'center' }}>Verified</div>
                ),
            },
            {
                field: 'phoneNumber',
                headerName: 'Phone Number',
                description: '',
                sortable: false,
                width: 200,
            },
            {
                field: 'createdAt',
                headerName: 'Created At',
                description: '',
                sortable: true,
                width: 200,
            },
            {
                field: 'roles',
                headerName: 'Roles',
                description: '',
                sortable: true,
                width: 200,
            },
            {
                field: 'Action',
                headerName: 'Action',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 100,
                alignment: 'center',
                renderHeader: () => (
                    <div style={{ textAlign: 'right' }}>Action</div>
                ),
                renderCell: (params) => (
                    <div className="border-2 rounded-2 border-[var(--button-primary-color)] text-right" >
                        <DeleteIcon className="text-[red] cursor-pointer " onClick={() => UserService.handleDeleteUser(params.row.id, deleteUser)} />
                        <EditIcon className="text-blue cursor-pointer ml-4 " onClick={() => UserService.handleEditUser(params.row.id, params.row, editUser)} />
                    </div>
                ),
                disableColumnMenu: true
            },
        ]
    }
};

export default UserService;






