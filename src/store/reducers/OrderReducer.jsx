const initialState = {
    adminOrder: null,
    pagination: {},
    userOrder: null
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCHING_DASHBOARD_ORDERS":
            return {
                ...state,
                adminOrder: action.payload,
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },

            };

        case "FETCHING_USER_ORDERS":
            return {
                ...state,
                userOrder: action.payload,
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },

            };

        default:
            return state;
    }
};