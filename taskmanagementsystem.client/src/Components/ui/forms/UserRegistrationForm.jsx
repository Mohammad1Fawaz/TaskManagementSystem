import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../../Services/userService/AuthService';
import { notify } from "../../../utils/notifications";
import { saveToken } from "../../../utils/user"
import PrimaryButton from '../buttons/PrimaryButton';
import MediumLogo from '../images/MainLogo';

const UserRegistrationForm = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const [companyNameValidationMessage, setCompanyNameValidationMessage] = useState('');
    const [userEmailValidationMessage, setEmailNameValidationMessage] = useState('');
    const [userPasswordValidationMessage, setPasswordNameValidationMessage] = useState('');
    const [userPhoneNumberValidationMessage, setPhoneNumberNameValidationMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
                //navigate to a specific page
            } else {
                if (result.errors) {
                    setCompanyNameValidationMessage(result.errors.companyName && result.errors.companyName[0]);
                    setEmailNameValidationMessage(result.errors.email && result.errors.email[0]);
                    setPasswordNameValidationMessage(result.errors.password && result.errors.password[0]);
                    setPhoneNumberNameValidationMessage(result.errors.phoneNumber && result.errors.phoneNumber[0])
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
        <div className="d-flex justify-content-center LoginRegisterContainer ">
            <div className="col-md-3 shadow bg-white px-5 py-4 rounded h-auto">
                <div className="w-100 text-middle mb-2">
                    <MediumLogo />
                </div>
                <form onSubmit={handleSubmit}>
                    <small className="text-danger text-10">{userEmailValidationMessage}</small>
                    <div className="mb-3 position-relative">
                        <input type="email" name="email" className="form-control text-15 pe-5" placeholder="Email" onChange={handleInputChange} />
                        <i className="fas fa-envelope position-absolute text-center text-middle end-5 top-5 h-95"></i>
                    </div>
                    <small className="text-danger text-10">{userPasswordValidationMessage}</small>
                    <div className="mb-3 position-relative">
                        <input type="password" name="password" className="form-control text-15 pe-5" placeholder="Password" onChange={handleInputChange} />
                        <i className="fas fa-lock position-absolute text-center text-middle end-5 top-5 h-95"></i>
                    </div>
                    <small className="text-danger text-10">{companyNameValidationMessage}</small>
                    <div className="mb-3  position-relative">
                        <input type="text" name="companyName" className="form-control text-15 pe-5" placeholder="Company Name" onChange={handleInputChange} />
                        <i className="fas fa-building position-absolute text-center text-middle end-5 top-5  h-95"></i>
                    </div>
                    <small className="text-danger text-10">{userPhoneNumberValidationMessage}</small>
                    <div className="mb-3 position-relative">
                        <input type="text" name="phoneNumber" className="form-control text-15 pe-5" placeholder="Phone number" onChange={handleInputChange} />
                        <i className="fas fa-phone position-absolute text-center text-middle end-5 top-5 h-95"></i>
                    </div>
                    <PrimaryButton isLoading={isLoading} text="Register" type="submit" />
                </form>
                <div className="mt-3 w-100">
                    <span className="text-14 text-black">Already have an account? </span><Link to="/login" className="text-end d-inline-block text-main-color text-15">Login here.</Link>
                </div>
            </div>
        </div>
    );
}
export default UserRegistrationForm;
