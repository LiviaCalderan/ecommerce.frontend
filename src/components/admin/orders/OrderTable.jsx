import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { FaEdit } from "react-icons/fa";
import { adminOrderTableColumn } from '../../helper/tableColumn';
import { current } from '@reduxjs/toolkit';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Model } from '../../shared/Model';
import UpdateOrderForm from './UpdateOrderForm';

const OrderTable = ({ adminOrder, pagination }) => {

    const [currentPage, setCurrentPage] = useState(
        pagination?.pageNumber + 1 || 1
    )

    const [selectedItem, setSelectedItem] = useState("");
    const [updateOpenModel, setUpdateOpenModel] = useState(false);
    const [loader, setLoader] = useState(false);

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    const tableRecord = adminOrder?.map((item) => {
        return {
            id: item.orderId,
            email: item.email,
            totalAmount: item.totalAmount,
            status: item.orderStatus,
            orderDate: item.orderDate
        }
    })

    const handlePaginationChange = (paginationModel) => {
        const page = paginationModel.page + 1;
        setCurrentPage(page);
        params.set("page", page.toString());
        navigate(`${pathname}?${params}`);
    }

    const handleEdit = (order) => {
        setSelectedItem(order);
        setUpdateOpenModel(true);
    }

    return (
        <div>
            <h1 className='font-anton-sc text-black text-2xl text-center pb-6 uppercase'>
                All Orders
            </h1>
            <div>
                <DataGrid
                    rows={tableRecord}
                    columns={adminOrderTableColumn(handleEdit)}
                    paginationMode='server'
                    rowCount={pagination?.totalElements || 0}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: pagination?.pageSize || 10,
                                page: currentPage || -1,
                            },
                        },
                    }}
                    onPaginationModelChange={handlePaginationChange}
                    disableRowSelectionOnClick
                    disableColumnResize
                    pageSizeOptions={[pagination?.pageSize || 10]}
                    pagination
                    paginationOptions={{
                        showFirstButton: true,
                        showLastButton: true,
                        hideNextButton: currentPage === pagination?.totalPages
                    }}
                />
            </div>

            <Model
                open={updateOpenModel}
                setOpen={setUpdateOpenModel}
                title='Update Order Status'
            >
                <UpdateOrderForm
                    setOpen={setUpdateOpenModel}
                    open={updateOpenModel}
                    loader={loader}
                    setLoader={setLoader}
                    selectedId={selectedItem.id}
                    selectedItem={selectedItem}
                />
            </Model>
        </div>
    )
}

export default OrderTable