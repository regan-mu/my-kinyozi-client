// Appointment Schedules Page
"use client";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useContext } from 'react';
import { AdminContext } from '@/app/context/AdminContext';
import axios from 'axios';
import axiosConfig from '@/app/Utils/axiosRequestConfig';

const locales = {
  'en-US': enUS,
};

// Configure Localizer
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function Scheduling({params}) {
    const {setActivePage, appointments, setAppointments} = useContext(AdminContext);
    const currentDayClassName = 'custom-current-day';
    const today = new Date();
    const isCurrentDay = (date) => {
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    };

    // Prepare a date format compatible with react big calendar
    const transformedData = appointments.map(item => ({
        start: new Date(item.start.year, item.start.month - 1, item.start.day, item.start.hour, item.start.minute),
        end: new Date(item.end.year, item.end.month - 1, item.end.day, item.end.hour, item.end.minute),
        title: item.title
    }));

    useEffect(() => {
        setActivePage("Scheduling");
        const fetchData = async () => {
            axios(axiosConfig("get", `https://my-kinyozi-server.onrender.com/API/employees/barbers/appointments/${params.id}`, null)).then(
                res => {
                    setAppointments(res?.data?.data);
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
    }, []);
    return (
        <div className="flex flex-col md:p-5 text-secondary">
            <div className="w-full h-20 flex justify-between items-center border-b-[0.1px] border-gray-800">
                <h3 className="font-extralight text-4xl text-white">Schedule</h3>
            </div>
            <Calendar
                length={1}
                localizer={localizer}
                events={transformedData}
                startAccessor="start"
                endAccessor="end"
                views={['day','week','month']}
                style={{height: 500, margin: "16px"}}
                dayPropGetter={(date) => ({
                    className: isCurrentDay(date) ? currentDayClassName : '',
                })}
            />
        </div>
    )
}