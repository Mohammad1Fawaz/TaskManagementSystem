import React, { useEffect, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";

import { useDeleteRequest, useGetRequest, usePostRequest, useUpdateRequest } from "../../common/hooks/useGetRequest";
import RolesService from '../../clientAdmin/services/RoleService';
import NestedCheckboxRoles from '../../clientAdmin/components/ui/NestedCheckboxRoles';
import PrimaryButton from '../../common/components/ui/buttons/PrimaryButton';
import PermisionInput from '../../common/components/ui/inputs/PermissionInput';
import TextInput from '../../common/components/ui/inputs/TextInput';

const Roles = () => {
    
    const initialFormData = { roleName: '', permissions: [] };
    const [formData, setFormData] = useState(initialFormData);
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [claims, setClaims] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [roleNameValidationMessage, setRoleNameValidationMessage] = useState('');
    const [permissionsValidationMessage, setPermissionsValidationMessage] = useState('');

    const { data: fetchedPermissions, isLoading: loadingPermissions, error: permissionsError } = useGetRequest('/constants/permissions', null, null, true);
    const { data: fetchedRoles, isLoading: loadingRoles, error: rolesError } = useGetRequest('/Role/get-roles', null, null, true);
    const { data: fetchedRolePermissions, isLoading: loadingRolePermissions, error: rolePermissionsError } = useGetRequest('/Role/get-role-permissions', null, null, true);
    const { mutate: addRole } = usePostRequest('/Role/add-role', true, ['/Role/get-roles', '/Role/get-role-permissions']);
    const { mutate: deleteRole } = useDeleteRequest('/Role/delete-role', true, ['/Role/get-roles', '/Role/get-role-permissions']);
    const { mutate: editRole } = useUpdateRequest('/Role/edit-role', true, ['/Role/get-roles', '/Role/get-role-permissions']);

    useEffect(() => { if (fetchedPermissions) setPermissions(fetchedPermissions); }, [fetchedPermissions]);
    useEffect(() => { if (fetchedRolePermissions) setClaims(fetchedRolePermissions); }, [fetchedRolePermissions]);
    useEffect(() => { if (fetchedRoles) setRoles(fetchedRoles); }, [fetchedRoles]);

    if (loadingPermissions || loadingRoles || loadingRolePermissions) {
        return <div className="flex h-[100vh] justify-center align-center"><CircularProgress /></div>;
    } else if (permissionsError || rolesError || rolePermissionsError) {
        return window.location.reload();
    } else {
        return (
            <div>
                <form className="w-100 appCard p-4 mt-3" onSubmit={(e) => RolesService.handleAddRole(e, setIsLoading, formData, setFormData, initialFormData, setRoleNameValidationMessage, setPermissionsValidationMessage,addRole)}>
                    <div className="flex gap-2">
                        <div className="w-[50%] relative">
                            <small className="text-danger text-xs absolute top-[-20px]">{roleNameValidationMessage}</small>
                            <TextInput type="text" value={formData.roleName} onChange={(e) => RolesService.handleInputChange(e, formData, setFormData)} placeholder="Role name" className="mb-3 relative" name="roleName" />
                        </div>
                        <div className="w-[50%] relative">
                            <small className="text-danger text-xs absolute top-[-20px]">{permissionsValidationMessage}</small>
                            <PermisionInput permissions={permissions} handleSelectChange={(selectedOption) => RolesService.handleSelectChange(selectedOption, formData, setFormData)} className="relative mb-3" />
                        </div>
                    </div>
                    <div className="flex ml-auto justify-end mt-2 xs:w-full lg:w-[120px]">
                        <PrimaryButton isLoading={isLoading} type="submit" text="Add Role" className="w-[120px] text-[15px] xs:w-full" />
                    </div>
                </form>
                <div className="mt-5 w-full flex justify-between flex-wrap rounded-2 p-1">
                    {roles && roles.map((role) => (
                        <div key={role.id} className="mb-3 xs:w-[100%] lg:w-[48%] xl:w-[33%]  p-1 appCard">
                            {claims &&
                             <NestedCheckboxRoles
                                 parentName={role.name}
                                 parentId={role.id}
                                 onRoleUpdate={(roleId, checkedClaims) => RolesService.handleUpdateRole(roleId, checkedClaims, setFormData, initialFormData, editRole)}
                                 handleDeleteRole={(roleId) => RolesService.handleDeleteRole(roleId, setFormData, initialFormData, deleteRole)}
                             >
                                 {claims.filter(claim => claim.roleId === role.id)}
                             </NestedCheckboxRoles>
                            }
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Roles;
