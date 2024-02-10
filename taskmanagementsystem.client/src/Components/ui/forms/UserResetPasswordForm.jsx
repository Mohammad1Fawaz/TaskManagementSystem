import { useState, useEffect } from 'react';
import Select from 'react-select';
import { resetPassword } from '../../../Services/userService/AuthService';
import { getCountries } from '../../../Services/ConstantsService/ConstantsService';
import { notify } from '../../../utils/notifications';
import PrimaryButton from "../buttons/PrimaryButton";
import MediumLogo from "../images/MainLogo";

export default function UserResetPasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
    });
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
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderRight: 'none',
            borderRadius: ' 0.25rem 0  0 0.25rem',
        }),
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

            } else {
                if (result.errors) {
                    setEmailValidationMessage(result.errors.email && result.errors.email[0]);
                    setPhoneNumberValidationMessage(result.errors.phoneNumber && result.errors.phoneNumber[0]);
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

    return (<div className="d-flex justify-content-center LoginRegisterContainer ">
        <div className="col-md-3 shadow bg-white px-5 py-4 rounded h-auto">
            <div className="w-100 text-middle mb-2">
                <MediumLogo />
            </div>
            <form onSubmit={handleSubmit}>
                <small className="text-danger text-10">{emailValidationMessage}</small>
                <div className="mb-3 position-relative">
                    <input type="text" name="email" className="form-control text-15 pe-5" placeholder="Email" onChange={handleInputChange} />
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
                        isSearchable={true}
                        className="w-45"
                        placeholder=""
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                height: '0.25rem',
                                borderRadius: '0.25rem 0 0 0.25rem',
                                boxShadow: 'none',
                                outline: 'none',
                                borderColor: state.isFocused ? '#ff6813' : '#ced4da', 
                                '&:hover': {
                                    borderColor: '#ced4da'
                                }
                            })
                        }}
                    />
                    <input type="text" name="phoneNumber" className="form-control text-15 pe-5 w-70 ms--2" placeholder="Phone number" onChange={handleInputChange} />
                    <i className="fas fa-phone position-absolute text-center end-5 top-20 rounded"></i>
                </div>
                <div className="mt-3">
                    <PrimaryButton isLoading={isLoading} text="Verify" type="submit" />
                </div>
            </form>
        </div>
    </div>);
}