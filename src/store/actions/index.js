import toast from "react-hot-toast";
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
            payload: error?.response?.data?.message || "Failed to fetch categories.",
        });
    }
}

export const fetchCart = () => async (dispatch) => {
    try {
        dispatch({
            type: "IS_FETCHING"
        });
        const { data } = await api.get("/carts/users/cart");
        dispatch({
            type: "SET_CART",
            payload: data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user cart.",
        });
    }
}

export const addProductToCart = (productId, quantityCart = 1, toast, setLoader) =>
    async (dispatch) => {

        try {
            setLoader(true);
            const response = await api.post(`/carts/products/${productId}/quantity/${quantityCart}`)
            dispatch({
                type: "SET_CART",
                payload: response.data
            })
            toast.success("Product Added to Cart")

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to Add")

        } finally {
            setLoader(false);
        }


    }

export const increaseCartQuantity = (productId, toast) => async (dispatch) => {

    try {
        const { data } = await api.put(`/cart/products/${productId}/quantity/1`);

        dispatch({
            type: "SET_CART",
            payload: data
        });

    } catch (error) {
        toast.error("Error increasing quantity");
    }

}

export const decreaseCartQuantity = (productId, toast) => async (dispatch) => {
    try {
        const { data } = await api.put(`/cart/products/${productId}/quantity/delete`);

        dispatch({
            type: "SET_CART",
            payload: data
        });

    } catch (error) {
        toast.error("Error decreasing quantity");
    }

}

export const removeFromCart = (productId, toast) => async (dispatch) => {
    try {
        const response = await api.delete(`/cart/product/${productId}`)

        dispatch({
            type: 'REMOVE_CART_ITEM',
            payload: response.data
        });
        toast.success("Successfully removed!")
    } catch (error) {
        toast.error("Error removing item.")
    }
}

export const authenticateSignInUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const { data } = await api.post("/auth/signin", sendData);
        dispatch({ type: "LOGIN_USER", payload: data });
        localStorage.setItem("auth", JSON.stringify(data));
        reset()
        toast.success("Login Success");
        navigate("/");

    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data.message || "Internal Server Error")
    } finally {
        setLoader(false);
    }
}

export const registerNewUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const { data } = await api.post("/auth/signup", sendData);
        reset()
        toast.success(data?.message || "Registered Successfully");
        navigate("/login");

    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data.message || "Internal Server Error")
    } finally {
        setLoader(false);
    }
}

export const logOutUser = (navigate) => (dispatch) => {
    dispatch({ type: "LOG_OUT" })
    localStorage.removeItem("auth");
    navigate("/login");
}

export const addUpdateUserAddress = (sendData, toast, addressId, setOpenAddressModel) => async (dispatch, getState) => {

    // const { user } = getState().auth;
    dispatch({ type: "BUTTON_LOADER" })
    try {
        if (!addressId) {
            const { data } = await api.post("/addresses", sendData);
        } else {
            await api.put(`/addresses/${addressId}`, sendData);
        }
        dispatch(getUserAddresses());
        toast.success("Address saved successfully!");
        dispatch({ type: "IS_SUCCESS" })

    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data.message || "Internal Server Error")
        dispatch({ type: "IS_ERROR", payload: null })
    } finally {
        setOpenAddressModel(false);
    }
}

export const getUserAddresses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/addresses`)

        dispatch({
            type: "USER_ADDRESS",
            payload: data
        });

        dispatch({
            type: "IS_SUCCESS"
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user addresses",
        });
    }
}

export const selectCheckoutAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    }
}

export const clearCheckoutAddress = () => {
    return {
        type: "REMOVE_CHECKOUT_ADDRESS",
    }
};

export const deleteUserAddress =
    (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {
        try {
            dispatch({ type: "BUTTON_LOADER" });
            await api.delete(`/addresses/${addressId}`);
            dispatch({ type: "IS_SUCCESS" })
            dispatch(getUserAddresses());
            toast.success("Address deleted successfully!");
            dispatch(clearCheckoutAddress());
        } catch (error) {
            console.log(error);
            dispatch({
                type: "IS_ERROR",
                payload: error?.response?.data?.message || "Some Error Occured",
            });
        } finally {
            setOpenDeleteModal(false);
        }
    }

export const selectedPaymentMethod = (method) => {
    return {
        type: "ADD_PAYMENT_METHOD",
        payload: method
    }
}

export const createStripePaymentSecret = (sendData) =>
    async (dispatch, getState) => {

        try {
            dispatch({ type: "IS_FETCHING" });

            const { data } = await api.post("/order/stripe-client-secret", sendData)

            dispatch({
                type: "CLIENT_SECRET",
                payload: data
            })
            localStorage.setItem("client-secret", JSON.stringify(data))

            dispatch({
                type: "IS_SUCCESS"
            });

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to create Client Secret")

        }


    }

export const stripePaymentConfirmation = (sendData, setErrorMessage, setLoading, toast) =>
    async (dispatch, getState) => {

        try {

            const { data } = await api.post("/order/user/payments/online", sendData)
            if (data) {
                localStorage.removeItem("client-secret")
                dispatch({
                    type: "REMOVE_CLIENT_SECRET_ADDRESS"
                })
                dispatch({
                    type: "CLEAR_CART"
                })
                toast.success("Order Accepted.")
            } else {
                setErrorMessage("Payment Failed. Please, try again.")
            }

        } catch (error) {
            setErrorMessage("Payment Failed. Please, try again.")

        }


    }

export const analyticsAction = () => async (dispatch, getState) => {

    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/admin/app/analytics`)
        dispatch({
            type: "FETCHING_ANALYTICS",
            payload: data
        })
        dispatch({
            type: "IS_SUCCESS"
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch analytics data."
        });
    }

}

export const getDashboardOrders = (queryString) => async (dispatch) => {

    try {
        dispatch({
            type: "IS_FETCHING"
        });

        const { data } = await api.get(`/admin/orders?${queryString}`)
        dispatch({
            type: "FETCHING_DASHBOARD_ORDERS",
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
            payload: error?.response?.data?.message || "Failed to fetch orders."
        });
    }

}

export const updateOrderStatusFromDashboard = (orderId, orderStatus, toast, setLoader) => async (dispatch) => {

    try {
        setLoader(true)
        const { data } = await api.put(`/admin/orders/${orderId}/status`, { orderStatus: orderStatus })
        toast.success(data.message || "Order updated successfully.")
        await dispatch(getDashboardOrders());

    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error.")
    } finally {
        setLoader(false)
    }
}

export const dashboardProductsAction = (queryString) => async (dispatch) => {
    try {
        dispatch({
            type: "IS_FETCHING"
        });

        const { data } = await api.get(`/admin/products?${queryString}`)
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
            payload: error?.response?.data?.message || "Failed to fetch products for dashboard",
        });
    }
}

export const updateProductInfoFromDashboard = (productId, sendData, reset, toast, setLoader, setOpen) => async (dispatch) => {

    try {
        setLoader(true)
        const { data } = await api.put(`/admin/products/${productId}`, sendData)
        toast.success(data.message || "Product updated successfully.")
        reset();
        setLoader(false);
        await dispatch(dashboardProductsAction())

    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Product Update Failed.")
    } finally {
        setOpen(false);
    }
}



