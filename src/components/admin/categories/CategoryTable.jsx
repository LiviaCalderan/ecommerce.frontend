import { DeleteModel } from '@/components/shared/DeleteModel';
import { Model } from '@/components/shared/Model';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import UpdateCategoryForm from './UpdateCategoryForm';
import { adminCategoryTableColumn } from '@/components/helper/tableColumn';
import { deleteCategory } from '@/store/actions';
import toast from 'react-hot-toast';

const CategoryTable = ({ categories, pagination, openAddModel = false, setOpenAddModel }) => {

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

    const tableRecord = categories?.map((item) => {
        return {
            id: item.categoryId,
            categoryName: item.categoryName
        }
    })

    const handlePaginationChange = (paginationModel) => {
        const page = paginationModel.page + 1;
        setCurrentPage(page);
        params.set("page", page.toString());
        navigate(`${pathname}?${params}`);
    }

    const handleEdit = (category) => {
        setSelectedItem(category);
        setUpdateOpenModel(true);
    }

    const handleDelete = (category) => {
        setSelectedItem(category);
        setOpenDeleteModel(true);
    }

    const onDeleteHandler = () => {
        const categoryId = selectedItem?.id;
        if (!categoryId) {
            toast.error("Category ID not found.");
            return;
        }
        dispatch(deleteCategory(setLoader, categoryId, toast, setOpenDeleteModel));
    }

    return (
        <div>
            <h1 className='font-anton-sc text-black text-2xl text-center pb-6 uppercase'>
                All Categories
            </h1>
            <div className='max-w-fit mx-auto'>
                <DataGrid
                    className='w-full'
                    rows={tableRecord}
                    columns={adminCategoryTableColumn(handleEdit, handleDelete)}
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
                title={updateOpenModel ? "Update Category Name" : "Add a New Category"}
            >
                <UpdateCategoryForm
                    setOpen={updateOpenModel ? setUpdateOpenModel : setOpenAddModel}
                    update={updateOpenModel}
                    loader={loader}
                    setLoader={setLoader}
                    selectedId={selectedItem.id}
                    selectedItem={selectedItem}
                    categories={categories}
                />
            </Model>

            <DeleteModel
                open={openDeleteModel}
                setOpen={setOpenDeleteModel}
                title='Delete Category'
                onDeleteHandler={onDeleteHandler} />
        </div>
    )
}

export default CategoryTable