import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../../Services/userService/AuthService';
import { getCountries } from '../../../Services/ConstantsService/ConstantsService';
import { notify } from "../../../utils/notifications";
import { saveToken } from "../../../utils/user"
import PrimaryButton from '../buttons/PrimaryButton';
import MediumLogo from '../images/MainLogo';
import PhoneInput from '../inputs/PhoneInput';
import TextInput from '../inputs/TextInput';
import PasswordInput from '../inputs/PasswordInput';

const UserRegistrationForm = () => {
    const initialFormData = {
        companyName: '',
        email: '',
        password: '',
        phoneNumber: '',
        phoneCode: ''
    };
    const [formData, setFormData] = useState(initialFormData);

    const [companyNameValidationMessage, setCompanyNameValidationMessage] = useState('');
    const [userEmailValidationMessage, setEmailNameValidationMessage] = useState('');
    const [userPasswordValidationMessage, setPasswordNameValidationMessage] = useState('');
    const [userPhoneNumberValidationMessage, setPhoneNumberNameValidationMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
        try {
            const result = await registerUser(formData);
            if (result.success) {
                notify(result.message, "success");
                setIsLoading(false);
                const token = result.token;
                saveToken(token);
                reset();
                //navigate to page ...
            } else {
                if (result.errors) {
                    setCompanyNameValidationMessage(result.errors.companyName && result.errors.companyName[0]);
                    setEmailNameValidationMessage(result.errors.email && result.errors.email[0]);
                    setPasswordNameValidationMessage(result.errors.password && result.errors.password[0]);
                    setPhoneNumberNameValidationMessage((result.errors.phoneNumber && result.errors.phoneNumber[0]) || (result.errors.phoneCode && result.errors.phoneCode[0]) || '');
                }
                if (result.existUser) {
                    notify(result.message, "error");
                }
                setIsLoading(false);
            }
        } catch (error) {
            notify('Error during registration', "error");
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-center w-full h-full bg-[url('/src/assets/TaskManagementBg.jpeg')] bg-no-repeat bg-fixed bg-cover bg-center">
            <div className="col-sm-6 col-md-3 shadow bg-white p-4 rounded h-auto">
                <div className="w-full flex-center mb-2">
                    <MediumLogo />
                </div>
                <form onSubmit={handleSubmit}>
                    <small className="text-danger text-xs">{userEmailValidationMessage}</small>
                    <div className="mb-3 relative">
                        <TextInput type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} icon="fa-envelope" />
                    </div>
                    <small className="text-danger text-xs">{userPasswordValidationMessage}</small>
                    <div className="mb-3 relative">
                        <PasswordInput value={formData.password} onChange={handleInputChange} />
                    </div>
                    <small className="text-danger text-xs">{companyNameValidationMessage}</small>
                    <div className="mb-3 relative">
                        <TextInput type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleInputChange} icon="fa-building" />
                    </div>
                    <small className="text-danger text-xs">{userPhoneNumberValidationMessage}</small>
                    <div className="mb-3 relative flex w-full">
                        <PhoneInput countries={countries} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} phoneValue={formData.phoneNumber} />
                    </div>
                    <PrimaryButton isLoading={isLoading} text="Register" type="submit" />
                </form>
                <div className="mt-3 w-full">
                    <span className="text-sm text-black">Already have an account? </span><Link to="/login" className="w-fit block text-main_color text-sm">Login here.</Link>
                </div>
            </div>
        </div>
    );
}
export default UserRegistrationForm;
