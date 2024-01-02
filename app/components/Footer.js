import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="flex justify-between py-5 w-full h-20 items-center border-t-[0.1px] text-gray-400 border-gray-700">
            <p className="text-xs text-gray-400">Created by Regan Muthomi</p>
            <p className="text-sm">© 2024 Kinyozi. All rights reserved.</p>
            <div className="flex gap-5">
                <Link target="_blank" href="https://www.instagram.com/"><Image src="/instagram-icon.svg" alt="my-kinyozi-instagram" width={24} height={24} /></Link>
                <Link target="_blank" href="https://www.twitter.com/"><Image src="/x-icon.svg" alt="my-kinyozi-x" width={24} height={24} /></Link>
                <Link target="_blank" href="https://www.facebook.com/"><Image src="/facebook-icon.svg" alt="my-kinyozi-facebook" width={24} height={24} /></Link>
            </div>
        </div>
    )
}