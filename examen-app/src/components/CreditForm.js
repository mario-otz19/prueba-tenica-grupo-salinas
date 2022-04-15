import React, { useContext, useEffect, useState } from 'react';
import StoreContext from '../context/store/StoreContext';

const TermstForm = () => {
    const initialState = { product: '' }
    const [searchProduct, setSearchProduct] = useState(initialState);
    const [alert, setAlert] = useState(false);
    const context = useContext(StoreContext);
    const {getProduct, clearSearch} = context;

    const handleInputChange = (e) => {
        setSearchProduct({
            ...searchProduct,
            [e.target.name]: e.target.value
        });
    }

    const handleClearSearch = (e) => {
        e.preventDefault();

        setAlert(false);
        clearSearch();
        setSearchProduct(initialState);
    }

    const sendInfo = (e) => {
        e.preventDefault();

        if (searchProduct.product === '') {
            setAlert(true);
        }

        else {
            setAlert(false);
            getProduct(searchProduct.product);
        }    
    }

    return (
        <form onSubmit={ sendInfo }>
            <div className="mb-3">
                <label htmlFor="product" className="form-label">Nombre del produto / SKU:</label>
                <input 
                    className="form-control" 
                    id="product" 
                    name="product"
                    onChange={ (e) => handleInputChange(e) }
                    placeholder="Ejemplo: Bicicleta o bcAS123FD"
                    type="text" 
                    value={ searchProduct.product }
                />
            </div>

            {
                (alert) && (
                    <div className="alert alert-danger" role="alert">
                        Para realizar la búsqueda debe introducir el nombre del producto o el SKU.
                    </div>
                )
            }

            <button type="submit" className="btn btn-primary">Buscar</button>
            <button type="submit" className="m-1 btn btn-primary" onClick={ (e) => handleClearSearch(e) }>Limpiar</button>
        </form>
    );
}

export default TermstForm;
