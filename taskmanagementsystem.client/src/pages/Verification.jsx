import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MediumLogo from '../Components/ui/images/MainLogo';
import { verifyUser } from '../Services/userService/AuthService';
import { notify } from "../utils/notifications";
import { saveToken } from "../utils/user"

const VerificationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await verifyUser(token);
                if (result.success) {
                    notify(result.message, "success");
                    saveToken(result.token);
                    navigate('/');
                } else {
                    notify(result.message, "success");
                }
            } catch (error) {
                notify('Error during registration', "error");
            }
        };

        fetchData();
    }, [token, navigate]);

    return (
        <div className="d-flex justify-content-center LoginRegisterContainer ">
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
