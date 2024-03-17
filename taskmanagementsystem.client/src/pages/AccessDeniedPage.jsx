import { useNavigate } from "react-router-dom/dist/index";
import PrimaryButton from "../Components/ui/buttons/PrimaryButton";

export default function AccessDenied() {
    const navigate = useNavigate();

    const returnToHome = () => {
        navigate('/login');
    }
    return (
        <div className="justify-center w-full h-full bg-[url('/src/assets/AccessDeniedImage.png')] bg-no-repeat bg-fixed bg-contain bg-center">
            <div className="flex-center flex-col h-full">
                <h1 className="text-[red] text-[100px] ">Access Denied</h1>
                {/*<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="white" className="bi bi-emoji-wink" viewBox="0 0 16 16">*/}
                {/*    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />*/}
                {/*    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m1.757-.437a.5.5 0 0 1 .68.194.93.93 0 0 0 .813.493c.339 0 .645-.19.813-.493a.5.5 0 1 1 .874.486A1.93 1.93 0 0 1 10.25 7.75c-.73 0-1.356-.412-1.687-1.007a.5.5 0 0 1 .194-.68" />*/}
                {/*</svg>*/}
                <PrimaryButton text='<-- Login First' onClick={returnToHome} width="w-[10%] mt-3 text-[red] mt-auto mb-5" />
            </div>
        </div> 
    )
}