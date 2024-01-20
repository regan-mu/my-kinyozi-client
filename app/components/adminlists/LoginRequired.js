import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useContext, useLayoutEffect } from "react";
import { AdminContext } from "@/app/context/AdminContext";

export default function LoginRequired({children}) {
    const cookies = new Cookies();
    const {setAccessToken,  setIsDashLoading} = useContext(AdminContext);
    const router = useRouter()
    useLayoutEffect(() => {
        const token = cookies.get("token");
        if (token) {
            setAccessToken(token);
            setIsDashLoading(true);
            // Finish up for when the token is expired and when the user is not allowed
        } else {
            router.push("/login");
        }
    }, []);
    return (
        <>
            {children}
        </>
    )
}