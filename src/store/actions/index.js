import api from "../../api/api"

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({
            type: "IS_FETCHING"
        });

        const { data } = await api.get(`/public/products?${queryString}`)
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });

        dispatch({
            type: "IS_SUCCESS"
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products",
        });
    }
}

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({
            type: "CATEGORY_LOADER"
        });

        const { data } = await api.get(`/public/categories`)
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });

        dispatch({
            type: "CATEGORY_SUCCESS"
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories",
        });
    }
}

export const addToCart = (data, quantityCart = 1, toast) =>
    (dispatch, getState) => {
        // FIND THE PRODUCT
        const { products } = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        //CHECK STOCKS
        const quantityExist = getProduct.stock >= quantityCart;

        // IF STOCK -> ADD
        if (quantityExist) {
            dispatch({ type: "ADD_CART", payload: { ...data, quantity: quantityCart } });
            toast.success(`Added to Cart`);
            localStorage.setItem("cartItemsStored", JSON.stringify(getState().carts.cart));
        } else {
            toast.error(`Failed to Add`);
        }

    }

export const increaseCartQuantity = (data, toast, currentQuantity, setCurrentQuantity) => (dispatch, getState) => {
    // FIND THE PRODUCT
    const { products } = getState().products;
    const getProduct = products.find(
        (item) => item.productId === data.productId
    );

    const availableStock = getProduct?.stock ?? Number.POSITIVE_INFINITY;
    const quantityExist = availableStock >= currentQuantity + 1;

    if (quantityExist) {
        const newQuantity = currentQuantity + 1;
        setCurrentQuantity(newQuantity);

        dispatch({
            type: 'UPDATE_CART_QUANTITY',
            payload: { productId: data.productId, quantity: newQuantity }
        });
        localStorage.setItem("cartItemsStored", JSON.stringify(getState().carts.cart));
    } else {
        toast.error("Quantity Reached to Limit");
    }
}

export const decreaseCartQuantity = (data, newQuantity) => (dispatch, getState) => {
    dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: { productId: data.productId, quantity: newQuantity }
    });
    localStorage.setItem("cartItemsStored", JSON.stringify(getState().carts.cart));
}

export const removeFromCart = (data, toast) => (dispatch, getState) => {
    dispatch({
        type: 'REMOVE_CART_ITEM',
        payload: data
    });
    toast.success("Successfully removed!")
    localStorage.setItem("cartItemsStored", JSON.stringify(getState().carts.cart));
}
