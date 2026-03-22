import { FaEdit } from "react-icons/fa";

export const adminOrderTableColumn = (handleEdit, handleDelete, handleImageUpload, handleProductView) => [
        {
            sortable: false,
            disableColumnMenu: true,
            field: "id",
            headerName: "orderId",
            minWidth: 180,
            headerAlign: 'center',
            editable: false,
            headerClassName: 'text-black font-anton-sc tracking-wider',
            cellClassName: 'text-slate-800 font-anton-sc font-normal',
            sortable: false,
            width: 250,
            renderHeader: (params) => <span className='text-center'>Order ID</span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "email",
            headerName: "email",
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerClassName: 'text-black font-anton-sc tracking-wider',
            cellClassName: 'text-slate-800 font-raleway font-normal text-center',
            sortable: false,
            width: 250,
            renderHeader: (params) => <span className='text-center'>Email</span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "totalAmount",
            headerName: "totalAmount",
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerClassName: 'text-black font-anton-sc tracking-wider',
            cellClassName: 'text-slate-800 font-raleway font-normal text-center',
            sortable: true,
            width: 250,
            renderHeader: (params) => <span className='text-center'>Total Amount</span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "status",
            headerName: "status",
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerClassName: 'text-black font-anton-sc tracking-wider',
            cellClassName: 'text-slate-800 font-raleway font-normal text-center',
            sortable: false,
            width: 250,
            renderHeader: (params) => <span className='text-center'>Status</span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "orderDate",
            headerName: "orderDate",
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerClassName: 'text-black font-anton-sc tracking-wider',
            cellClassName: 'text-slate-800 font-raleway font-normal text-center',
            sortable: false,
            width: 250,
            renderHeader: (params) => <span className='text-center'>Order Date</span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "action",
            headerName: "Action",
            minWidth: 180,
            headerAlign: 'center',
            editable: false,
            headerClassName: 'text-black font-anton-sc tracking-wider',
            cellClassName: 'text-slate-800 font-raleway font-normal',
            sortable: false,
            width: 250,
            renderHeader: (params) => <span className='text-center'>Action</span>,
            renderCell: (params) => {
                return (
                    <div className='flex justify-center items-center space-x-2 h-full p-1'>
                        <button onClick={() => handleEdit(params.row)} className='flex items-center font-semibold bg-black text-white px-4 h-9 rounded-md'>
                            <FaEdit className='mr-2'/>
                            Edit
                        </button>
                    </div>
                )
            }
        }
    ];