import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HelpersService from '../../../../common/services/HelpersService';
import { usePostRequest } from '../../../hooks/useGetRequest';
import PrimaryButton from '../buttons/PrimaryButton';
import MainLogo from '../images/MainLogo';
import TextInput from '../inputs/TextInput';

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
    const { mutate: verifyUser } = usePostRequest('/User/verify-user', true);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await verifyUser(formData, {
                onError: ({ response: result }) => {
                    setIsLoading(false);
                    if (result.data.errors) {
                        const errors = result.data.errors;
                        setUserEmailValidationMessage(errors.Email && errors.Email[0]);
                        setUserVerificationPageValidationMessage(errors.VerificationCode && errors.VerificationCode[0]);
                    }
                    if (result.data.message) {
                        HelpersService.notify(result.data.message, "error");
                    }
                    if (result.data.errorMessage) {
                        HelpersService.notify(result.data.errorMessage, "error");
                    }
                },
                onSuccess: () => {
                    setIsLoading(false);
                    navigate('/login');
                }
            });
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching verification code:', error.message);
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
                <small className="text-danger text-xs">{userVerificationPageValidationMessage}</small>
                <TextInput type="text" name="verificationCode" className="mb-3 relative" placeholder="VerificationCode" value={formData.verificationCode} onChange={handleInputChange} icon="fa-envelope" />
                <PrimaryButton isLoading={isLoading} text="Verify" type="submit" className="w-full" />
            </form>
        </>
    );
};

export default VerificationForm;
