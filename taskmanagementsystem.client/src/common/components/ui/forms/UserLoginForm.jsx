import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../../../common/services/AuthService';
import HelpersService from '../../../../common/services/HelpersService';
import { useGetRequest, usePostRequest } from '../../../hooks/useGetRequest';
import PrimaryButton from '../buttons/PrimaryButton';
import MainLogo from '../images/MainLogo';
import PasswordInput from '../inputs/PasswordInput';
import TextInput from '../inputs/TextInput';
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
    const { mutate: loginUser } = usePostRequest('/Auth/login', false);
    const {refetch :refetchUserInfo } = useGetRequest('/Auth/get-user-info', null, null, true, {enabled:false});

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
            await loginUser(formData, {
                onError: ({ response: result }) => {
                    if (result.data.errors) {
                        const errors = result.data.errors;
                        setEmailNameValidationMessage(errors.email && errors.email[0]);
                        setPasswordNameValidationMessage(errors.password && errors.password[0]);
                    }
                    if (result.data.message) {
                        HelpersService.notify(result.data.message, "error");
                    }
                    if (result.data.errorMessage) {
                        HelpersService.notify(result.data.errorMessage, "error");
                    }
                    setIsLoading(false);
                },
                onSuccess: async (data) => {
                    await AuthService.saveTokenAsync(data.token);
                    reset();
                    setIsLoading(false)
                    const { data: userData, isLoading: loadingUserInfo, error: userInfoError } = await refetchUserInfo(data.token);
                    if (userInfoError) {
                        HelpersService.notify('Something wen wrong ... please contact support.', "error");
                        return;
                    }
                    if (!loadingUserInfo) {
                        if (userData.userInfo.role?.includes("ClientAdmin")) {
                            navigate('/ClientAdmin');
                        } else {
                            navigate('/Developer');
                        }
                    }
                }
            });
        } catch (error) {
            HelpersService.notify('Error while Login', "error");
            setIsLoading(false);
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
