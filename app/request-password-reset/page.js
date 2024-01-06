import LoginSignupLayout from "../layouts/Login-Signup-Layout";
import RequestPasswordForm from "../components/RequestPasswordForm";

export default function RequestPasswordReset() {
    return (
        <LoginSignupLayout>
            <div className="flex flex-col h-full mt-5">
                <h2 className="text-xl font-bold">Request Password Reset</h2>
                <p className="text-gray-400 font-thin  text-[14px] mb-5 md:mb-0">
                    Enter your email below to reset your password
                </p>
                <RequestPasswordForm />
            </div>
        </LoginSignupLayout>
    )
}