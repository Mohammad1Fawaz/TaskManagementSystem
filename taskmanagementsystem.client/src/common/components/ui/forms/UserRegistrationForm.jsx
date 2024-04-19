import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClientService from '../../../../clientAdmin/services/ClientService';
import ConstantsService from '../../../services/ConstantsService';
import HelpersService from '../../../services/HelpersService';
import AuthService from "../../../services/AuthService"
import PrimaryButton from '../buttons/PrimaryButton';
import MainLogo from '../images/MainLogo';
import PhoneInput from '../inputs/PhoneInput';
import TextInput from '../inputs/TextInput';
import PasswordInput from '../inputs/PasswordInput';
import useFetch from "../../../hooks/useFetch"
const UserRegistrationForm = () => {
    const initialFormData = {
        companyName: '',
        email: '',
        password: '',
        phoneNumber: '',
        phoneCode: '+961'
    };
    const [formData, setFormData] = useState(initialFormData);

    const [companyNameValidationMessage, setCompanyNameValidationMessage] = useState('');
    const [userEmailValidationMessage, setEmailNameValidationMessage] = useState('');
    const [userPasswordValidationMessage, setPasswordNameValidationMessage] = useState('');
    const [userPhoneNumberValidationMessage, setPhoneNumberNameValidationMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const {fetchedData}=useFetch(['countries-query','constants/countries'],{},false);
    const {mutate}=useFetch("register-query", {}, false)

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetchedData.refetch('constants/countries');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);


    const reset = () => {
        setFormData(initialFormData);
        setCompanyNameValidationMessage('');
        setEmailNameValidationMessage('');
        setPasswordNameValidationMessage('');
        setPhoneNumberNameValidationMessage('');
    };

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
        const variables={
            endPoint: 'Client/register',
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
                const token = data.token;
                AuthService.saveToken(token);
                reset();
                //navigate to page ...
            } else {
                if (data.errors) {
                    setCompanyNameValidationMessage(data.errors.companyName && data.errors.companyName[0]);
                    setEmailNameValidationMessage(data.errors.email && data.errors.email[0]);
                    setPasswordNameValidationMessage(data.errors.password && data.errors.password[0]);
                    setPhoneNumberNameValidationMessage((data.errors.phoneNumber && data.errors.phoneNumber[0]) || (data.errors.phoneCode && data.errors.phoneCode[0]) || '');
                }
                if (data.message) {
                    HelpersService.notify(data.message, "error");
                }
                setIsLoading(mutate.isLoading);
            }
        } catch (error) {
            HelpersService.notify('Error during registration', "error");
            setIsLoading(mutate.isLoading);
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
export default UserRegistrationForm;
