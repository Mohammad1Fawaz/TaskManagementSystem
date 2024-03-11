import { useEffect, useState } from "react";
import UserService from '../../../Services/UserService'
import HelpersService from '../../../Services/HelpersService'
import ConstantsService from '../../../Services/ConstantsService'
import TextInput from '../../../Components/ui/inputs/TextInput'
import PermissionInput from '../../../Components/ui/inputs/PermissionInput'
import PasswordInput from '../../../Components/ui/inputs/PasswordInput'
import PhoneInput from '../../../Components/ui/inputs/PhoneInput'
import PrimaryButton from '../../../Components/ui/buttons/PrimaryButton'
import MaterialUiTable from "../../ui/tables/MaterialUiTable";
import AuthService from "../../../Services/AuthService";
import RolesInput from "../../ui/inputs/RolesInput";
const Users = ({setSelectedItem }) => {
    const initialFormData = {
        email: '',
        password: '',
        name: '',
        roles: [],
        phoneCode: '+961',
        phoneNumber:''
    };

    
    const [formData, setFormData] = useState(initialFormData);
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
                const response = await AuthService.getRoles();
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
    }, [isLoading]);

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
        // if i want to navigate to another item in trhe side bar
        //setSelectedItem(1);
        setIsDeleteIsLoading(true);
        try {
            const result = await UserService.deleteUser(userId);
            if (result.success) {
                HelpersService.notify(result.message, "success");
                setIsDeleteIsLoading(false);
                reset();
            } else {
                if (result.errors) {
                    //setUserNameValidationMessage(result.errors.name && result.errors.name[0]);
                    //setUserEmailValidationMessage(result.errors.email && result.errors.email[0]);
                    //setPasswordValidationMessage(result.errors.password && result.errors.password[0]);
                    //setUserPhoneValidationMessage((result.errors.phoneNumber && result.errors.phoneNumber[0]) || (result.errors.phoneCode && result.errors.phoneCode[0]) || '');
                }
                if (result.message) {
                    HelpersService.notify(result.message, "error");
                }
                if (result.errorMessage) {
                    HelpersService.notify(result.errorMessage, "error");
                }
                setIsDeleteIsLoading(false);
            }
        } catch (error) {
            HelpersService.notify('Error during registration', "error");
            console.error(error, "error");
            setIsDeleteIsLoading(false);
        }
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

    const headCells = [
        {
            id: 'userName',
            numeric: false,
            disablePadding: true,
            label: 'Username',
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: false,
            label: 'Email',
        },
        {
            id: 'emailConfirmed',
            numeric: false,
            disablePadding: false,
            label: 'Verified',
        },
    ];
    return (
        <div className="">
            <form className="w-full pb-4 w-full d-flex flex-wrap gap-4 justify-between mt-3" onSubmit={handleSubmits}>
                <div className="w-[45%] ">
                    <small className="text-danger text-xs">{userNameValidationMessage}</small>
                    <TextInput type="text" className="relative" name="name" placeholder="Username" value={formData.name} onChange={handleInputChange} icon="fa-user" />
                </div>
                <div className="w-[45%] ">
                    <small className="text-danger text-xs">{userEmailValidationMessage}</small>
                    <TextInput type="text" className="relative" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} icon="fa-envelope" />
                </div>
                <div className="w-[45%] ">
                    <small className="text-danger text-xs">{userPasswordValidationMessage}</small>
                    <PasswordInput className="relative" name="password" value={formData.password} onChange={handleInputChange} />
                </div>
                
                <div className="w-[45%] ">
                    <small className="text-danger text-xs">{userPhoneValidationMessage}</small>
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
            <MaterialUiTable rows={users} headCells={headCells} withAction={true} action={handleDeleteUser} actionLoader={isDeleteLoading} title="Users" />

        </div>
    );

}

export default Users;