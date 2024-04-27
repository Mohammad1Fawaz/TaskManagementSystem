import { CircularProgress } from '@mui/material/index';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetRequest, usePostRequest } from '../../../hooks/useGetRequest';
import HelpersService from '../../../services/HelpersService';
import PrimaryButton from '../buttons/PrimaryButton';
import MainLogo from '../images/MainLogo';
import PasswordInput from '../inputs/PasswordInput';
import PhoneInput from '../inputs/PhoneInput';
import TextInput from '../inputs/TextInput';

const UserRegistrationForm = () => {
    const initialFormData = {
        companyName: '',
        email: '',
        password: '',
        phoneNumber: '',
        phoneCode: '+961'
    };
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialFormData);
    const [companyNameValidationMessage, setCompanyNameValidationMessage] = useState('');
    const [userEmailValidationMessage, setEmailNameValidationMessage] = useState('');
    const [userPasswordValidationMessage, setPasswordNameValidationMessage] = useState('');
    const [userPhoneNumberValidationMessage, setPhoneNumberNameValidationMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const { data: fetchedCountries, isLoading: loadingCountries, error: countriesError } = useGetRequest('/constants/countries', null, null, false);
    const { mutate: register } = usePostRequest('/Client/register', false);

    useEffect(() => {
        if (fetchedCountries) {
            setCountries(fetchedCountries);
        }
    }, [fetchedCountries]);

    const handleSelectChange = (selectedOption) => {
        if (selectedOption && selectedOption.value) {
            setFormData({ ...formData, phoneCode: selectedOption.value });
        }
    };


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await register(formData, {
                onError: ({ response: result }) => {
                    setIsLoading(false);
                    if (result.data.errors) {
                        const errors = result.data.errors;
                        setCompanyNameValidationMessage(errors.companyName && errors.companyName[0]);
                        setEmailNameValidationMessage(errors.email && errors.email[0]);
                        setPasswordNameValidationMessage(errors.password && errors.password[0]);
                        setPhoneNumberNameValidationMessage((errors.phoneNumber && errors.phoneNumber[0]) || (errors.phoneCode && errors.phoneCode[0]) || '');
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
                }
            });
        } catch (error) {
            HelpersService.notify('Error during registration', "error");
            setIsLoading(false);
        }
    };
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
                    <MainLogo className="w-[40%]" />
                </div>
                <form onSubmit={handleSubmit}>
                    <small className="text-danger text-xs">{userEmailValidationMessage}</small>
                    <TextInput type="email" name="email" className="mb-3 relative" placeholder="Email" value={formData.email} onChange={handleInputChange} icon="fa-envelope" />
                    <small className="text-danger text-xs">{userPasswordValidationMessage}</small>
                    <PasswordInput value={formData.password} className="mb-3 relative" onChange={handleInputChange} />
                    <small className="text-danger text-xs">{companyNameValidationMessage}</small>
                    <TextInput type="text" name="companyName" className="mb-3 relative" placeholder="Company Name" value={formData.companyName} onChange={handleInputChange} icon="fa-building" />
                    <small className="text-danger text-xs">{userPhoneNumberValidationMessage}</small>
                    <PhoneInput
                        countries={countries}
                        handleInputChange={handleInputChange}
                        handleSelectChange={handleSelectChange}
                        phoneNumberValue={formData.phoneNumber}
                        phoneCodeValue={formData.phoneCode}
                        className="mb-3 relative flex w-full"
                    />
                    <PrimaryButton isLoading={isLoading} text="Register" type="submit" className="w-full" />
                </form>
                <div className="mt-3 flex justify-between w-full">
                    <div className="text-sm">Already have an account? </div><Link to="/login" className="w-fit text-main_color text-sm">Login here.</Link>
                </div>
            </>
        );
    }
}
export default UserRegistrationForm;
