import { CircularProgress } from '@mui/material/index';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useGetRequest, usePostRequest } from '../../../hooks/useGetRequest';
import HelpersService from '../../../services/HelpersService';
import DangerButton from '../buttons/DangerButton';
import PrimaryButton from "../buttons/PrimaryButton";
import MediumLogo from "../images/MainLogo";
import PhoneInput from "../inputs/PhoneInput";
import TextInput from '../inputs/TextInput';

export default function UserResetPasswordForm() {
    let navigate = useNavigate();
    const initialFormData = {
        email: '',
        phoneNumber: '',
        phoneCode: '+961'
    };

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialFormData);

    const [emailValidationMessage, setEmailValidationMessage] = useState('');
    const [phoneNumberValidationMessage, setPhoneNumberValidationMessage] = useState('');
    const [countries, setCountries] = useState([]);
    const { data: fetchedCountries, isLoading: loadingCountries, error: countriesError } = useGetRequest('/constants/countries', null, null, false);
    const { mutate: resetPassword } = usePostRequest('/Client/reset-password', true);

    
    useEffect(() => {
        if (fetchedCountries) {
            setCountries(fetchedCountries);
        }
    }, [fetchedCountries]);


    const reset = () => {
        setFormData(initialFormData);
        setEmailValidationMessage('');
        setPhoneNumberValidationMessage('');
    };

    const handleSelectChange = (selectedOption) => {
        if (selectedOption && selectedOption.value) {
            setFormData({ ...formData, phoneCode: selectedOption.value });
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            await resetPassword(formData, {
                onError: ({ response: result }) => {
                    setIsLoading(false);
                    if (result.data.errors) {
                        const errors = result.data.errors;
                        setEmailValidationMessage(errors.email && errors.email[0]);
                        setPhoneNumberValidationMessage((errors.phoneNumber && errors.phoneNumber[0]) || (errors.phoneCode && errors.phoneCode[0]) || '');
                    }
                    if (result.data.message) {
                        HelpersService.notify(result.data.message, "error");
                    }
                    if (result.data.errorMessage) {
                        HelpersService.notify(result.data.errorMessage, "error");
                    }
                },
                onSuccess: () => {
                    reset(initialFormData);
                    setIsLoading(false);
                }
            });
        } catch (err) {
            HelpersService.notify('Error during resseting the password', "error");
            setIsLoading(false);
        }
    }

    function navigateBackHandler() {
        navigate(-1);
    }

    if (loadingCountries) {
        return <div className="flex justify-center align-center">
            <CircularProgress />
        </div>;
    }
    else if (countriesError) {
        return window.location.reload();

    } else {
        return (
            <>
                <div className="w-full flex-center mb-2">
                    <MediumLogo className="w-[40%]" />
                </div>
                <form onSubmit={handleSubmit}>
                    <small className="block text-danger text-sm">Enter your email and phone number to receive your password by email.</small>
                    <small className="text-danger text-xs">{emailValidationMessage}</small>
                    <TextInput type="email" name="email" className="mt-2 mb-3 relative" placeholder="Email" value={formData.email} onChange={handleInputChange} icon="fa-envelope" />
                    <small className="text-danger text-xs">{phoneNumberValidationMessage}</small>
                    <PhoneInput
                        countries={countries}
                        handleInputChange={handleInputChange}
                        handleSelectChange={handleSelectChange}
                        phoneNumberValue={formData.phoneNumber}
                        phoneCodeValue={formData.phoneCode}
                        className="mb-3 relative flex"
                    />
                    <div className="text-middle gap-2 mt-4">
                        <DangerButton onClick={navigateBackHandler} text="Back" type="button" className="w-1/2 text-black" />
                        <PrimaryButton isLoading={isLoading} text="Verify" type="submit" className="w-1/2" />
                    </div>
                </form>
            </>
        );
    }
}