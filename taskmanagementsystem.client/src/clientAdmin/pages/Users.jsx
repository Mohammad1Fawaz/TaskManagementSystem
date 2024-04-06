import { useEffect, useState } from "react";
import UserService from '../../clientAdmin/services/UserService'
import HelpersService from '../../common/services/HelpersService'
import ConstantsService from '../../common/services/ConstantsService'
import TextInput from '../../common/components/ui/inputs/TextInput'
import PasswordInput from '../../common/components/ui/inputs/PasswordInput'
import PhoneInput from '../../common/components/ui/inputs/PhoneInput'
import PrimaryButton from '../../common/components/ui/buttons/PrimaryButton'
import MaterialUiTable from "../../common/components/ui/tables/MaterialUiTable";
import RoleService from "../../clientAdmin/services/RoleService";
import RolesInput from "../../common/components/ui/inputs/RolesInput";
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


const Users = ({ setSelectedItem}) => {
    const initialFormData = {
        email: '',
        password: '',
        name: '',
        roles: [],
        phoneCode: '+961',
        phoneNumber: ''
    };


    const [formData, setFormData] = useState(initialFormData);
    const [updateFormData, setUpdateFormData] = useState(initialFormData);
    const [userEmailValidationMessage, setUserEmailValidationMessage] = useState('');
    const [userPhoneValidationMessage, setUserPhoneValidationMessage] = useState('');
    const [userNameValidationMessage, setUserNameValidationMessage] = useState('');
    const [userPasswordValidationMessage, setPasswordValidationMessage] = useState('');
    const [countries, setCountries] = useState([]);
    const [users, setUsers] = useState([]);
    const [permissions, setpermissions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteIsLoading] = useState(false);


    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await ConstantsService.getCountries();
                setCountries(response);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        const fetchRoles = async () => {
            try {
                const response = await RoleService.getRoles();
                setpermissions(response);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        const fetchUsers = async () => {
            try {
                const response = await UserService.getUsers();
                setUsers(response);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchRoles();
        fetchUsers();
        fetchCountries();

    }, [isLoading, isDeleteLoading]);


    const reset = () => {
        setFormData(initialFormData);
        setUserEmailValidationMessage('');
        setPasswordValidationMessage('');
        setUserPhoneValidationMessage('');
    };

    const handleRolesSelectChange = (selectedOption) => {
        if (selectedOption) {
            setFormData({ ...formData, roles: selectedOption.map((option) => { return option.value; }) });
        }
    };

    const handlePhoneSelectChange = (selectedOption) => {
        if (selectedOption && selectedOption.value) {
            setFormData({ ...formData, phoneCode: selectedOption.value });
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleDeleteUser = async (userId) => {
        setIsDeleteIsLoading(true);
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
                    const result = await UserService.deleteUser(userId);
                    if (result.success) {
                        HelpersService.notify(result.message, "success");
                        setIsDeleteIsLoading(false);
                        reset();
                    } else {
                        if (result.message) {
                            HelpersService.notify(result.message, "error");
                        }
                        setIsDeleteIsLoading(false);
                    }
                } catch (error) {
                    HelpersService.notify('Error during registration', "error");
                    console.error(error, "error");
                    setIsDeleteIsLoading(false);
                }
            }
        });         
    };

    const handleEditUser = async (userId, updatedUserData) => {
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
                    const updateFormData = {
                        email: userDataToUpdate.email,
                        password: "---------------",
                        name: userDataToUpdate.userName,
                        phoneNumber: userDataToUpdate.phoneNumber,
                        phoneCode: '+961',
                        roles: [],
                    };

                    const result = await UserService.editUser(userId, updateFormData);
                    if (result.success) {
                        HelpersService.notify(result.message, "success");
                        reset();
                    } else {
                        if (result.message) {
                            HelpersService.notify(result.message, "error");
                        }
                    }
                } catch (error) {
                    HelpersService.notify('Error during registration', "error");
                    console.error(error, "error");
                }
            }
        });
    };


    const handleSubmits = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await UserService.registerUser(formData);
            if (result.success) {
                HelpersService.notify(result.message, "success");
                setIsLoading(false);
                reset();
            } else {
                if (result.errors) {
                    setUserNameValidationMessage(result.errors.name && result.errors.name[0]);
                    setUserEmailValidationMessage(result.errors.email && result.errors.email[0]);
                    setPasswordValidationMessage(result.errors.password && result.errors.password[0]);
                    setUserPhoneValidationMessage((result.errors.phoneNumber && result.errors.phoneNumber[0]) || (result.errors.phoneCode && result.errors.phoneCode[0]) || '');
                }
                if (result.message) {
                    HelpersService.notify(result.message, "error");
                }
                if (result.errorMessage) {
                    HelpersService.notify(result.errorMessage, "error");
                }
                setIsLoading(false);
            }
        } catch (error) {
            HelpersService.notify('Error during registration', "error");
            console.error(error, "error");
            setIsLoading(false);
        }
    };

    const columns = [
        {
            field: 'avatar',
            headerName: 'Avatar',
            width: 100,
            editable: true,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                        <div className="w-[45px] h-[45px] rounded-[100%] border-2 flex-center p-3 border-[var(--button-primary-color)] font-bold text-lg">{params.row.userName.charAt(0).toUpperCase()}</div>
                    </div>
                );
            },
        },
        {
            field: 'userName',
            headerName: 'User Name',
            width: 160,
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
            width: 150,
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
            width: 120,
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
                    <DeleteIcon className="text-[red] cursor-pointer " onClick={() => handleDeleteUser(params.row.id)} />
                    <EditIcon className="text-blue cursor-pointer ml-4 " onClick={() => handleEditUser(params.row.id, params.row)} />
                </div>
            ),
            disableColumnMenu: true
        },
    ];

    return (
        <div className="">
            <form className="w-full pb-4  flex flex-wrap gap-4 justify-content-between mt-3" onSubmit={handleSubmits}>
                <div className="w-[45%] relative">
                    <small className="text-danger text-xs absolute top-[-20px]">{userNameValidationMessage}</small>
                    <TextInput type="text" className="relative" name="name" placeholder="Username" value={formData.name} onChange={handleInputChange} icon="fa-user" />
                </div>
                <div className="w-[45%] relative">
                    <small className="text-danger text-xs absolute top-[-20px]">{userEmailValidationMessage}</small>
                    <TextInput type="text" className="relative" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} icon="fa-envelope" />
                </div>
                <div className="w-[45%] relative ">
                    <small className="text-danger text-xs absolute top-[-20px]">{userPasswordValidationMessage}</small>
                    <PasswordInput className="relative" name="password" value={formData.password} onChange={handleInputChange} />
                </div>

                <div className="w-[45%] relative">
                    <small className="text-danger text-xs absolute top-[-20px]">{userPhoneValidationMessage}</small>
                    <PhoneInput
                        countries={countries}
                        handleInputChange={handleInputChange}
                        handleSelectChange={handlePhoneSelectChange}
                        phoneNumberValue={formData.phoneNumber}
                        phoneCodeValue={formData.phoneCode}
                        className="relative flex w-[100%]"
                    />
                </div>
                <div className="w-[45%] ">
                    <RolesInput
                        permissions={permissions}
                        handleSelectChange={handleRolesSelectChange}
                        className="w-[100%] relative"
                    />
                </div>

                <div className="d-flex flex-end mt-5">
                    <PrimaryButton isLoading={isLoading} text="Create user" type="submit" width="120px text-[15px]" />
                </div>
            </form>
            <MaterialUiTable columns={columns} rows={users} isLoadingForData={isLoading} dateTimeColumnIndices={[5]} />


        </div>
    );

}

export default Users;