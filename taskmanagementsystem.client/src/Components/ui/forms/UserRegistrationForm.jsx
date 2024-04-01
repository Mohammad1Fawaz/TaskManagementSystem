import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClientService from '../../../Services/ClientService';
import ConstantsService from '../../../Services/ConstantsService';
import HelpersService from '../../../Services/HelpersService';
import AuthService from "../../../Services/AuthService"
import PrimaryButton from '../buttons/PrimaryButton';
import MainLogo from '../images/MainLogo';
import PhoneInput from '../inputs/PhoneInput';
import TextInput from '../inputs/TextInput';
import PasswordInput from '../inputs/PasswordInput';
import useFetch from '../../../hooks/useFetch';
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
    const { fetchQuery, handleRequest } = useFetch("POST", "Client/register", formData, false, "register-query", {}, false);

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
        const { data, isLoading, isSuccess, isError, error, errors } = await handleRequest();
        console.log("fetchQuery",fetchQuery);
        setIsLoading(isLoading);
        try {
            if (isSuccess) {
                HelpersService.notify(data.message, "success");
                setIsLoading(isLoading);
                const token = data.token;
                AuthService.saveToken(token);
                reset();
                //navigate to page ...
            } else {
                if (errors) {
                    setCompanyNameValidationMessage(errors.companyName && errors.companyName[0]);
                    setEmailNameValidationMessage(errors.email && errors.email[0]);
                    setPasswordNameValidationMessage(errors.password && errors.password[0]);
                    setPhoneNumberNameValidationMessage((errors.phoneNumber && errors.phoneNumber[0]) || (errors.phoneCode && errors.phoneCode[0]) || '');
                }
                if (isError && error) {
                    HelpersService.notify(error, "error");
                }
                setIsLoading(isLoading);
            }
        } catch (error) {
            HelpersService.notify('Error during registration', "error");
            setIsLoading(isLoading);
        }
    };

    return (
        <div className="flex flex-col justify-content-center  w-full h-full mt-auto mb-auto bg-[url('/src/assets/TaskManagementSystemBg.png')] bg-no-repeat bg-contain bg-right">
            <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4  mx-[5%] shadow bg-white p-4 rounded h-auto">
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
                    <PrimaryButton isLoading={isLoading} text="Register" type="submit" />
                </form>
                <div className="mt-3 flex justify-between w-full">
                    <div className="text-sm text-black">Already have an account? </div><Link to="/login" className="w-fit text-main_color text-sm">Login here.</Link>
                </div>
            </div>
        </div>
    );
}
export default UserRegistrationForm;
