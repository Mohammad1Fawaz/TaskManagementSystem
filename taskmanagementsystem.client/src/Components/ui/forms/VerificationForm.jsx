import React, { useState } from 'react';
import { useParams, useLocation,useNavigate } from 'react-router-dom';
import HelpersService from '../../../Services/HelpersService';
import AuthService from '../../../Services/AuthService';
import UserService from '../../../Services/UserService';
import TextInput from '../inputs/TextInput';
import PrimaryButton from '../buttons/PrimaryButton';
import MainLogo from '../images/MainLogo';
import useFetch from '../../../hooks/useFetch';

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
    const { fetchQuery, handleRequest } = useFetch("POST", "User/verify-user", formData, false, "register-query", {}, false);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { data, isLoading, isSuccess, isError, error, errors } = await handleRequest();
        console.log("fetchQuery",fetchQuery);
        setIsLoading(isLoading);
        try {
            if (isSuccess) {
                HelpersService.notify(data.message, "success");
                setIsLoading(isLoading);
                navigate('/login');
            } else {
                if (errors) {
                    setUserEmailValidationMessage(errors.Email && errors.Email[0]);
                    setUserVerificationPageValidationMessage(errors.VerificationCode && errors.VerificationCode[0]);
                }
                if (isError && error) {
                    HelpersService.notify(error, "error");
                }
                setIsLoading(isLoading);
            }
        } catch (error) {
            setIsLoading(isLoading);
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
