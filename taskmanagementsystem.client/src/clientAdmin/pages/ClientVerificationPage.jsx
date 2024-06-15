import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MediumLogo from '../../common/components/ui/images/MainLogo';
import { usePostRequest } from '../../common/hooks/useGetRequest';
import AuthService from '../../common/services/AuthService';
import HelpersService from '../../common/services/HelpersService';
import DotsLoader from '../../common/components/ui/other/DotsLoader';

const ClientVerificationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
    const email = new URLSearchParams(location.search).get('email');
    const { mutate: verifyClient } = usePostRequest('/Client/verify-email', false);

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
        <>
            <div className="flex flex-col justify-content-center w-full h-[100vh] mt-auto mb-auto lg:bg-[url('/src/assets/TaskManagementSystemBg.png')] bg-white sm:bg-none bg-no-repeat bg-contain bg-right">
                <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-[5%] shadow bg-white p-4 rounded h-auto flex-col flex-center">
                    <MediumLogo className="w-[300px] flex-center" />
                    <div className="mt-5 flex">
                        <p className ="text-lg text-bold" >Waiting For your verification</p>
                        <DotsLoader />
                    </div>
                </div>
            </div>
        </>
    );
}
export default ClientVerificationPage;
