import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { verifyUser, errorNotify, successNotify } from '../../Services/UserFormsService/AuthService';
import MediumLogo from '../CommonComponents/MediumLogo';
import { useLocation } from 'react-router-dom';

const VerificationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("token", token);
                const result = await verifyUser(token);
                if (result.success) {
                    successNotify(result.message);
                    navigate('/');
                } else {
                    errorNotify(result.message);
                }
            } catch (error) {
                errorNotify('Error during registration');
            }
        };

        fetchData();
    }, [token, navigate]);

    return (
        <div className="d-flex justify-content-center LoginRegisterContainer ">
            <ToastContainer />
            <div className="col-md-3 shadow bg-white  p-5 rounded h-auto">
                <MediumLogo />
                <div>
                    Waiting For your verification !
                </div>
            </div>
        </div>
    );
}
export default VerificationPage;
