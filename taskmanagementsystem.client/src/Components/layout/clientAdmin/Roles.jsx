import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PrimaryButton from "../../ui/buttons/PrimaryButton";
import DangerButton from "../../ui/buttons/DangerButton";
import TextInput from "../../ui/inputs/TextInput";
import PermisionInput from "../../ui/inputs/PermissionInput";
import ConstantsService from "../../../Services/ConstantsService";
import RoleService from "../../../Services/RoleService";
import AuthService from "../../../Services/AuthService";
import HelpersService from "../../../Services/HelpersService";
import Checkbox from "@mui/material/Checkbox";
import NestedCheckboxGroup from "./NestedCheckboxGroup";
import Swal from "sweetalert2";
import useFetch from "../../../hooks/useFetch";
const Roles = () => {
    const initialFormData = {
        roleName: "",
        permissions: [],
    };
    const [formData, setFormData] = useState(initialFormData);
    const [fetched, setFetched] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [claims, setClaims] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [roleNameValidationMessage, setRoleNameValidationMessage] =
        useState("");
    const [permissionsValidationMessage, setPermissionsValidationMessage] =
        useState("");
    const { fetchPermission, handleRequest: getPermissions } = useFetch(
        "GET",
        "constants/permissions",
        {},
        false,
        "permissions-query",
        {},
        false
    );
    const { fetchRoles, handleRequest: getRoles } = useFetch(
        "POST",
        "Role/get-roles",
        roles,
        false,
        "roles-query",
        {},
        true
    );
    const { fetchRolePermissions, handleRequest: getRolePermissions } = useFetch(
        "POST",
        "Role/get-role-permissions",
        {},
        false,
        "roles-permission-query",
        {},
        false
    );
    const { addRole, handleRequest: addRole } = useFetch(
        "POST",
        "Role/add-role",
        roles,
        false,
        "add-role-query",
        {},
        true
    );
    //  const { fetchDeleteRole, handleRequest:deleteRole } = useFetch("DELETE", "Role/add-role",roles, false, "add-role-query", {}, true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { permissionsData } = await getPermissions();
                const { rolesData } = await getRoles();
                const { claimsData } = await getRolePermissions();
                setPermissions(permissionsData);
                setRoles(rolesData);
                setClaims(claimsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const reset = () => {
        setFormData(initialFormData);
    };

    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            setFormData({
                ...formData,
                permissions: selectedOption.map((option) => {
                    return option.value;
                }),
            });
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddRole = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data, isLoading, isSuccess, isError, error, errors } = await addRole();
            if (isSuccess) {
                HelpersService.notify(data.message, "success");
                setIsLoading(isLoading);
                reset();
            } else {
                if (errors) {
                    setRoleNameValidationMessage(errors.RoleName && errors.RoleName[0]);
                    setPermissionsValidationMessage(
                        errors.Permissions && errors.Permissions[0]
                    );
                }
                if (isError && error) {
                    HelpersService.notify(error, "error");
                }
                setIsLoading(isLoading);
            }
        } catch (error) {
            reset();
            HelpersService.notify("Error during registration", "error");
            console.error(error, "error");
            setIsLoading(false);
        }
    };

    const handleDeleteRole = async (roleId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--button-primary-color)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, continue!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // const { data, isLoading, isSuccess, isError, error, errors } = await deleteRole();
                    //                     if (isSuccess) {
                    //                         HelpersService.notify(data.message, "success");
                    //                         reset();
                    //                         setFetched(true);
                    //                     } else {
                    //                         if (isError && error) {
                    //                             HelpersService.notify(error, "error");
                    //                         }
                    //                     }
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
                    HelpersService.notify("Something went wrong", "error");
                    console.error(error, "error");
                }
            }
        });
    };
    const handleUpdateRole = async (roleId, checkedClaims) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--button-primary-color)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, continue!",
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
                    HelpersService.notify("Something went wrong", "error");
                    console.error(error, "error");
                }
            }
        });
    };
    return (
        <div>
            <h1 className="">Roles</h1>
            <form
                className="w-100 p-4 mt-3 shadow rounded-2"
                onSubmit={handleAddRole}
            >
                <div className="flex gap-2">
                    <div className="w-[50%] relative">
                        <small className="text-danger text-xs absolute top-[-20px]">
                            {roleNameValidationMessage}
                        </small>
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
                        <small className="text-danger text-xs absolute top-[-20px]">
                            {permissionsValidationMessage}
                        </small>
                        <PermisionInput
                            permissions={permissions}
                            handleSelectChange={handleSelectChange}
                            className="relative mb-3"
                        />
                    </div>
                </div>
                <div className="w-full flex-end">
                    <PrimaryButton
                        isLoading={isLoading}
                        type="submit"
                        text="Add Role"
                        width="w-[100px] text-[15px] "
                    />
                </div>
            </form>
            <div className="mt-5 flex gap-x-1 gap-y-7 flex-wrap rounded-2 p-1">
                {roles &&
                    roles.map((role) => (
                        <div key={role.id} className="border p-1  w-[33%] shadow rounded-3">
                            {claims && (
                                <NestedCheckboxGroup
                                    parentName={role.name}
                                    parentId={role.id}
                                    children={claims.filter((claim) => claim.roleId === role.id)}
                                    onRoleUpdate={handleUpdateRole}
                                    handleDeleteRole={handleDeleteRole}
                                />
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Roles;
