import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../../../Services/userService/AuthService';
import { notify } from "../../../utils/notifications";
import { saveToken } from '../../../utils/user';
import PrimaryButton from '../buttons/PrimaryButton';
import MediumLogo from '../images/MainLogo';
import TextInput from '../inputs/TextInput';
import PasswordInput from '../inputs/PasswordInput';

const UserLoginForm = () => {
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
            const result = await loginUser(formData);

            if (result.success) {
                notify(result.message, "success");
                setIsLoading(false);
                saveToken(result.token);
                reset();
                //navigate to ...
            } else {
                if (result.errors) {
                    setEmailNameValidationMessage(result.errors.email && result.errors.email[0]);
                    setPasswordNameValidationMessage(result.errors.password && result.errors.password[0]);
                }
                if (result.error) {
                    notify(result.error, "error");
                }
                setIsLoading(false);
            }
        } catch (error) {
            notify('Error during Login', "error");
            setIsLoading(false);
        }
    };
    return (
        <div className="flex-center w-full h-full bg-[url('/src/assets/TaskManagementBg.jpeg')] bg-no-repeat bg-fixed bg-cover bg-center">
            <div className="col-sm-6 col-md-3 shadow bg-white p-4 rounded h-auto">
                <div className="w-full flex-center mb-2">
                    <MediumLogo />
                </div>
                <form onSubmit={handleSubmit}>
                    <small className="text-danger text-xs">{userEmailValidationMessage}</small>
                    <div className="mb-3 relative">
                        <TextInput type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} icon="fa-envelope" />
                    </div>
                    <small className="text-danger text-xs">{userPasswordValidationMessage}</small>
                    <div className="mb-1 relative">
                        <PasswordInput value={formData.password} onChange={handleInputChange} />
                    </div>
                    <Link to="/ResetPassword" className="inline-block text-sm text-main_color mb-3 mt-2 w-fit">Forgot password?</Link>
                    <PrimaryButton isLoading={isLoading} text="Login" type="submit" />
                </form>
                <div className="mt-3 w-full">
                    <span className="text-sm text-black">Don&apos;t have an account? </span><Link to="/register" className="w-fit text-main_color text-sm">Register here.</Link>
                </div>
            </div>
        </div>
    );
}
export default UserLoginForm;
