import React, { useState } from 'react'
import UpdateProductForm from './UpdateProductForm';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Model } from '../../shared/Model';
import { DataGrid } from '@mui/x-data-grid';
import { adminProductsTableColumn } from '../../helper/tableColumn';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteModel } from '../../shared/DeleteModel';
import { deleteProduct } from '../../../store/actions';
import toast from 'react-hot-toast';

const ProductsTable = ({ product, pagination, openAddModel = false, setOpenAddModel }) => {

    const [currentPage, setCurrentPage] = useState(
        pagination?.pageNumber + 1 || 1
    )

    const dispatch = useDispatch();

    const [selectedItem, setSelectedItem] = useState("");
    const [updateOpenModel, setUpdateOpenModel] = useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [loader, setLoader] = useState(false);

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    const tableRecord = product?.map((item) => {
        return {
            id: item.productId,
            productName: item.productName,
            description: item.description,
            image: item.image,
            price: item.price,
            stock: item.stock,
            discount: item.discount
        }
    })

    const handlePaginationChange = (paginationModel) => {
        const page = paginationModel.page + 1;
        setCurrentPage(page);
        params.set("page", page.toString());
        navigate(`${pathname}?${params}`);
    }

    const handleEdit = (product) => {
        setSelectedItem(product);
        setUpdateOpenModel(true);
    }

    const handleDelete = (product) => {
        setSelectedItem(product);
        setOpenDeleteModel(true);
    }

    const handleImageUpload = (product) => {
        setSelectedItem(product);
    }

    const handleProductView = (product) => {
        setSelectedItem(product);
    }

    const onDeleteHandler = () => {
        const productId = selectedItem?.id;
        if (!productId) {
            toast.error("Product ID not found.");
            return;
        }
        dispatch(deleteProduct(setLoader, productId, toast, setOpenDeleteModel));
    }

    return (
        <div>
            <h1 className='font-anton-sc text-black text-2xl text-center pb-6 uppercase'>
                All Products
            </h1>
            <div>
                <DataGrid
                    rows={tableRecord}
                    columns={adminProductsTableColumn(handleEdit, handleDelete, handleImageUpload, handleProductView)}
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
                open={updateOpenModel || openAddModel}
                setOpen={updateOpenModel ? setUpdateOpenModel : setOpenAddModel}
                title={updateOpenModel ? "Update Product Info" : "Add a New Product"}
            >
                <UpdateProductForm
                    setOpen={updateOpenModel ? setUpdateOpenModel : setOpenAddModel}
                    update={updateOpenModel}
                    loader={loader}
                    setLoader={setLoader}
                    selectedId={selectedItem.id}
                    selectedItem={selectedItem}
                />
            </Model>

            <DeleteModel
                open={openDeleteModel}
                setOpen={setOpenDeleteModel}
                title='Delete Product'
                onDeleteHandler={onDeleteHandler}/>
        </div>
    )
}

export default ProductsTable
