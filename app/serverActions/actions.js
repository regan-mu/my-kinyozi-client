"use server";
import axios from "axios";
import { redirect } from "next/navigation";

export async function handleLogin(state, formData) {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    
    
    return axios(axiosConfig).then(
        res => {
            console.log(res?.data?.Token)
            return redirect("/signup");
        }
    ).catch(err => {
        return err?.response?.data
    }
    )
}