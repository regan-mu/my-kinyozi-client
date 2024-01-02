import Image from "next/image";

export default function Service({title, description, icon, image, alt, grid}) {
    return (
        <div className={`flex flex-col ${grid} w-full h-96 overflow-hidden bg-accent rounded-xl p-8 pb-0 relative`}>
            <Image src={icon} alt="my-kinyozi-inventory" width={24} height={24} />
            <h3 className="font-semibold text-xl p-0 mt-3">{title}</h3>
            <p className="text-gray-300 p-0 font-thin text-[16px] mt-1">
                {description}
            </p>
            <Image className="relative w-full h-50 mt-5" src={image} alt={alt}  width={500} height={300} />
        </div>
    )
}