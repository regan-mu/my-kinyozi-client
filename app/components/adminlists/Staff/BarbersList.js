import DataTable from "../../DataTable";
import { AdminContext } from "@/app/context/AdminContext";
import { StaffContext } from "@/app/context/StaffContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";

export default function BarbersList({id}) {
    const {barbers, setBarbers} = useContext(AdminContext);
    const {setIdToMutate, changeBarberStatus, setStaffActions} = useContext(StaffContext);
    const [error, setError] = useState("");

    // Verify Barber
    const handleVerifyBarber = (id) => {
        setStaffActions("verify");
        setIdToMutate(id);
    }

    // Deactivate Barber
    const handleDeactivateBarber = (id) => {
        setStaffActions("deactivate");
        setIdToMutate(id);
    }

    // Load barbers list
    useEffect(() => {
        const loadData = () => {
            axios(axiosConfig("get", `https://my-kinyozi-server.onrender.com/API/employees/barbers/all/${id}`, null)).then(
                res => {
                    setBarbers(res?.data?.barbers);
                }
            ).catch(
                err => {
                    if (![404, 401, 409].includes(err?.response?.status)) {
                        setError("Something went wrong. Try Again");
                    } else {
                        setError(err?.response?.data?.message);
                    }
                }
            );
        }
        loadData();

    }, [changeBarberStatus]);

    const staffColumns = [
        {
            field: "barbershopId",
            headerName: "Id", 
            width: 100, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "name",
            headerName: "Name", 
            width: 250, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "status",
            headerName: "Status", 
            width: 200, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            headerAlign: "center",
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="cursor-pointer w-full h-full flex justify-center items-center gap-5" >
                    <button onClick={() => {handleDeactivateBarber(params?.row?.id)}} className="px-5 py-1 bg-red-600 text-xm rounded-md" type="button">Remove</button>
                       {params?.row?.status === "PENDING" && <button onClick={() => {handleVerifyBarber(params?.row?.id)}} className="px-5 py-1 bg-green-600 text-xm rounded-md" type="button">Verify</button>}
                    </div>
                )
            }
        }
    ]
    return (
        <DataTable columns={staffColumns} rows={barbers} />
    )

}