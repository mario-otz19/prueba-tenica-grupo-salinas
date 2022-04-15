import React, { useContext, useEffect, useState } from 'react';
import StoreContext from '../context/store/StoreContext';

const ProductForm = ({ edit, productSku, setEdit }) => {
    const initialState = {
        sku: '',
        name: '',
        description: '',
        price: ''
    }

    const [formValues, setFormValues] = useState(initialState);
    const [alert, setAlert] = useState(false);
    const context = useContext(StoreContext);
    const {products, addProduct, updateProduct} = context;

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    const sendInfo = (e) => {
        e.preventDefault();

        if (formValues.sku === '' || formValues.name === '' || formValues.description === '' || formValues.price === '') {
            setAlert(true);
        }

        else {
            if (edit) {
                setEdit(false);
                updateProduct(formValues);
            }

            else {
                addProduct(formValues);
            }

            setAlert(false);
            setFormValues(initialState);
        }    
    }

    useEffect(() => {
        if (edit) {
            const [ productInfo ] = products.filter((p) => (p.sku === productSku));
            setFormValues(productInfo);
        }
    }, [productSku]);

    return (
        <form onSubmit={ sendInfo }>
            {
                (!edit) && (
                    <div className="mb-3">
                        <label htmlFor="sku" className="form-label">SKU:</label>
                        <input 
                            className="form-control" 
                            id="sku" 
                            name="sku"
                            onChange={ (e) => handleInputChange(e) }
                            type="text" 
                            value={ formValues.sku }
                        />
                    </div>
                )
            }

            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre:</label>
                <input 
                    className="form-control" 
                    id="name" 
                    name="name"
                    onChange={ (e) => handleInputChange(e) }
                    type="text" 
                    value={ formValues.name }
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripción:</label>
                <input 
                    className="form-control" 
                    id="description" 
                    name="description"
                    onChange={ (e) => handleInputChange(e) }
                    type="text" 
                    value={ formValues.description }
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label">Precio:</label>
                <input 
                    className="form-control" 
                    id="price" 
                    name="price"
                    onChange={ (e) => handleInputChange(e) }
                    type="text" 
                    value={ formValues.price }
                    />
            </div>

            {
                (alert) && (
                    <div className="alert alert-danger" role="alert">
                        Todos los campos son obligatorios.
                    </div>
                )
            }

            <button type="submit" className="btn btn-primary">{ (edit) ? 'Actualizar' : 'Agregar' }</button>
        </form>
    );
}

export default ProductForm;
