import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { registerUser } from '../../../Services/userService/AuthService';
import { getCountries } from '../../../Services/ConstantsService/ConstantsService';
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
        //const hhhh = async () => {
        //    try {
        //        fetch('https://restcountries.com/v3.1/all')
        //            .then(res => {
        //                if (!res.ok) {
        //                    throw new Error('Network response was not ok');
        //                }
        //                return res.json();
        //            })
        //            .then(data => {
        //                if (!Array.isArray(data)) {
        //                    throw new Error('Invalid data format received');
        //                }
        //                const selectedData = data.map((country, index) => ({
        //                    id: index,
        //                    name: country.name.common,
        //                    phoneCode: country.ccn3,
        //                    flagSvg: country.flags ? country.flags.svg : '',
        //                    countryCode: country.cca2,
        //                    timeZone: country.timezones ? country.timezones[0] : 'Unknown'
        //                }));
        //                console.log(selectedData);
        //            })
        //            .catch(error => {
        //                console.error('Error fetching or processing countries data:', error);
        //            });
        //    } catch (error) {
        //        console.error('Error occurred outside of asynchronous operation:', error);
        //    }

        //};
        fetchCountries();
        //hhhh();
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
                                    height:'0.25rem',
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
