"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import uniqid from "uniqid";

export default function Carousel() {
    const [currentSection, setCurrentSection] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentSection((prevSection) => (prevSection + 1) % 3);
        }, 5000); // Change every 3 seconds (adjust as needed)

        return () => clearInterval(interval);
    }, []);

    const sectionsData = [
        {
            title: "User-Friendly Dashboard",
            description: "Navigate your barbershop's world effortlessly with our intuitive dashboard. Access vital information at a glance, monitor key metrics, and stay in control of your operations—all in one centralized hub."
        },
        {
            title: "Efficient Reporting",
            description: "Reduce no-shows and enhance customer satisfaction with automated reminders and notifications. Keep your clients informed about upcoming appointments, promotions, and personalized offers."
        },
        {
            title: "Automated Remainders and Notifications",
            description: "Make data-driven decisions with detailed and insightful reports. Analyze trends, track performance, and identify opportunities for growth. Our reporting tools empower you to optimize your barbershop's efficiency."
        }
    ];

    const images = [
        "/user-friendly.svg",
        "/reporting.svg",
        "/notifications.svg"
    ]



    return (
        <div className="flex flex-col gap-12 h-auto md:grid md:grid-cols-2 md:grid-rows-1 md:h-96">
            <div className="flex flex-col gap-5 border-l-2 order-2 border-gray-700 md:order-1 md:justify-between">
                {
                    sectionsData.map((data, index) => {
                        return <div key={uniqid()} className={index !== currentSection ? "flex flex-col text-gray-400 pl-5": "-ml-[3px] flex flex-col border-l-4 border-secondary text-white pl-5"}>
                            <h4 className={index !== currentSection ? "font-extrabold mb-1 text-xl": "font-extrabold mb-1 text-xl text-secondary"}>{data.title}</h4>
                            <p className="font-thin text-[16px] text-justify">{data.description}</p>
                        </div>
                    })
                }
            </div>
            <div className="w-full h-full order-1 md:order-2">
                <Image className="w-full h-60 object-cover rounded-3xl md:h-full" src={images[currentSection]} alt="why-choose-my-kinyozi" width={300} height={200} />
            </div>
        </div>
    )
}