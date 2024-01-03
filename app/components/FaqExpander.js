"use client";
import {RxCaretDown, RxCaretUp} from "react-icons/rx";
import uniqid from "uniqid";
import React, { useState } from 'react';

const questions = [
    {
        qn: "How can this benefit my barbershop",
        ans: "My Kinyozi App transforms your barbershop operations by offering streamlined inventory management, efficient staff scheduling, and a customer-centric appointment system. Our user-friendly tools empower you to enhance customer satisfaction and optimize business efficiency."
    },
    {
        qn: "How can this benefit my barbershop",
        ans: "Kinyozi transforms your barbershop operations by offering streamlined inventory management, efficient staff scheduling, and a customer-centric appointment system. Our user-friendly tools empower you to enhance customer satisfaction and optimize business efficiency."
    },
    {
        qn: "How can this benefit my barbershop",
        ans: "Kinyozi transforms your barbershop operations by offering streamlined inventory management, efficient staff scheduling, and a customer-centric appointment system. Our user-friendly tools empower you to enhance customer satisfaction and optimize business efficiency."
    },
    {
        qn: "How can this benefit my barbershop",
        ans: "Kinyozi transforms your barbershop operations by offering streamlined inventory management, efficient staff scheduling, and a customer-centric appointment system. Our user-friendly tools empower you to enhance customer satisfaction and optimize business efficiency."
    }
]
export default function Expander() {
    const [expanders, setExpanders] = useState([
        { id: 0, expanded: false },
        { id: 1, expanded: false },
        { id: 2, expanded: false },
        { id: 3, expanded: false }
    ]);
    const toggleExpander = (id) => {
    setExpanders((prevState) =>
        prevState.map((expander) =>
        expander.id === id ? { ...expander, expanded: !expander.expanded } : expander
        )
    );
    };

    return (
        <div className="flex flex-col justify-center items-center gap-5 w-full">
        {expanders.map((expander) => (
            <div className="p-5 border-[0.1px] rounded-xl border-gray-600 flex flex-col w-full gap-2"   onClick={() => toggleExpander(expander.id)} key={uniqid()}>
                <div className="flex h-6 justify-between items-center">
                    <p className="text-base md:font-semibold md:text-[16px] mb-2">{questions[expander.id].qn}</p>
                    <div className="">
                        {expander.expanded ? <RxCaretUp color="white" size={40} /> : <RxCaretDown color="white" size={40} />}
                    </div>
                </div>
                {expander.expanded && (
                    <div className="w-full text-justify font-extralight text-[16px] text-gray-400 md:w-11/12">
                    {questions[expander.id].ans}
                    </div>
                )}
            </div>
        ))}
        </div>
    )
}