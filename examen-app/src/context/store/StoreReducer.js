import { ADD_PRODUCT, ADD_TERM, CLEAR_SEARCH, DELETE_PRODUCT, DELETE_TERM, GET_PRODUCT, GET_PRODUCTS, GET_TERMS, UPDATE_PRODUCT } from "../../types";

const StoreReducer = (state, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                checking: false,
                products: [ ...state.products, action.payload ]
            }
        
        case ADD_TERM:
            return {
                ...state,
                checking: false,
                terms: [ ...state.terms, action.payload ]
            }
        
        case CLEAR_SEARCH:
            return {
                ...state,
                checking: false,
                productsFound: []
            }
        
        case DELETE_PRODUCT:
            return {
                ...state,
                checking: false,
                products: state.products.filter((p) => (p.sku !== action.payload))
            }
        
        case DELETE_TERM:
            return {
                ...state,
                checking: false,
                terms: state.terms.filter((p) => (p.id !== action.payload))
            }

        case GET_PRODUCT:
            return {
                ...state,
                checking: false,
                productsFound: [ ...action.payload ]
            }

        case GET_PRODUCTS:
            return {
                ...state,
                checking: false,
                products: [ ...action.payload ]
            }

        case GET_TERMS:
            return {
                ...state,
                checking: false,
                terms: [ ...action.payload ]
            }
        
        case UPDATE_PRODUCT:
            console.log(action.payload);
            return {
                ...state,
                checking: false,
                products: state.products.map((p) => (p.sku === action.payload.sku) ? (action.payload) : (p) ) 
            }
    
        default:
            return state;
    }
}
 
export default StoreReducer;