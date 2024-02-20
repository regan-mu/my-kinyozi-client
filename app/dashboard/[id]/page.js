"use client";
import { AdminContext } from "@/app/context/AdminContext";
import { useContext, useEffect, useState } from "react";
import { Card, AreaChart, Title, Metric, Text, DonutChart, BarChart} from "@tremor/react";
import { customTooltip, donutTooltip } from "@/app/Utils/TremorTooltips";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";
import CurrencyFormatter from "@/app/Utils/CurrencyParser";
import { useRouter } from "next/navigation";


export default function Dasbboard({params}) {
    const {setActivePage, setHomeData, homeData} = useContext(AdminContext);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        setActivePage("Home");
        axios(axiosConfig("get", `https://my-kinyozi-server.onrender.com/API/shop/${params.id}`, null)).then(
            res => {
                setHomeData(res?.data);
            }
        ).catch(err => {
            if (![404, 401].includes(err?.response?.status)) {
                setError("Something went wrong. Try Again");
            } else {
                setError(err?.response?.data?.message);
                setTimeout(() => {router.push("/")}, 4000);
            }
        });

    }, []);
    return (
        <div className="flex flex-col text-white md:p-5">
            <div className="h-auto rounded-2xl relative flex flex-col gap-5">
                {error && <div className="w-full h-10 text-sm absolute left-0 -top-5 flex items-center justify-center font-semibold bg-red-200 text-red-600 z-20">{error}</div> }
                <div className="grid grid-cols-4 gap-5 dark-tremor">
                    <Card className="max-w-xs mx-auto bg-accent border-l-[0.1px]" decoration="left" decorationColor="violet-500">
                        <Text className="text-white">Most Popular Service</Text>
                        <Metric className="text-gray-400 text-tremor-title">{homeData?.popular_service ? homeData?.popular_service : <>...</>}</Metric>
                    </Card>
                    <Card className="max-w-xs mx-auto bg-accent border-l-[0.1px]" decoration="left" decorationColor="violet-500">
                        <Text className="text-white">Current Month Sales</Text>
                        <Metric className="text-gray-400 text-tremor-title">{homeData?.current_month_sales ? CurrencyFormatter(homeData?.current_month_sales): <>...</>}</Metric>
                    </Card>
                    <Card className="max-w-xs mx-auto bg-accent border-l-[0.1px]" decoration="left" decorationColor="violet-500">
                        <Text className="text-white">Current Month Expenses</Text>
                        <Metric className="text-gray-400 text-tremor-title">{homeData?.current_month_expenses ? CurrencyFormatter(homeData?.current_month_expenses): <>...</>}</Metric>
                    </Card>
                    <Card className="max-w-xs mx-auto bg-accent border-l-[0.1px]" decoration="left" decorationColor="violet-500">
                        <Text className="text-white">Equipment Value</Text>
                        <Metric className="text-gray-400 text-tremor-title">{homeData?.equipment_value ? CurrencyFormatter(homeData?.equipment_value): <>...</>}</Metric>
                    </Card>
                </div>
                <div className="bg-accent rounded-md flex items-center justify-center">
                    <Card className="dark-tremor bg-accent overflow-hidden rounded-sm">
                        <Title className="text-gray-300 font-extralight">Sales Performance</Title>
                        <AreaChart
                            className="mt-6"
                            data={homeData?.sales}
                            index="day"
                            categories={["sales"]}
                            colors={["violet-500"]}
                            yAxisWidth={40}
                            showLegend={false}
                            showAnimation={true}
                            customTooltip={customTooltip}
                        />
                    </Card>
                </div>
                <div className="grid grid-cols-3 gap-5 dark-tremor pb-5">
                    <Card className="w-full bg-accent col-span-2 border-l-[0.1px] border-secondary">
                        <Title className="text-gray-300 font-light">Expenses</Title>
                        <BarChart
                            className="mt-6 h-80 dark-tremor-brand-subtle"
                            data={homeData?.expenses}
                            index="account"
                            categories={["amount"]}
                            colors={["violet"]}
                            yAxisWidth={48}
                            customTooltip={customTooltip}
                            showLegend={false}
                            showAnimation={true}
                        />
                    </Card>
                    <div className="flex flex-col gap-5">
                        <Card className="max-w-xs mx-auto bg-accent border-l-[0.1px] dark-tremor" decoration="left" decorationColor="violet-500">
                            <Title className="text-gray-300 font-light">Payment Methods</Title>
                            <DonutChart
                                className="mt-6"
                                data={homeData?.payment_methods}
                                category="transactions"
                                index="method"
                                colors={["blue-500", "violet-500", "indigo-500", "gray-700"]}
                                showAnimation={true}
                                showLabel={false}
                                customTooltip={donutTooltip}
                            />
                        </Card>
                        <Card className="max-w-xs mx-auto bg-accent border-l-[0.1px]" decoration="left" decorationColor="violet-500">
                            <Text className="text-white">Most Popular Service</Text>
                            <Metric className="text-gray-400 text-tremor-title">{homeData?.popular_service ? homeData?.popular_service : <>...</>}</Metric>
                        </Card>
                    </div>
                </div>
            </div> 
        </div>
    )
}