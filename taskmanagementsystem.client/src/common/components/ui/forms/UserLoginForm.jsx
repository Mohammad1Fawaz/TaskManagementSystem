import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RoleService from '../../../../clientAdmin/services/RoleService';
import AuthService from '../../../../common/services/AuthService';
import PrimaryButton from '../buttons/PrimaryButton';
import TextInput from '../inputs/TextInput';
import PasswordInput from '../inputs/PasswordInput';
import HelpersService from '../../../../common/services/HelpersService';
import MainLogo from '../images/MainLogo';
import useFetch from '../../../hooks/useFetch';
const UserLoginForm = () => {
    let navigate = useNavigate();

    const initialFormData = {
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);

    const [userEmailValidationMessage, setEmailNameValidationMessage] = useState('');
    const [userPasswordValidationMessage, setPasswordNameValidationMessage] = useState('');
    const { mutate } = useFetch("login-query", {}, false);
    const { fetchedData } = useFetch(['roles-query','Role/get-role'], {}, true);

    const reset = () => {
        setFormData(initialFormData);
        setEmailNameValidationMessage('');
        setPasswordNameValidationMessage('');
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const variables = {
            endPoint: 'Auth/login',
            method: 'POST',
            requestData: formData
        };
        const response = await mutate.mutateAsync(variables);
        const data=response.data
        try {
            if (data.success ) {
                HelpersService.notify(data.message, "success");
                setIsLoading(mutate.isLoading);
                AuthService.saveToken(data.token);
                reset();
                const userInfo = await AuthService.getUserInfo(data.token);
                if (userInfo.role.includes("ClientAdmin")) {
                    navigate('/ClientAdmin');
                } else {
                    navigate('/Developer');
                }
            } else {
                if (data.errors) {
                    setEmailNameValidationMessage(data.errors.email && data.errors.email[0]);
                    setPasswordNameValidationMessage(data.errors.password && data.errors.password[0]);
                }
                if(!data.success){
                    HelpersService.notify(data.message, "error");
                }
            }
            setIsLoading(mutate.isLoading);

        } catch (error) {
            console.log('went to catch',error)
            HelpersService.notify('Error during Login', "error");
            setIsLoading(isLoading);
        }
    };

    return (
        <>
            <div className="w-full flex-center mb-2">
                <MainLogo className="w-[40%]" />
            </div>
            <form onSubmit={handleSubmit}>
                <small className="text-danger text-xs">{userEmailValidationMessage}</small>
                <TextInput type="email" name="email" className="mb-3 relative" placeholder="Email" value={formData.email} onChange={handleInputChange} icon="fa-envelope" />
                <small className="text-danger text-xs">{userPasswordValidationMessage}</small>
                <PasswordInput className="mb-1 relative" value={formData.password} onChange={handleInputChange} />
                <Link to="/ResetPassword" className="inline-block text-sm text-main_color mb-3 mt-2 w-fit">Forgot password?</Link>
                <PrimaryButton isLoading={isLoading} text="Login" type="submit" className="w-full" />
            </form>
            <div className="mt-3 flex justify-between w-full">
                <div className="text-sm">Don&apos;t have an account? </div><Link to="/register" className="w-fit text-main_color text-sm">Register here.</Link>
            </div>
        </>
    );
}
export default UserLoginForm;
