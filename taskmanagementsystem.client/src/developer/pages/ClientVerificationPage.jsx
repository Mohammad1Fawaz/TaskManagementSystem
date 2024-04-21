import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MediumLogo from '../../common/components/ui/images/MainLogo';
import { usePostRequest } from '../../common/hooks/useGetRequest';
import AuthService from '../../common/services/AuthService';
import HelpersService from '../../common/services/HelpersService';

const ClientVerificationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
    const email = new URLSearchParams(location.search).get('email');
    const { mutate: verifyClient } = usePostRequest('/Client/verify-email', true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = {
                    token,email
                };
                await verifyClient(formData, {
                    onError: ({ response: result }) => {
                        if (result.data.message) {
                            HelpersService.notify(result.data.message, "error");
                        }
                        if (result.data.errorMessage) {
                            HelpersService.notify(result.data.errorMessage, "error");
                        }
                    },
                    onSuccess: () => {
                        AuthService.saveToken(result.token);
                        navigate('/');
                    }
                });
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
