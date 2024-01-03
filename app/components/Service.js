import Image from "next/image";

export default function Service({title, description, icon, image, alt, grid}) {
    return (
        <div className={`flex flex-col justify-between col-span-full ${grid} w-full h-96 overflow-hidden bg-accent rounded-xl p-4 pb-0 relative md:p-8`}>
            <Image src={icon} alt="my-kinyozi-inventory" width={24} height={24} />
            <h3 className="font-semibold text-2xl p-0 mt-3 md:text-xl">{title}</h3>
            <p className="text-gray-400 w-full text-xl text-justify p-0 font-thin mt-1 md:text-[16px]">
                {description}
            </p>
            <Image className="relative w-full h-50 mt-5" src={image} alt={alt}  width={500} height={300} />
        </div>
    )
}