import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RoleService from '../../../Services/RoleService';
import AuthService from '../../../Services/AuthService';
import PrimaryButton from '../buttons/PrimaryButton';
import TextInput from '../inputs/TextInput';
import PasswordInput from '../inputs/PasswordInput';
import HelpersService from '../../../Services/HelpersService';
import MainLogo from '../images/MainLogo';

const UserLoginForm = () => {
    let navigate = useNavigate();

    const initialFormData = {
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const [userEmailValidationMessage, setEmailNameValidationMessage] = useState('');
    const [userPasswordValidationMessage, setPasswordNameValidationMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);


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

        try {
            const result = await AuthService.login(formData);

            if (result.success) {
                HelpersService.notify(result.message, "success");
                setIsLoading(false);
                AuthService.saveToken(result.token);
                reset();
                const userRole = await RoleService.getUserRoles(result.token);
                if (userRole == "ClientAdmin") {
                    navigate('/ClientAdmin');
                } else {
                    navigate('/Developer');
                }
            } else {
                if (result.errors) {
                    setEmailNameValidationMessage(result.errors.email && result.errors.email[0]);
                    setPasswordNameValidationMessage(result.errors.password && result.errors.password[0]);
                }
                if (result.message) {
                    HelpersService.notify(result.message, "error");
                }
                setIsLoading(false);
            }
        } catch (error) {
            HelpersService.notify('Error during Login', "error");
            console.log(error);
            setIsLoading(false);
        }
    };
    return (
        <div className="flex flex-col justify-content-center  w-full h-full mt-auto mb-auto bg-[url('/src/assets/TaskManagementSystemBg.png')] bg-no-repeat bg-fixed bg-cover bg-center">
            <div className="col-sm-6 ml-[150px] col-md-4 shadow bg-white p-4 rounded h-auto">
                <div className="w-full flex-center mb-2">
                    <MainLogo className="w-[40%]" />
                </div>
                <form onSubmit={handleSubmit}>
                    <small className="text-danger text-xs">{userEmailValidationMessage}</small>
                    <TextInput type="email" name="email" className="mb-3 relative" placeholder="Email" value={formData.email} onChange={handleInputChange} icon="fa-envelope" />
                    <small className="text-danger text-xs">{userPasswordValidationMessage}</small>
                    <PasswordInput className="mb-1 relative" value={formData.password} onChange={handleInputChange} />
                    <Link to="/ResetPassword" className="inline-block text-sm text-main_color mb-3 mt-2 w-fit">Forgot password?</Link>
                    <PrimaryButton isLoading={isLoading} text="Login" type="submit" />
                </form>
                <div className="mt-3 flex justify-between w-full">
                    <div className="text-sm text-black">Don&apos;t have an account? </div><Link to="/register" className="w-fit text-main_color text-sm">Register here.</Link>
                </div>
            </div>
        </div>
    );
}
export default UserLoginForm;
