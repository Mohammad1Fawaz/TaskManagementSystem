import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../../../Services/userService/AuthService';
import { notify } from "../../../utils/notifications";
import { saveToken } from '../../../utils/user';
import PrimaryButton from '../buttons/PrimaryButton';
import MediumLogo from '../images/MainLogo';

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
        <div className="d-flex justify-content-center LoginRegisterContainer ">
            <div className="col-md-3 shadow bg-white px-5 py-4 rounded h-auto">
                <div className="w-100 text-middle mb-2">
                    <MediumLogo />
                </div>
                <form onSubmit={handleSubmit}>
                    <small className="text-danger text-10">{userEmailValidationMessage}</small>
                    <div className="mb-3 position-relative">
                        <input type="email" name="email" className="form-control text-15 pe-5" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                        <i className="fas fa-envelope position-absolute text-center text-middle end-5 top-5  h-95"></i>
                    </div>
                    <small className="text-danger text-10">{userPasswordValidationMessage}</small>
                    <div className="mb-1 position-relative">
                        <input type="password" name="password" className="form-control text-15 pe-5" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                        <i className="fas fa-key position-absolute text-center text-middle end-5 top-5  h-95"></i>
                    </div>
                    <Link to="/ResetPassword" className="text-start d-inline-block text-14 text-main-color mb-3 mt-2 w-100">Forgot password?</Link>
                    <PrimaryButton isLoading={isLoading} text="Login" type="submit" />
                </form>
                <div className="mt-3 w-100">
                    <span className="text-14 text-black">Don&apos;t have an account? </span><Link to="/register" className="text-end d-inline-block text-main-color text-15">Register here.</Link>
                </div>
            </div>
        </div>
    );
}
export default UserLoginForm;
