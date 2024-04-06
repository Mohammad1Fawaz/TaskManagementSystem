import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PrimaryButton from '../../common/components/ui/buttons/PrimaryButton';
import DangerButton from '../../common/components/ui/buttons/DangerButton';
import TextInput from '../../common/components/ui/inputs/TextInput';
import PermisionInput from '../../common/components/ui/inputs/PermissionInput';
import ConstantsService from '../../common/services/ConstantsService';
import RoleService from '../../clientAdmin/services/RoleService';
import AuthService from '../../common/services/AuthService';
import HelpersService from '../../common/services/HelpersService';
import Checkbox from '@mui/material/Checkbox';
import NestedCheckboxRoles from '../../clientAdmin/components/ui/NestedCheckboxRoles';
import Swal from 'sweetalert2';

const Roles = () => {

    const initialFormData = {
        roleName: '',
        permissions: []
    };
    const [formData, setFormData] = useState(initialFormData);
    const [fetched, setFetched] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [claims, setClaims] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [roleNameValidationMessage, setRoleNameValidationMessage] = useState('');
    const [permissionsValidationMessage, setPermissionsValidationMessage] = useState('');

   useEffect(() => {
        const fetchData = async () => {
            try {
                const [permissionsData, rolesData, claimsData] = await Promise.all([
                    ConstantsService.getPermissions(),
                    RoleService.getRoles(),
                    RoleService.getRolesPermissions()
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
            const result = await RoleService.AddRole(formData);
            if (result.success) {
                HelpersService.notify(result.message, "success");
                setIsLoading(false);
                reset();
            } else {
                if (result.errors) {
                    setRoleNameValidationMessage(result.errors.RoleName && result.errors.RoleName[0]);
                    setPermissionsValidationMessage(result.errors.Permissions && result.errors.Permissions[0]);
                }
                if (result.message) {
                    HelpersService.notify(result.message, "error");
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
                    const result = await RoleService.DeleteRole(roleId);
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
    const handleUpdateRole = async (roleId, checkedClaims) => {
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
                    const result = await RoleService.editRole(roleId, checkedClaims);
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
                    <div className="w-[50%] relative">
                        <small className="text-danger text-xs absolute top-[-20px]">{roleNameValidationMessage}</small>
                        <TextInput
                            type="text"
                            value={formData.roleName}
                            onChange={handleInputChange}
                            placeholder="Role name"
                            className="mb-3 relative"
                            name="roleName"
                        />
                    </div>             
                    <div className="w-[50%] relative">
                        <small className="text-danger text-xs absolute top-[-20px]">{permissionsValidationMessage}</small>
                        <PermisionInput
                            permissions={permissions}
                            handleSelectChange={handleSelectChange}
                            className="relative mb-3"
                        />
                    </div>   
                </div>
                <div className="flex ml-auto justify-end mt-2 xs:w-full lg:w-[120px]">
                    <PrimaryButton isLoading={isLoading} type="submit" text="Add Role" className="w-[120px] text-[15px] xs:w-full" />
                </div>
            </form>
            <div className="mt-5 w-full flex justify-between flex-wrap rounded-2 p-1">
                {roles && roles.map((role) => (
                    <div key={role.id} className="mb-3 xs:w-[100%] lg:w-[48%] xl:w-[33%] border p-1 shadow rounded-3">
                        {claims &&
                            <NestedCheckboxRoles
                                parentName={role.name}
                                parentId={role.id}
                                children={claims.filter(claim => claim.roleId === role.id)}
                                onRoleUpdate={handleUpdateRole}
                                handleDeleteRole={handleDeleteRole}
                            />
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Roles;
