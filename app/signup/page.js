import LoginSignupLayout from "../layouts/Login-Signup-Layout";
import SignupForm from "../components/SignupForm";

export default function Signup() {
    return (
        <LoginSignupLayout>
            <div className="flex flex-col h-full">
                <h2 className="text-xl font-bold">Sign Up</h2>
                <p className="text-gray-400 text-[14px] mb-5">
                    Join now by creating your account in just a few simple steps.
                </p>
                <SignupForm />
            </div>
        </LoginSignupLayout>
    )
}