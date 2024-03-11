import React, { useState } from 'react';
import { useParams, useLocation,useNavigate } from 'react-router-dom';
import HelpersService from '../../../Services/HelpersService';
import AuthService from '../../../Services/AuthService';
import UserService from '../../../Services/UserService';
import TextInput from '../inputs/TextInput';
import PrimaryButton from '../buttons/PrimaryButton';
import MainLogo from '../images/MainLogo';

const VerificationForm = ({ onSubmit }) => {

    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const userId = new URLSearchParams(location.search).get('userId');
    const initialFormData = {
        email: '',
        verificationCode: '',
        userId: userId,
    };
    const [formData, setFormData] = useState(initialFormData);
    const [userEmailValidationMessage, setUserEmailValidationMessage] = useState('');
    const [userVerificationPageValidationMessage, setUserVerificationPageValidationMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result =await UserService.verifyUser(formData);
            console.log(result);
            if (result.success) {
                HelpersService.notify(result.message, "success");
                setIsLoading(false);
                navigate('/login');
            } else {
                if (result.errors) {
                    console.log(result.errors);
                    setUserEmailValidationMessage(result.errors.Email && result.errors.Email[0]);
                    setUserVerificationPageValidationMessage(result.errors.VerificationCode && result.errors.VerificationCode[0]);
                }
                if (result.message) {
                    HelpersService.notify(result.message, "error");
                }
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching verification code:', error.message);
        }
    };

    return (
        <div className="flex-center w-full h-full bg-[url('/src/assets/TaskManagementSystemBg.png')] bg-no-repeat bg-fixed bg-cover bg-center">
            <div className="col-sm-6 col-md-3 shadow bg-white p-4 rounded h-auto">
                <div className="w-full flex-center mb-2">
                    <MainLogo />
                </div>
                <form onSubmit={handleSubmit}>
                    <small className="text-danger text-xs">{userEmailValidationMessage}</small>
                    <TextInput type="email" name="email" className="mb-3 relative" placeholder="Email" value={formData.email} onChange={handleInputChange} icon="fa-envelope" />
                    <small className="text-danger text-xs">{userVerificationPageValidationMessage}</small>
                    <TextInput type="text" name="verificationCode" className="mb-3 relative" placeholder="VerificationCode" value={formData.verificationCode} onChange={handleInputChange} icon="fa-envelope" />
                    <PrimaryButton isLoading={isLoading} text="Verify" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default VerificationForm;
