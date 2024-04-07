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
    const { fetchQuery, handleRequest } = useFetch("POST", "Auth/login", formData, false, "login-query", {}, false);

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
        const { data, isLoading, isSuccess, isError, error, errors } = await handleRequest();
        setIsLoading(isLoading);
        try {
            if (isSuccess) {
                HelpersService.notify(data.message, "success");
                setIsLoading(isLoading);
                AuthService.saveToken(data.token);
                reset();
                const userInfo = await AuthService.getUserInfo(data.token);
                if (userInfo.role.includes("ClientAdmin")) {
                    navigate('/ClientAdmin');
                } else {
                    navigate('/Developer');
                }
            } else {
                if (errors) {
                    setEmailNameValidationMessage(errors.email && errors.email[0]);
                    setPasswordNameValidationMessage(errors.password && errors.password[0]);
                }
                if (isError && error) {
                    HelpersService.notify(error, "error");
                }
                setIsLoading(isLoading);
            }

        } catch (error) {
            HelpersService.notify('Error during Login', "error");
            console.log(error);
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
