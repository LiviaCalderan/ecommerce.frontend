const initialState = {
    analytics: {},
};

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCHING_ANALYTICS":
            return {
                ...state,
                analytics: action.payload
                
            };

    
        default:
            return state;
    }
};