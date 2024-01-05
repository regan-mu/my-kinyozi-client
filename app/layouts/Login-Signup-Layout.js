import Image from "next/image";

export default function LoginSignupLayout({children}) {
    return (
        <main className="font-poppins flex items-center w-full h-screen overflow-hidden p-5 md:px-20 md:py-10 bg-dark-blue text-white">
            <div className="grid grid-rows-1 grid-cols-1 gap-10 w-full md:grid-cols-2 md:h-full">
                <div className="w-full hidden md:flex-col md:items-center md:gap-5 md:flex">
                    <Image priority={true} className="h-full object-cover" src="/my-kinyozi-wait.svg" alt="my kinyozi waiting"  width={300} height={500}/>
                    <div className="flex flex-col items-center">
                        <h4 className="font-bold text-2xl">Welcome</h4>
                        <p className="text-[14px] font-thin text-gray-400 text-center w-3/4">
                            Welcome to the Barbershop Management System! We are here to simplify your daily operations, 
                            from appointment scheduling to inventory management. 
                            Let us make running your barbershop a breeze.
                        </p>
                    </div>
                </div>
                <div className="h-full rounded-xl bg-accent flex flex-col gap-2 px-5 py-10 md:p-8">
                    <div className="w-full text-center">
                        <h2 className="font-bold text-2xl">Kinyozi</h2>
                    </div>
                    {children}
                </div>
            </div>
        </main>
    )
}