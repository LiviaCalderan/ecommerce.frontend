import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { dashboardProductsAction } from '../store/actions';

const useDashboardProductFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
        params.set("pageNumber", currentPage - 1);

        const sortOrder = searchParams.get("sortby") || "asc";
        params.set("sortBy", "price");
        params.set("sortOrder", sortOrder);


        const queryString = params.toString();
        console.log("QUERY STRING", queryString)

        dispatch(dashboardProductsAction(queryString));

    }, [dispatch, searchParams]);

}
export default useDashboardProductFilter;