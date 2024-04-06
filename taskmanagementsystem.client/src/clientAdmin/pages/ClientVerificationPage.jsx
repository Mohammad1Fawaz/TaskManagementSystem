import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MediumLogo from '../Components/ui/images/MainLogo';
import AuthService from '../Services/AuthService';
import ClientService from '../Services/ClientService';
import HelpersService from '../Services/HelpersService';

const ClientVerificationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
    const email = new URLSearchParams(location.search).get('email');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await ClientService.verifyClient(token, email);
                if (result.success) {
                    HelpersService.notify(result.message, "success");
                    AuthService.saveToken(result.token);
                    navigate('/');
                } else {
                    HelpersService.notify(result.message, "success");
                }
            } catch (error) {
                HelpersService.notify('Error during registration', "error");
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
export default ClientVerificationPage;
