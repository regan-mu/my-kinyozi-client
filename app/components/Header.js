import Link from "next/link";

export default function Header() {
    return (
        <nav className="flex justify-between text-gray-300 relative w-full h-20 font-inter border-b border-gray-800">
            <div className="flex w-24 h-full items-center justify-center">
                <Link href="/">
                    <h1 className="font-extrabold text-xl">Kinyozi</h1>
                </Link>
            </div>
            <div className="h-full flex items-center gap-16 text-base font-semibold tracking-wide">
                <Link className="hover:text-gray-200" href="#services-section">Services</Link>
                <Link className="hover:text-gray-200" href="#about-section">About Us</Link>
                <Link className="hover:text-gray-200" href="#contact-section">Contact Us</Link>
            </div>
            <div className="h-full flex items-center gap-10 font-thin text-base">
                <Link href="/">Log In</Link>
                <Link className="bg-secondary py-2 px-5 rounded-lg hover:text-gray-200" href="/">Sign Up</Link>
            </div>
        </nav>
    )
}