import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MediumLogo from '../CommonComponents/MediumLogo';
import { registerUser, successNotify, errorNotify } from '../../Services/UserFormsService/AuthService';

const UserRegistrationForm = () => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
    });

    const [userNameValidationMessage, setUserNameValidationMessage] = useState('');
    const [userEmailValidationMessage, setEmailNameValidationMessage] = useState('');
    const [userPasswordValidationMessage, setPasswordNameValidationMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await registerUser(formData);
            console.log(result);
            if (result.success) {
                successNotify(result.message);
            } else {
                if (result.errors) {
                    setUserNameValidationMessage(result.errors.userName && result.errors.userName[0]);
                    setEmailNameValidationMessage(result.errors.email && result.errors.email[0]);
                    setPasswordNameValidationMessage(result.errors.password && result.errors.password[0]);
                }  
                if (result.existUser) {
                    errorNotify(result.message);
                }
            }
        } catch (error) {
            errorNotify('Error during registration');
        }
    };
    return (
        <div className="d-flex justify-content-center LoginRegisterContainer ">
            <ToastContainer />
            <div className="col-md-3 shadow bg-white  p-5 rounded h-auto">
                <MediumLogo />
                <form onSubmit={handleSubmit}>
                   <small className="text-danger text-10">{userNameValidationMessage}</small>
                   <div className="mb-3  position-relative">
                        <input type="text" name="userName" className="form-control text-15 pe-5" placeholder="UserName" onChange={handleInputChange} />
                        <i className="fas fa-user position-absolute text-center text-middle end-5 top-5  h-95"></i>
                    </div>
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
                   <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <div className="mt-3 w-100">
                    <span className="text-15">Already have an account? </span><Link to="/login" className="text-end d-inline-block text-black text-15">Login here.</Link>
                </div>
           </div>             
        </div>
    );
}
export default UserRegistrationForm;
