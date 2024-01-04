import LoginSignupLayout from "../layouts/Login-Signup-Layout";
import LoginForm from "../components/LoginForm";

export default function Login() {
    return (
        <LoginSignupLayout>
            <div className="flex flex-col ">
                <h2 className="text-xl font-bold text-center">Login</h2>
                <p className="text-gray-400 text-[14px] text-center">
                    Enter your credentials to access your account securely.
                </p>
                <LoginForm />
            </div>
        </LoginSignupLayout>
    )
}