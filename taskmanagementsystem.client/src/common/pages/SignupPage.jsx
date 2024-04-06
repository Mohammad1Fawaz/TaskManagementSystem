import UserRegistrationForm from "../Components/ui/forms/UserRegistrationForm";

export default function SignupPage() {
    return (
        <>
            <div className="flex flex-col justify-content-center w-full h-full mt-auto mb-auto lg:bg-[url('/src/assets/TaskManagementSystemBg.png')] bg-white sm:bg-none bg-no-repeat bg-contain bg-right">
                <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-[5%] shadow bg-white p-4 rounded h-auto">
                    <UserRegistrationForm />
                </div>
            </div>
        </>
    )
}