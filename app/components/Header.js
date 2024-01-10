"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "universal-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

export default  function Header() {
    const [menuExpanded, setMenuExpanded] = useState(false);
    const [authToken, setAuthToken] = useState(false);
    const cookies = new Cookies();
    const router = useRouter();

    const logOut = () => {
        cookies.remove("token", {path: "/", sameSite: "None", secure:true});
        cookies.remove("public_id", {path: "/", sameSite: "None", secure:true});
        cookies.remove("role", {path: "/", sameSite: "None", secure:true});
        setAuthToken(false);
        router.push("/");
    }

    // Logout out automatically if the token is expired
    useEffect(() => {
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
        const token = cookies.get("token");
        setAuthToken(token);
        console.log(API_KEY);
        const axiosConfig = {
            method: "post",
            url: "https://my-kinyozi-server.onrender.com/API/token/verify",
            data: {token},
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY
            }
        }


        if(token) {
            axios(axiosConfig).then(
                res => {
                }
            ).catch(err => {
                console.log(err)
                logOut();
            })
        }

    }, []);

    const toggleMenu = () => {
        setMenuExpanded(prev => !prev);
    }

    return (
        <header className="w-full h-20 fixed top-0 left-0 px-5 bg-dark-blue z-10 md:px-14">
            <nav className="flex justify-between text-gray-300 relative w-full h-full font-inter border-b border-gray-800">
                <div className="flex w-24 h-full items-center justify-center">
                    <Link href="/">
                        <Image className="h-auto w-auto" src={"/my-kinyozi-logo.svg"} alt="My kinyozi logo" width={64} height={64} />
                    </Link>
                </div>
                <div className={menuExpanded ? "absolute flex-col h-custom py-10 px-5 top-full -right-5 justify-between w-screen bg-accent  flex ": "hidden justify-between md:flex md:p-0 md:flex-row md:right-0 md:top-0 md:h-full md:bg-dark-blue md:relative md:w-2/3"}>
                    <div className="h-full flex flex-col text-2xl gap-8  md:flex-row md:items-center md:gap-16 md:text-base font-semibold tracking-wide">
                        <Link className="hover:text-gray-200" href="#services-section">
                            <p onClick={toggleMenu}>Services</p>
                        </Link>
                        <Link className="hover:text-gray-200" href="#about-section">
                            <p onClick={toggleMenu}>About Us</p>
                        </Link>
                        <Link className="hover:text-gray-200" href="#contact-section">
                            <p onClick={toggleMenu}>Contact Us</p>
                        </Link>
                    </div>
                    <div className="h-auto flex flex-col text-xl gap-5 md:items-center md:h-full md:gap-10 md:flex-row font-thin md:text-base">
                        {!authToken ?
                        <>
                            <Link className="rounded-lg text-center py-2 border-[0.1px] border-secondary md:border-none md:rounded-none md:p-0" href="/login">Log In</Link>
                            <Link className="w-full text-center bg-secondary py-2 px-5 rounded-lg md:w-max hover:text-gray-200" href="/signup">Sign Up</Link>
                        </>: <button type="button" onClick={logOut}>Logout</button>
                        }
                    </div>
                </div>
                <div className="h-full flex items-center md:hidden">
                    {
                        menuExpanded ? <Image onClick={toggleMenu} src="/open-menu.svg" alt="hamburger-icon" width={32} height={32} /> :
                        <Image onClick={toggleMenu} src="/hamburger.svg" alt="hamburger-icon" width={32} height={32} />
                    }
                </div>
            </nav>
        </header>
    )
}