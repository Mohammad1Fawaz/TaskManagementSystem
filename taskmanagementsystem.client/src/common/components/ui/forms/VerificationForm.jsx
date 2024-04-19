import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import HelpersService from '../../../../common/services/HelpersService';
import UserService from '../../../../clientAdmin/services/UserService';
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
    const {mutate}=useFetch("verify-query", {}, false);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const variables={
            endPoint: 'User/verify-user',
            method: 'POST',
            requestData: formData
        };
        const response= await mutate.mutateAsync(variables);
        const data= response.data;
        setIsLoading(mutate.isLoading);
        try {
            if (data.success) {
                HelpersService.notify(data.message, "success");
                setIsLoading(mutate.isLoading);
                navigate('/login');
            } else {
                if (data.errors) {
                    setUserEmailValidationMessage(data.errors.Email && data.errors.Email[0]);
                    setUserVerificationPageValidationMessage(data.errors.VerificationCode && data.errors.VerificationCode[0]);
                }
                if (data.error) {
                    HelpersService.notify(data.error, "error");
                }
                setIsLoading(mutate.isLoading);
            }
        } catch (error) {
            setIsLoading(mutate.isLoading);
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
