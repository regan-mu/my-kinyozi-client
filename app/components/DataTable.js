import Box from '@mui/material/Box';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import { styled } from '@mui/system';

const CustomDataGrid = styled(DataGrid)({
    color: 'white',
    border: 'none',
    "& .MuiDataGrid-checkboxInput": {
        color: '#fff !important', // Change the color of the checkbox
    },
    "& .css-c63i49-MuiInputBase-input-MuiInput-input": {
        color: "#fff !important"
    },
    "& .MuiDataGrid-cell": {
        borderBottomWidth: "0.1px",
        borderColor: "#252525",
        overflow: "visible"
    },
    "& .MuiTablePagination-displayedRows": {
        color: '#fff !important', // Color for pagination controls
    },
    "& .MuiTablePagination-actions": {
        color: "#fff !important"
    },
    "& .Mui-disabled": {
        color: "#A4A4A4  !important"
    },
    "& .MuiButtonBase-root": {
        color: "#fff"
    },
    "& .MuiSvgIcon-root": {
        color: "#fff !important"
    },
    "& .MuiDataGrid-footerContainer": {
        borderColor: "#252525"
    }
});

const DataTable = ({rows, columns}) => {
    return (
        <section className="data__grid text-white">
            <Box sx={{"&": { eight: "100%", width: '100%', backgroundColor: '#151522'}}}>
                <CustomDataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 8,
                        },
                    },
                    }}
                    pageSizeOptions={[8]}
                    checkboxSelection 
                    disableRowSelectionOnClick
                    slots={{ toolbar: GridToolbar, 
                    }}
                    slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },  
                    },
                    }}
                />
            </Box>
        </section>
    )
}

export default DataTable;