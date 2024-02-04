import { useState } from 'react';
import { Link } from 'react-router-dom';
import MediumLogo from '../CommonComponents/MediumLogo'
import { loginUser, successNotify, errorNotify  } from '../../Services/UserFormsService/AuthService';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserLoginForm = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [userEmailValidationMessage, setEmailNameValidationMessage] = useState('');
    const [userPasswordValidationMessage, setPasswordNameValidationMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await loginUser(formData);

            if (result.success) {
                successNotify(result.message);
                const token = result.token;
                localStorage.setItem('accessToken', token);
            } else {
                if (result.errors) {
                    setEmailNameValidationMessage(result.errors.email && result.errors.email[0]);
                    setPasswordNameValidationMessage(result.errors.password && result.errors.password[0]);
                }
                if (result.error) {
                    errorNotify(result.message);
                }
            }
        } catch (error) {
            errorNotify('Error during Login');
        }
    };
    return (
        <div className="d-flex justify-content-center LoginRegisterContainer ">
            <ToastContainer />
            <div className="col-md-3 shadow bg-white  p-5 rounded h-auto">
                <MediumLogo />
                <form onSubmit={handleSubmit}>
                    <small className="text-danger text-10">{userEmailValidationMessage}</small>
                    <div className="mb-3 position-relative">
                        <input type="email" name="email" className="form-control text-15 pe-5" placeholder="Email" onChange={handleInputChange} />
                        <i className="fas fa-envelope  position-absolute text-center end-5 top-20 rounded"></i>
                    </div>
                    <small className="text-danger text-10">{userPasswordValidationMessage}</small>
                    <div className="mb-1 position-relative">
                        <input type="text" name="password" className="form-control text-15 pe-5" placeholder="Password" onChange={handleInputChange} />
                        <i className="fas fa-key  position-absolute text-center end-5 top-20 rounded"></i>
                    </div>
                    <Link to="/ResetPassord" className="text-end d-inline-block text-15 text-main mb-3">Forgot Password?</Link>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <div className="mt-3 w-100">
                    <span className="text-15">Don&apos;t have an account? </span><Link to="/register" className="text-end d-inline-block text-black text-15">Register here.</Link>
                </div>
            </div>
        </div>
    );
}
export default UserLoginForm;
