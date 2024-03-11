import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PrimaryButton from '../../ui/buttons/PrimaryButton';
import DangerButton from '../../ui/buttons/DangerButton';
import TextInput from '../../ui/inputs/TextInput';
import PermisionInput from '../../ui/inputs/PermissionInput';
import ConstantsService from '../../../Services/ConstantsService';
import ClientService from '../../../Services/ClientService';
import AuthService from '../../../Services/AuthService';
import HelpersService from '../../../Services/HelpersService';
import Checkbox from '@mui/material/Checkbox';
import NestedCheckboxGroup from './NestedCheckboxGroup';
import Swal from 'sweetalert2';

const Roles = () => {

    const initialFormData = {
        roleName: '',
        permissions: []
    };
    const [formData, setFormData] = useState(initialFormData);
    const [fetched, setFetched] = useState(false);
    const [newRole, setNewRole] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [claims, setClaims] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userEmailValidationMessage, setEmailNameValidationMessage] = useState('');
    const [userPasswordValidationMessage, setPasswordNameValidationMessage] = useState('');

   useEffect(() => {
        const fetchData = async () => {
            try {
                const [permissionsData, rolesData, claimsData] = await Promise.all([
                    ConstantsService.getPermissions(),
                    AuthService.getRoles(),
                    AuthService.getRolesPermissions()
                ]);
                setPermissions(permissionsData);
                setRoles(rolesData);
                setClaims(claimsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
   }, [isLoading, fetched]);

    const reset = () => {
        setFormData(initialFormData);
    }
    
    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            setFormData({ ...formData, permissions: selectedOption.map((option) => { return option.value; }) });
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddRole = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await AuthService.AddRole(formData);
            if (result.success) {
                HelpersService.notify(result.message, "success");
                setIsLoading(false);
                reset();
            } else {
                if (result.errors) {
                    setEmailNameValidationMessage(result.errors.roleName && result.errors.roleName[0]);
                    setPasswordNameValidationMessage(result.errors.permissions && result.errors.permissions[0]);
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
            reset();
            HelpersService.notify('Error during registration', "error");
            console.error(error, "error");
            setIsLoading(false);
        }
    };

    const handleDeleteRole = async (roleId) => {
        console.log("role", roleId);
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
                    const result = await AuthService.DeleteRole(roleId);
                    if (result.success) {
                        HelpersService.notify(result.message, "success");
                        reset();
                        setFetched(true);
                    } else {
                        if (result.message) {
                            HelpersService.notify(result.message, "error");
                        }
                    }
                } catch (error) {
                    HelpersService.notify('Something went wrong', "error");
                    console.error(error, "error");
                }
            }
        });             
    }
    return (
        <div>
            <h1 className="" >Roles</h1>
            <form className="w-100 p-4 mt-3 shadow rounded-2" onSubmit={handleAddRole}>
                <div className="flex gap-2">
                    <TextInput
                        type="text"
                        value={formData.roleName}
                        onChange={handleInputChange}
                        placeholder="Role name"
                        className="w-[50%] mb-3"
                        name="roleName"
                    />
                    <PermisionInput
                        permissions={permissions}
                        handleSelectChange={handleSelectChange}
                        className="w-[50%] relative mb-3"
                    />
                </div>
                <div className="w-full flex-end">
                    <PrimaryButton isLoading={isLoading} type="submit" text="Add Role" width="w-[100px] text-[15px] " />
                </div>
            </form>
            <div className="mt-5 flex gap-1 flex-wrap shadow rounded-2 p-2">           
                {roles && roles.map((role) => (
                    <div key={role.id} className="border p-1  w-[33%] shadow rounded-3">
                        {claims &&
                            <NestedCheckboxGroup
                            parent={role.name}
                            children={claims.filter(claim => { return (claim.roleId === role.id) })}
                            actionButton={<button className="w-[5%] text-center" value={role.id} onClick={() => { handleDeleteRole(role.id) }} ><i className="fas fa-trash-alt text-[var(--text-primary-color)]"></i></button>} />    
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Roles;

