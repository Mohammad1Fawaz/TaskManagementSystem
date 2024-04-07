import { useNavigate } from "react-router-dom/dist/index";
import PrimaryButton from "../components/ui/buttons/PrimaryButton";

export default function AccessDenied() {
    const navigate = useNavigate();

    const returnToHome = () => {
        navigate('/login');
    }
    return (
        <div className="justify-center w-full h-full bg-[url('/src/assets/AccessDeniedImage.png')] bg-no-repeat bg-fixed bg-contain bg-center">
            <div className="flex-center flex-col h-full">
                <h1 className="text-[red] text-[100px] ">Access Denied</h1>
                <PrimaryButton text='<-- Login First' onClick={returnToHome} className="w-[10%] mt-3 text-[red] mt-auto mb-5" />
            </div>
        </div> 
    )
}