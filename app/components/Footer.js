import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const date = new Date()
    return (
        <div className="flex flex-col-reverse py-5 w-full h-auto gap-3 items-center border-t-[0.1px] text-gray-400 border-gray-700 md:h-20 md:justify-between md:flex-row md:gap-0">
            <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-400">Build by Regan Muthomi</p>
                <p className="text-xs text-gray-400 flex gap-1">
                    Design by 
                    <a className="text-secondary underline" href="https://vinniemioru.webflow.io/">Vinnie</a>
                </p>
            </div>
            <p className="text-sm">© {date.getFullYear()} Kinyozi. All rights reserved.</p>
            <div className="flex gap-5">
                <Link target="_blank" href="https://www.instagram.com/"><Image src="/instagram-icon.svg" alt="my-kinyozi-instagram" width={24} height={24} /></Link>
                <Link target="_blank" href="https://www.twitter.com/"><Image src="/x-icon.svg" alt="my-kinyozi-x" width={24} height={24} /></Link>
                <Link target="_blank" href="https://www.facebook.com/"><Image src="/facebook-icon.svg" alt="my-kinyozi-facebook" width={24} height={24} /></Link>
            </div>
        </div>
    )
}