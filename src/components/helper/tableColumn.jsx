import { FaEdit } from "react-icons/fa";
import { FaRegImage, FaTrash } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";

export const adminOrderTableColumn = (handleEdit) => [
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

    export const adminProductsTableColumn = (handleEdit, handleDelete, handleImageUpload, handleProductView) => [
        {
            sortable: false,
            disableColumnMenu: true,
            field: "id",
            headerName: "productsId",
            align: 'center',
            minWidth: 100,
            headerAlign: 'center',
            editable: false,
            headerClassName: 'text-black font-anton-sc tracking-wider',
            cellClassName: 'text-slate-800 font-anton-sc font-normal',
            sortable: false,
            width: 100,
            renderHeader: (params) => <span className='text-center'>ID</span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "productName",
            headerName: "productName",
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerClassName: 'text-black font-anton-sc tracking-wider',
            cellClassName: 'text-slate-800 font-raleway font-normal text-center',
            sortable: false,
            width: 250,
            renderHeader: (params) => <span className='text-center'>Name</span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "description",
            headerName: "description",
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerClassName: 'text-black font-anton-sc tracking-wider',
            cellClassName: 'text-slate-800 font-raleway font-normal text-center',
            sortable: false,
            width: 250,
            renderHeader: (params) => <span className='text-center'>Description</span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "image",
            headerName: "image",
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerClassName: 'text-black font-anton-sc tracking-wider',
            cellClassName: 'text-slate-800 font-raleway font-normal text-center',
            sortable: false,
            width: 250,
            renderHeader: (params) => <span className='text-center'>Image</span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "price",
            headerName: "price",
            minWidth: 150,
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerClassName: 'text-black font-anton-sc tracking-wider',
            cellClassName: 'text-slate-800 font-raleway font-normal text-center',
            sortable: true,
            width: 150,
            renderHeader: (params) => <span className='text-center'>Price</span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "stock",
            headerName: "stock",
            minWidth: 150,
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerClassName: 'text-black font-anton-sc tracking-wider',
            cellClassName: 'text-slate-800 font-raleway font-normal text-center',
            sortable: false,
            width: 150,
            renderHeader: (params) => <span className='text-center'>Stock</span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "discount",
            headerName: "discount",
            minWidth: 150,
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerClassName: 'text-black font-anton-sc tracking-wider',
            cellClassName: 'text-slate-800 font-raleway font-normal text-center',
            sortable: false,
            width: 150,
            renderHeader: (params) => <span className='text-center'>Discount(%)</span>
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
            width: 500,
            renderHeader: (params) => <span className='text-center'>Actions</span>,
            renderCell: (params) => {
                return (
                    <div className='flex justify-center items-center space-x-2 h-full p-1'>
                        <button onClick={() => handleEdit(params.row)} className='flex items-center font-semibold bg-black text-white px-4 h-9 rounded-md cursor-pointer'>
                            <FaEdit className='mr-2'/>
                            Edit
                        </button>
                        <button onClick={() => handleImageUpload(params.row)} className='flex items-center font-semibold bg-sky-700 text-white px-4 h-9 rounded-md cursor-pointer'>
                            <FaRegImage className='mr-2'/>
                            Image
                        </button>
                        <button onClick={() => handleProductView(params.row)} className='flex items-center font-semibold bg-green-800 text-white px-4 h-9 rounded-md cursor-pointer'>
                            <FaBoxOpen className='mr-2'/>
                            View
                        </button>
                        <button onClick={() => handleDelete(params.row)} className='flex items-center font-semibold bg-red-800 text-white px-4 h-9 rounded-md cursor-pointer'>
                            <FaTrash className='mr-2'/>
                            Delete
                        </button>
                    </div>
                )
            }
        }
    ];

    export const adminCategoryTableColumn = (handleEdit, handleDelete) => [
        {
            sortable: false,
            disableColumnMenu: true,
            field: "id",
            headerName: "categoryId",
            align: 'center',
            minWidth: 150,
            headerAlign: 'center',
            editable: false,
            headerClassName: 'text-black font-anton-sc tracking-wider',
            cellClassName: 'text-slate-800 font-anton-sc font-normal',
            sortable: false,
            width: 150,
            renderHeader: (params) => <span className='text-center'>ID</span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "categoryName",
            headerName: "categoryName",
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerClassName: 'text-black font-anton-sc tracking-wider',
            cellClassName: 'text-slate-800 font-raleway font-normal text-center',
            sortable: false,
            width: 180,
            renderHeader: (params) => <span className='text-center'>Name</span>
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
            width: 300,
            renderHeader: (params) => <span className='text-center'>Actions</span>,
            renderCell: (params) => {
                return (
                    <div className='flex justify-center items-center space-x-2 h-full p-1'>
                        <button onClick={() => handleEdit(params.row)} className='flex items-center font-semibold bg-black text-white px-4 h-9 rounded-md cursor-pointer'>
                            <FaEdit className='mr-2'/>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(params.row)} className='flex items-center font-semibold bg-red-800 text-white px-4 h-9 rounded-md cursor-pointer'>
                            <FaTrash className='mr-2'/>
                            Delete
                        </button>
                    </div>
                )
            }
        }
    ];