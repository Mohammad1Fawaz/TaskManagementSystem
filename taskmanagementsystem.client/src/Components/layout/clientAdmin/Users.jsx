import { useEffect, useState } from "react";
import UserService from '../../../Services/UserService'
import HelpersService from '../../../Services/HelpersService'
import ConstantsService from '../../../Services/ConstantsService'
import TextInput from '../../../Components/ui/inputs/TextInput'
import PasswordInput from '../../../Components/ui/inputs/PasswordInput'
import PhoneInput from '../../../Components/ui/inputs/PhoneInput'
import PrimaryButton from '../../../Components/ui/buttons/PrimaryButton'
import MaterialUiTable from "../../ui/tables/MaterialUiTable";
import RoleService from "../../../Services/RoleService";
import RolesInput from "../../ui/inputs/RolesInput";
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import useFetch from "../../../hooks/useFetch";

const Users = ({ setSelectedItem }) => {
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
    const {fetchedData}=useFetch(['countries-query','constants/countries'],{},false);
    const { mutate: getRoles } = useFetch("roles-query", {}, true);
    const { mutate: getUsers } = useFetch("users-query", {}, true);
    const {mutate}=useFetch("register-query", {}, true);
    const { mutate:deleteUser } = useFetch("delete-user-query", {}, true);
    const { mutate:editUser } = useFetch("edit-user-query", {}, true);
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetchedData.refetch('constants/countries');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        const fetchRoles = async () => {
            try {
                const variablesRole = {
                    endPoint: 'Role/get-roles',
                    method: 'POST',
                };
                const rolesData = await getRoles.mutateAsync(variablesRole);
                setpermissions(rolesData.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        const fetchUsers = async () => {
            try {
                const variablesRole = {
                    endPoint: 'User/get-users',
                    method: 'POST',
                };
                const usersData = await getUsers.mutateAsync(variablesRole);
                setpermissions(usersData.data);
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
                    const variables = {
                        endPoint: 'Role/delete-role',
                        method: 'DELETE',
                        requestParam:userId
                    };
                    const response = await deleteUser.mutateAsync(variables);
                    const result = response.data;
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
                    const variables = {
                        endPoint: 'User/edit-user',
                        method: 'POST',
                        requestData:updateFormData,
                        requestParam:userId
                    };
                    const response = await editUser.mutateAsync(variables);
                    const result = response.data;
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
        const variables={
            endPoint: 'Client/register',
            method: 'POST',
            requestData: formData
        };
        const response= await mutate.mutateAsync(variables);
        const data= response.data;
        setIsLoading(mutate.isLoading);
        try {
            if (data.success) {
                HelpersService.notify(data.message, "success");
                setIsLoading(mutate.isLoading);
                reset();
                //navigate to page ...
            } else {
                if (data.errors) {
                    setCompanyNameValidationMessage(data.errors.companyName && data.errors.companyName[0]);
                    setEmailNameValidationMessage(data.errors.email && data.errors.email[0]);
                    setPasswordNameValidationMessage(data.errors.password && data.errors.password[0]);
                    setPhoneNumberNameValidationMessage((data.errors.phoneNumber && data.errors.phoneNumber[0]) || (data.errors.phoneCode && data.errors.phoneCode[0]) || '');
                }
                if (data.message) {
                    HelpersService.notify(data.message, "error");
                }
                setIsLoading(mutate.isLoading);
            }
        } catch (error) {
            HelpersService.notify('Error during registration', "error");
            setIsLoading(mutate.isLoading);
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
            width: 130,
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
            width: 100,
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
            <form className="w-full pb-4 w-full d-flex flex-wrap gap-4 justify-between mt-3" onSubmit={handleSubmits}>
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