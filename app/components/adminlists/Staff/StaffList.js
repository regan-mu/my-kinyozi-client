import DataTable from "../../DataTable";
import { AdminContext } from "@/app/context/AdminContext";
import { StaffContext } from "@/app/context/StaffContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";

export default function StaffList({id}) {
    const {staff, setStaff} = useContext(AdminContext);
    const {setStaffActions, setIdToMutate, staffMutation} = useContext(StaffContext);
    const [error, setError] = useState("");

    // Open Remove Staff
    const handleRemoveStaff = (id) => {
        setStaffActions("remove");
        setIdToMutate(id);
    }

    // Open Update staff
    const handleUpdateStaff = (id) => {
        setStaffActions("update");
        setIdToMutate(id);
    }

    // Load Other Staff list
    useEffect(() => {
        const loadData = () => {
            axios(axiosConfig("get", `https://my-kinyozi-server.onrender.com/API/employees/all/${id}`, null)).then(
                res => {
                    setStaff(res?.data?.staff);
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

    }, [staffMutation]);
    const staffColumns = [
        {
            field: "id",
            headerName: "id", 
            width: 70, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "f_name",
            headerName: "f_Name", 
            width: 120, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "l_name",
            headerName: "l_Name", 
            width: 120, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "email",
            headerName: "Email", 
            width: 150, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "phone",
            headerName: "Phone", 
            width: 150, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "role",
            headerName: "Role", 
            width: 100, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            headerAlign: "center",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cursor-pointer w-full h-full flex justify-center items-center gap-5" >
                        <button onClick={() => (handleRemoveStaff(params?.row?.id))} className="px-5 py-1 bg-red-500 text-xm rounded-md" type="button">Remove</button>
                        <button onClick={() => {handleUpdateStaff(params?.row?.id)}}  className="px-5 py-1 bg-secondary text-xm rounded-md" type="button">Update</button>
                    </div>
                )
            }
        }
    ]
    return (
        <DataTable columns={staffColumns} rows={staff} />
    )

}