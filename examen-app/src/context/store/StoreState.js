import React, { useReducer } from 'react';
import Swal from 'sweetalert2';

import StoreContext from './StoreContext';
import StoreReducer from './StoreReducer';

import axiosClient from '../../config/axios';

import { ADD_PRODUCT, ADD_TERM, CLEAR_SEARCH, DELETE_PRODUCT, DELETE_TERM, GET_PRODUCT, GET_PRODUCTS, GET_TERM, GET_TERMS, UPDATE_PRODUCT, UPDATE_TERM } from '../../types';

const StoreState = ({ children }) => {
    const initialState = {
        checking: true,
        products: [],
        productsFound: [],
        terms: []
    }

    const [state, dispatch] = useReducer(StoreReducer, initialState);

    const addProduct = async (product) => {
        try {
            const products = await axiosClient.post('/product', product);
            const { data } = products;

            Swal.fire({
                icon: 'success',
                text: data.msg
            });
    
            dispatch({
                type: ADD_PRODUCT,
                payload: data.data
            });        
        }

        catch ({ response: data }) {
            Swal.fire({
                icon: 'error',
                text: data.data.errors.errors[0].msg
            });
        }
    }

    const addTerm = async (term) => {
        try {
            const terms = await axiosClient.post('/term', term);
            const { data } = terms;

            console.log(data);

            Swal.fire({
                icon: 'success',
                text: data.msg
            });
    
            dispatch({
                type: ADD_TERM,
                payload: data.data
            });        
        }

        catch ({ response: data }) {
            Swal.fire({
                icon: 'error',
                text: data.data.errors.errors[0].msg
            });
        }
    }

    const clearSearch = () => {
        dispatch({ type: CLEAR_SEARCH });
    }

    const deleteProduct = async (productId) => {
        try {
            Swal.fire({
                title: '¿Estás seguro de eliminar el producto?',
                text: '¡Un producto eliminado no se puede recuperar!',
                showDenyButton: true,
                confirmButtonText: 'Eliminar',
                denyButtonText: `Cancelar`,
            }).then(async(result) => {
                if (result.isConfirmed) {
                    const products = await axiosClient.delete(`/product/${productId}`);
                    const { data: { msg } } = products;
            
                    dispatch({ 
                        type: DELETE_PRODUCT,
                        payload: productId
                    });

                    Swal.fire(msg, '', 'success');
                } 
                
                else if (result.isDenied) {
                    Swal.fire('El producto no se eliminó', '', 'info')
                }
            });
        } 
        
        catch ({ response: data }) {
            Swal.fire({
                icon: 'error',
                text: data.data.errors.errors[0].msg
            });
        }
    }

    const deleteTerm = async (termId) => {
        try {
            Swal.fire({
                title: '¿Estás seguro de eliminar el plazo?',
                text: '¡Un plazo eliminado no se puede recuperar!',
                showDenyButton: true,
                confirmButtonText: 'Eliminar',
                denyButtonText: `Cancelar`,
            }).then(async(result) => {
                if (result.isConfirmed) {
                    const plazo = await axiosClient.delete(`/term/${termId}`);
                    const { data: { msg } } = plazo;
            
                    dispatch({ 
                        type: DELETE_TERM,
                        payload: termId
                    });

                    Swal.fire(msg, '', 'success');
                } 
                
                else if (result.isDenied) {
                    Swal.fire('El plazo no se eliminó', '', 'info')
                }
            });
        } 
        
        catch ({ response: data }) {
            Swal.fire({
                icon: 'error',
                text: data.data.errors.errors[0].msg
            });
        }
    }

    const getProducts = async () => {
        try {
            const products = await axiosClient.get('/product');
            const { data: { data } } = products;
    
            dispatch({
                type: GET_PRODUCTS,
                payload: data
            });
        }
        
        catch ({ response: data }) {
            Swal.fire({
                icon: 'error',
                text: data.data.errors.errors[0].msg
            });
        }
    }

    const getProduct = async (search) => {
        try {
            const products = await axiosClient.get(`/product/${search}`);
            const { data: { data } } = products;
                
            dispatch({
                type: GET_PRODUCT,
                payload: data
            });
        }
        
        catch ({ response: data }) {
            Swal.fire({
                icon: 'error',
                text: data.data.errors.errors[0].msg
            });
        }
    }

    const getTerms = async () => {
        try {
            const terms = await axiosClient.get('/term');
            const { data: { data } } = terms;

            dispatch({
                type: GET_TERMS,
                payload: data
            });            
        } 
        
        catch ({ response: data }) {
            Swal.fire({
                icon: 'error',
                text: data.data.errors.errors[0].msg
            });
        }
    }

    const updateProduct = async (updatedProduct) => {
        try {
            const { sku, ...rest } = updatedProduct;
            const products = await axiosClient.put(`/product/${sku}`, rest);
            const { data } = products;

            Swal.fire({
                icon: 'success',
                text: data.msg
            });

            dispatch({
                type: UPDATE_PRODUCT,
                payload: data.data
            });        
        }

        catch ({ response: data }) {
            Swal.fire({
                icon: 'error',
                text: data.data.errors.errors[0].msg
            });
        }
    }

    return ( 
        <StoreContext.Provider
            value={{
                checking: state.checking,
                products: state.products,
                productsFound: state.productsFound,
                terms: state.terms,
                addTerm,
                addProduct,
                clearSearch,
                deleteProduct,
                deleteTerm,
                getProduct,
                getProducts,
                getTerms,
                updateProduct
            }}
        >
            { children }
        </StoreContext.Provider>
    );
}

export default StoreState;
