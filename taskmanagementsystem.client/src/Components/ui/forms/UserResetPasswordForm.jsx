import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { resetPassword } from '../../../Services/userService/AuthService';
import { getCountries } from '../../../Services/ConstantsService/ConstantsService';
import { notify } from '../../../utils/notifications';
import PrimaryButton from "../buttons/PrimaryButton";
import MediumLogo from "../images/MainLogo";
import DangerButton from '../buttons/DangerButton';
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

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await getCountries();
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
        try {
            const result = await resetPassword(formData);
            if (result.success) {
                notify(result.message, "success");
                setIsLoading(false);
                reset(initialFormData);

                navigate('/login');
            } else {
                if (result.errors) {
                    setEmailValidationMessage(result.errors.email && result.errors.email[0]);
                    setPhoneNumberValidationMessage((result.errors.phoneNumber && result.errors.phoneNumber[0]) || (result.errors.phoneCode && result.errors.phoneCode[0]) || '');

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

    return (<div className="flex-center w-full h-full bg-[url('/src/assets/TaskManagementBg.jpeg')] bg-no-repeat bg-fixed bg-cover bg-center">
        <div className="col-sm-6 col-md-3 shadow bg-white p-4 rounded h-auto">
            <div className="w-full flex-center mb-2">
                <MediumLogo />
            </div>
            <form onSubmit={handleSubmit}>
                <small className="block text-danger text-sm">Enter your email and phone number to receive your password by email.</small>
                <small className="text-danger text-xs">{emailValidationMessage}</small>
                <div className="mt-2 mb-3 relative">
                    <TextInput type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} icon="fa-envelope" />
                </div>
                <small className="text-danger text-xs">{phoneNumberValidationMessage}</small>
                <div className="mb-3 relative flex">
                    <PhoneInput
                        countries={countries}
                        handleInputChange={handleInputChange}
                        handleSelectChange={handleSelectChange}
                        phoneNumberValue={formData.phoneNumber}
                        phoneCodeValue={formData.phoneCode}
                    />
                </div>
                <div className="text-middle gap-2 mt-4">
                    <DangerButton onClick={navigateBackHandler} type="button" width="w-1/2" />
                    <PrimaryButton isLoading={isLoading} text="Verify" type="submit" width="w-1/2" />
                </div>
            </form>
        </div>
    </div>);
}