import { CircularProgress } from "@mui/material/index";
import { useEffect, useState } from "react";
import UserService from '../../clientAdmin/services/UserService';
import PrimaryButton from '../../common/components/ui/buttons/PrimaryButton';
import PasswordInput from '../../common/components/ui/inputs/PasswordInput';
import PhoneInput from '../../common/components/ui/inputs/PhoneInput';
import RolesInput from "../../common/components/ui/inputs/RolesInput";
import TextInput from '../../common/components/ui/inputs/TextInput';
import AuthorizeElement from "../../common/components/ui/other/AuthorizeElement";
import MaterialUiTable from "../../common/components/ui/tables/MaterialUiTable";
import { useGetRequest, useDeleteRequest, useUpdateRequest, usePostRequest } from "../../common/hooks/useGetRequest";


const Users = ({ setSelectedItem }) => {

    const [formData, setFormData] = useState(UserService.initialFormData);
    const [userEmailValidationMessage, setUserEmailValidationMessage] = useState('');
    const [userPhoneValidationMessage, setUserPhoneValidationMessage] = useState('');
    const [userNameValidationMessage, setUserNameValidationMessage] = useState('');
    const [userPasswordValidationMessage, setPasswordValidationMessage] = useState('');
    const [countries, setCountries] = useState([]);
    const [users, setUsers] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { data: fetchedCountries, isLoading: loadingCountries, error: countriesError } = useGetRequest('/constants/countries', null, null, true);
    const { data: roles, isLoading: loadingRoles, error: rolesError } = useGetRequest('/Role/get-roles', null, null, true);
    const { data: fetchedUsers, isLoading: loadingUsers, error: usersError } = useGetRequest('/User/get-users', null, null, true);
    const { mutate: deleteUser } = useDeleteRequest('/User/delete-user', true, '/User/get-users');
    const { mutate: editUser } = useUpdateRequest('/User/edit-user', true, '/User/get-users');
    const { mutate: addUser } = usePostRequest('/User/register', true, '/User/get-users');

    useEffect(() => {
        if (fetchedCountries) {
            setCountries(fetchedCountries);
        }
    }, [fetchedCountries]);

    useEffect(() => {
        if (roles) {
            setPermissions(roles);
        }
    }, [roles]);

    useEffect(() => {
        if (fetchedUsers) {
            setUsers(fetchedUsers);
        }
    }, [fetchedUsers]);


    if (loadingCountries || loadingRoles || loadingUsers) {
        return <div className="flex h-[100vh] justify-center align-center">
                    <CircularProgress />
               </div>;
    }
    else if (countriesError || rolesError || usersError) {
        return window.location.reload();
    } else {
        return (
            <div className="">
                <AuthorizeElement requiredClaims={['Manage Users']}>
                    <form className="w-full shadow rounded-2 mb-5 p-4 flex flex-wrap gap-4 justify-content-between mt-3 xs:flex-col flex-center lg:flex-row" onSubmit={(e) => UserService.handleSubmits(e, formData, setFormData, setIsLoading, setUserNameValidationMessage, setUserEmailValidationMessage, setUserPhoneValidationMessage, setPasswordValidationMessage, addUser)}>
                        <div className="relative xs:w-full lg:w-[45%]">
                            <small className="text-danger text-xs absolute top-[-20px]">{userNameValidationMessage}</small>
                            <TextInput type="text" className="relative" name="name" placeholder="Username" value={formData.name} onChange={(e) => UserService.handleInputChange(e, formData,setFormData)} icon="fa-user" />
                        </div>
                        <div className="relative xs:w-full lg:w-[45%]">
                            <small className="text-danger text-xs absolute top-[-20px]">{userEmailValidationMessage}</small>
                            <TextInput type="text" className="relative" name="email" placeholder="Email" value={formData.email} onChange={(e) => UserService.handleInputChange(e, formData, setFormData)} icon="fa-envelope" />
                        </div>
                        <div className="relative xs:w-full lg:w-[45%]">
                            <small className="text-danger text-xs absolute top-[-20px]">{userPasswordValidationMessage}</small>
                            <PasswordInput className="relative" name="password" value={formData.password} onChange={(e) => UserService.handleInputChange(e, formData, setFormData)} />
                        </div>

                        <div className="relative xs:w-full lg:w-[45%]">
                            <small className="text-danger text-xs absolute top-[-20px]">{userPhoneValidationMessage}</small>
                            <PhoneInput
                                countries={countries}
                                handleInputChange={(e) => UserService.handleInputChange(e, formData, setFormData)}
                                handleSelectChange={(selectedOption) => UserService.handlePhoneSelectChange(selectedOption, formData, setFormData)}
                                phoneNumberValue={formData.phoneNumber}
                                phoneCodeValue={formData.phoneCode}
                                className="relative flex w-[100%]"
                            />
                        </div>
                        <div className="relative xs:w-full lg:w-[45%]">
                            <RolesInput
                                permissions={permissions}
                                handleSelectChange={(selectedOption) => UserService.handleRolesSelectChange(selectedOption,formData,setFormData)}
                                className="w-[100%] relative"
                            />
                        </div>
                        <div className="flex !flex-end sm:w-[45%] relative xs:w-full !mt-2 lg:w-[120px] mt-5">
                            <PrimaryButton isLoading={isLoading} text="Create user" type="submit" className="w-[120px] text-[15px] xs:w-full" />
                        </div>
                    </form>
                </AuthorizeElement>
                <MaterialUiTable columns={UserService.generateUserTableColumns(deleteUser, editUser)} rows={users} isLoadingForData={isLoading} dateTimeColumnIndices={[5]} />
            </div>
        );
    }
}

export default Users;