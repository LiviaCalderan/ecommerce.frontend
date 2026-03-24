import { Model } from '@/components/shared/Model';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AddSellerForm from './AddSellerForm';
import { DeleteModel } from '@/components/shared/DeleteModel';
import { useDispatch } from 'react-redux';
import { adminSellerTableColumn } from '@/components/helper/tableColumn';

const SellersTable = ({ sellers, pagination, openAddModel = false, setOpenAddModel }) => {

    const [currentPage, setCurrentPage] = useState(
        pagination?.pageNumber + 1 || 1
    )
    const [loader, setLoader] = useState(false);

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    const tableRecord = sellers?.map((item) => {
        return {
            id: item.userId,
            username: item.username,
            email: item.email,
        }
    })

    const handlePaginationChange = (paginationModel) => {
        const page = paginationModel.page + 1;
        setCurrentPage(page);
        params.set("page", page.toString());
        navigate(`${pathname}?${params}`);
    }

    return (
        <div>
            <h1 className='font-anton-sc text-black text-2xl text-center pb-6 uppercase'>
                All Sellers
            </h1>
            <div className='max-w-fit mx-auto'>
                <DataGrid
                    className="w-full"
                    rows={tableRecord}
                    columns={adminSellerTableColumn()}
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
                open={openAddModel}
                setOpen={setOpenAddModel}
                title="New Seller"
            >
                <AddSellerForm
                    setOpen={setOpenAddModel}
                    loader={loader}
                    setLoader={setLoader}
                />
            </Model>

        </div>
    )
}

export default SellersTable