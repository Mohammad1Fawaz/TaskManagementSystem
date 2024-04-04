import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ClientService  from '../../../Services/ClientService';
import ConstantsService from '../../../Services/ConstantsService';
import HelpersService from '../../../Services/HelpersService';
import PrimaryButton from "../buttons/PrimaryButton";
import MediumLogo from "../images/MainLogo";
import DangerButton from '../buttons/DangerButton';
import PhoneInput from "../inputs/PhoneInput";
import TextInput from '../inputs/TextInput';
import useFetch from '../../../hooks/useFetch';

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
    const { fetchQuery, handleRequest } = useFetch("POST", "Client/reset-password", formData, false, "reset-query", {}, false);
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await ConstantsService.getCountries();
                setCountries(response);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

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
        const { data, isLoading, isSuccess, isError, error, errors } = await handleRequest();
        console.log("fetchQuery",fetchQuery);
        setIsLoading(isLoading);
        try {
            if (isSuccess) {
                HelpersService.notify(data.message, "success");
                setIsLoading(isLoading);
                reset(initialFormData);

                navigate('/login');
            } else {
                if (errors) {
                    setEmailValidationMessage(errors.email && errors.email[0]);
                    setPhoneNumberValidationMessage((errors.phoneNumber && errors.phoneNumber[0]) || (errors.phoneCode && errors.phoneCode[0]) || '');

                }
                if (isError && error) {
                    HelpersService.notify(error, "error");
                }
                setIsLoading(isLoading);
            }
        } catch (err) {
            HelpersService.notify('Error during resseting the password', "error");
            setIsLoading(isLoading);
        }
    }

    function navigateBackHandler() {
        navigate(-1);
    }

    return (<div className="flex-center w-full h-full bg-[url('/src/assets/TaskManagementSystemBg.png')] bg-no-repeat bg-fixed bg-cover bg-center">
        <div className="col-sm-6 col-md-3 shadow bg-white p-4 rounded h-auto">
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
        </div>
    </div>);
}