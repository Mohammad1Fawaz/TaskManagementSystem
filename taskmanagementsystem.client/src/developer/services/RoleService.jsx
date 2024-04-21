import Swal from 'sweetalert2';
import HelpersService from "../../common/services/HelpersService";

const RoleService = {
    handleSelectChange: (selectedOption, formData, setFormData) => {
        if (selectedOption) {
            setFormData({ ...formData, permissions: selectedOption.map((option) => { return option.value; }) });
        }
    },
    handleInputChange: (e, formData, setFormData) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    },

    handleAddRole: async (e, setIsLoading, formData, setFormData, initialFormData, setRoleNameValidationMessage, setPermissionsValidationMessage, addRole) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await addRole(formData, {
                onError: ({ response: result }) => {
                    setIsLoading(false);
                    if (result.data.errors) {
                        const errors = result.data.errors;
                        setRoleNameValidationMessage(errors.RoleName && errors.RoleName[0]);
                        setPermissionsValidationMessage(errors.Permissions && errors.Permissions[0]);
                    }
                    if (result.data.message) {
                        HelpersService.notify(result.data.message, "error");
                    }
                    if (result.data.errorMessage) {
                        HelpersService.notify(result.data.errorMessage, "error");
                    }
                },
                onSuccess: () => {
                    RoleService.reset(setFormData, initialFormData);
                    setIsLoading(false);
                }
            });
        } catch (error) {
            RoleService.reset(setFormData, initialFormData);
            HelpersService.notify('Something went wrong', "error");
            setIsLoading(false);
        }
    },

    handleDeleteRole: async (roleId, setFormData, initialFormData, deleteRole) => {
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
                    deleteRole(roleId, {
                        onError: ({ response: result }) => {
                            if (result.data.errors) {
                                const errors = result.data.errors;
                                setRoleNameValidationMessage(errors.RoleName && errors.RoleName[0]);
                                setPermissionsValidationMessage(errors.Permissions && errors.Permissions[0]);
                            }
                            if (result.data.message) {
                                HelpersService.notify(result.data.message, "error");
                            }
                            if (result.data.errorMessage) {
                                HelpersService.notify(result.data.errorMessage, "error");
                            }
                        },
                        onSuccess: () => {
                            RoleService.reset(setFormData, initialFormData);
                        }
                    });
                } catch (error) {
                    HelpersService.notify('Something went wrong', "error");
                    console.error(error, "error");
                }
            }
        });
    },
    handleUpdateRole: async (roleId, checkedClaims, setFormData, initialFormData, editRole) => {
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
                    const updateFormData = {
                        data: checkedClaims,
                        id: roleId,
                    };
                    editRole(updateFormData, {
                        onError: ({ response: result }) => {
                            if (result.data.errors) {
                                const errors = result.data.errors;
                                setRoleNameValidationMessage(errors.RoleName && errors.RoleName[0]);
                                setPermissionsValidationMessage(errors.Permissions && errors.Permissions[0]);
                            }
                            if (result.data.message) {
                                HelpersService.notify(result.data.message, "error");
                            }
                            if (result.data.errorMessage) {
                                HelpersService.notify(result.data.errorMessage, "error");
                            }
                        },
                        onSuccess: () => {
                            RoleService.reset(setFormData, initialFormData);
                        }
                    });
                    if (result.success) {
                        HelpersService.notify(result.message, "success");
                        RoleService.reset(setFormData, initialFormData);
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
    },
    reset: (setFormData, initialFormData) => {
        setFormData(initialFormData);
    }
};
export default RoleService;