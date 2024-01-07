import LoginSignupLayout from "@/app/layouts/Login-Signup-Layout";
import PasswordResetForm from "@/app/components/PasswordResetForm";

export default function PasswordReset({params}) {
    return (
        <LoginSignupLayout>
            <div className="flex flex-col ">
                <h2 className="text-xl font-bold">Reset Pasword</h2>
                <p className="text-gray-400 font-thin text-[14px] mb-5">
                    Enter a secure new password to regain access to your account.
                </p>
                <PasswordResetForm token={params.slug} />
            </div>
        </LoginSignupLayout>
    )
}