import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MediumLogo from '../../common/components/ui/images/MainLogo';
import AuthService from '../../common/services/AuthService';
import ClientService from '../services/ClientService';
import HelpersService from '../../common/services/HelpersService';
import useFetch from "../../common/hooks/useFetch"

const ClientVerificationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
    const email = new URLSearchParams(location.search).get('email');
    const { mutate } = useFetch("verify-query", {}, false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData= {
                    token: token,
                    email: email,
                };
                const variables = {
                    endPoint: 'Client/verify-email',
                    method: 'POST',
                    requestData:formData
                };
                const response = await mutate.mutateAsync(variables);
                const result = response.data;
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
