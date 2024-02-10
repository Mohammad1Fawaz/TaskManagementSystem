import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { resetPassword } from '../../../Services/userService/AuthService';
import { notify } from '../../../utils/notifications';
import PrimaryButton from "../buttons/PrimaryButton";
import MediumLogo from "../images/MainLogo";
import DangerButton from '../buttons/DangerButton';

export default function UserResetPasswordForm() {
    let navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
    });
    const [emailValidationMessage, setEmailValidationMessage] = useState('');
    const [phoneNumberValidationMessage, setPhoneNumberValidationMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await resetPassword(formData);
            if (result.success) {
                notify(result.message, "success");
                setIsLoading(false);
                navigate('/login');
            } else {
                if (result.errors) {
                    setEmailValidationMessage(result.errors.email && result.errors.email[0]);
                    setPhoneNumberValidationMessage(result.errors.phoneNumber && result.errors.phoneNumber[0]);
                }
                if (result.error) {
                    notify(result.error, "error");
                }
                setIsLoading(false);
            }
        } catch (err) {
            notify('Error during resseting the password', "error");
            setIsLoading(false);
        }
    }

    function navigateBackHandler() {
        navigate(-1);
    }

    return (<div className="d-flex justify-content-center LoginRegisterContainer ">
        <div className="col-md-3 shadow bg-white px-5 py-4 rounded h-auto">
            <div className="w-100 text-middle mb-2">
                <MediumLogo />
            </div>
            <form onSubmit={handleSubmit}>
                <small className="d-block">Enter your email and phone number to receive your password by email.</small>
                <small className="text-danger text-10">{emailValidationMessage}</small>
                <div className="mt-2 mb-3 position-relative">
                    <input type="text" name="email" className="form-control text-15 pe-5" placeholder="Email" onChange={handleInputChange} />
                    <i className="fas fa-envelope position-absolute text-center end-5 top-20 rounded"></i>
                </div>
                <small className="text-danger text-10">{phoneNumberValidationMessage}</small>
                <div className="mb-3 position-relative">
                    <input type="text" name="phoneNumber" className="form-control text-15 pe-5" placeholder="Phone number" onChange={handleInputChange} />
                    <i className="fas fa-phone position-absolute text-center end-5 top-20 rounded"></i>
                </div>
                <div className="text-middle gap-2 mt-3">
                    <PrimaryButton isLoading={isLoading} text="Verify" type="submit" width="w-50" />
                    <DangerButton width="w-50" onClick={navigateBackHandler} />
                </div>
            </form>
        </div>
    </div>);
}