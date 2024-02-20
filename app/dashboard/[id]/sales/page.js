"use client";
import Image from "next/image";
import SalesList from "@/app/components/adminlists/Sales/SalesList";
import AddSale from "@/app/components/adminlists/Sales/AddSale";
import { useContext, useEffect, useState } from "react";
import { SalesContext } from "@/app/context/SalesContext";
import DeleteSale from "@/app/components/adminlists/Sales/DeleteSales";
import { AdminContext } from "@/app/context/AdminContext";
import uniqid from "uniqid";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";


export default function Sales({params}) {
    const {addSale, setAddSale, saleActions, setServices, modifySuccessful} = useContext(SalesContext);
    const {setActivePage, setSales, sales} = useContext(AdminContext);
    const [years, setYears] = useState([]);
    const [queryMonth, setQueryMonth] = useState("all");
    const [queryYear, setQueryYear] = useState("all");
    const [error, setError] = useState("");
    const handleMonth = (e) => {
        const {value} = e.target
        setQueryMonth(value);
    }

    const handleYear = (e) => {
        const {value} = e.target
        setQueryYear(value);
    }
    
    // Filter Data By Yr and Month
    const filteredData = sales?.filter(item => {
        const monthCondition = queryMonth !== "all" ? item.month === Number(queryMonth) : true;
        const yearCondition = queryYear !== "all" ? item.year === Number(queryYear) : true;
        return yearCondition && monthCondition;
    });

    useEffect(() => {
        setActivePage("Sales");
        const fetchData = async () => {
            axios(axiosConfig("get", `https://my-kinyozi-server.onrender.com/API/sales/fetch/${params.id}`, null)).then(
                res => {
                    setSales(res?.data?.sales);
                    setYears(res?.data?.years);
                    setServices(res?.data?.services);
                }
            ).catch(err => {
                if (![404, 401].includes(err?.response?.status)) {
                    setError("Something went wrong. Try Again");
                } else {
                    setError(err?.response?.data?.message);
                }
            });
        };
        fetchData();
    }, [modifySuccessful]);

    return (
        <div className="flex flex-col text-white md:p-5">
            {addSale && <AddSale id={params.id} />}
            {saleActions && <DeleteSale />}
            <div className="w-full h-20 flex justify-between items-center border-b-[0.1px] border-gray-800">
                <h3 className="font-extralight text-4xl">Sales</h3>
                <div className="flex gap-5 h-full items-center">
                    <div className="flex flex-col gap-2">
                        <select value={queryMonth} onChange={handleMonth} className="bg-accent text-sm h-10 border-[0.1px] outline-none border-secondary text-secondary px-5 rounded-md" id="monthSelector" name="month">
                            <option value="all">All</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 h-full justify-center">
                        <select value={queryYear} onChange={handleYear} className="bg-accent h-10 border-[0.1px] outline-none border-secondary text-secondary px-5 rounded-md" id="yearSelector" name="year">
                            <option value="all">All</option>
                            {years && years.map(yr => <option key={uniqid()} value={yr}>{yr}</option>)}
                        </select>
                    </div>
                    <button onClick={() => {setAddSale(true)}} type="button" className="flex gap-2 bg-secondary w-max h-10 items-center px-6 rounded-3xl">
                        <Image src="/plus.svg" alt="plus icon" width={12} height={12} />
                        New Sale
                    </button>
                </div>
            </div>
            <div className="h-full rounded-2xl overflow-hidden p-1 relative">
                <SalesList data={filteredData} />
            </div>
        </div>
    )
}