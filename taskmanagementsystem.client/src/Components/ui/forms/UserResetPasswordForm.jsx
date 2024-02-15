import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { resetPassword } from '../../../Services/userService/AuthService';
import { getCountries } from '../../../Services/ConstantsService/ConstantsService';
import { notify } from '../../../utils/notifications';
import PrimaryButton from "../buttons/PrimaryButton";
import MediumLogo from "../images/MainLogo";
import DangerButton from '../buttons/DangerButton';

export default function UserResetPasswordForm() {
    let navigate = useNavigate();
    const initialFormData = {
        email: '',
        phoneNumber: '',
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

    return (<div className="d-flex justify-content-center LoginRegisterContainer ">
        <div className="col-md-3 shadow bg-white px-5 py-4 rounded h-auto">
            <div className="w-100 text-middle mb-2">
                <MediumLogo />
            </div>
            <form onSubmit={handleSubmit}>
                <small className="d-block text-danger text-12">Enter your email and phone number to receive your password by email.</small>
                <small className="text-danger text-10">{emailValidationMessage}</small>
                <div className="mt-2 mb-3 position-relative">
                    <input type="text" name="email" className="form-control text-15 pe-5" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                    <i className="fas fa-envelope position-absolute text-center end-5 top-20 rounded"></i>
                </div>
                <small className="text-danger text-10">{phoneNumberValidationMessage}</small>
                <div className="mb-3 position-relative d-flex">
                    <Select
                        options={countries.map(country => ({
                            label: <div className="d-flex justify-conetnt-center align-items-center gap-2">{country.phoneCode}<img src={country.flagSvg} className="w-30 h-15 z-100" ></img></div>,
                            value: country.phoneCode,
                            isSelected: country.phoneCode === "+961"
                        }))}
                        onChange={(selectedOption) => handleSelectChange(selectedOption)}
                        isSearchable={true}
                        className="w-45"
                        placeholder=""
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                height: '0.25rem',
                                fontSize: "13px",
                                borderRadius: '0.25rem 0 0 0.25rem',
                                boxShadow: 'none',
                                outline: 'none',
                                borderColor: state.isFocused ? '#ff6813' : '#ced4da',
                                '&:hover': {
                                    borderColor: '#ced4da'
                                },

                            }),
                            menu: (provided) => ({
                                ...provided,
                                height: "25vh",
                                overflow: "hidden"
                            }),
                            option: (provided) => ({
                                ...provided,
                                '&:hover': {
                                    backgroundColor: 'var(--main-hover-color)',
                                    color: "#fff"
                                },
                            })
                        }}
                    />
                    <input type="text" name="phoneNumber" className="form-control text-15 pe-5 w-70 ms--2" placeholder="Phone number" value={formData.phoneNumber} onChange={handleInputChange} />
                    <i className="fas fa-phone position-absolute text-center end-5 top-20 rounded"></i>
                </div>
                <div className="text-middle gap-2 mt-4">
                    <DangerButton width="w-50" onClick={navigateBackHandler} />
                    <PrimaryButton isLoading={isLoading} text="Verify" type="submit" width="w-50" />
                </div>
            </form>
        </div>
    </div>);
}