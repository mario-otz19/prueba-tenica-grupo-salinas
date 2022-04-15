import React, { useContext, useEffect, useState } from 'react';
import StoreContext from '../context/store/StoreContext';

const TermstForm = () => {
    const initialState = {
        weeks: 0,
        normal_rate: 0,
        punctual_rate: 0
    }

    const [formValues, setFormValues] = useState(initialState);
    const [alert, setAlert] = useState(false);
    const context = useContext(StoreContext);
    const {addTerm} = context;

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    const sendInfo = (e) => {
        e.preventDefault();

        if (formValues.weeks === '' || formValues.normal_rate === '' || formValues.punctual_rate === '') {
            setAlert(true);
        }

        else {
            setAlert(false);
            addTerm(formValues);
            setFormValues(initialState);
        }    
    }

    return (
        <form onSubmit={ sendInfo }>
            <div className="mb-3">
                <label htmlFor="weeks" className="form-label">Semanas:</label>
                <input 
                    className="form-control" 
                    id="weeks" 
                    name="weeks"
                    onChange={ (e) => handleInputChange(e) }
                    type="number" 
                    value={ formValues.weeks }
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="normal_rate" className="form-label">Tasa normal:</label>
                <input 
                    className="form-control" 
                    id="normal_rate" 
                    name="normal_rate"
                    onChange={ (e) => handleInputChange(e) }
                    type="text" 
                    value={ formValues.normal_rate }
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="punctual_rate" className="form-label">Tasa puntual:</label>
                <input 
                    className="form-control" 
                    id="punctual_rate" 
                    name="punctual_rate"
                    onChange={ (e) => handleInputChange(e) }
                    type="text" 
                    value={ formValues.punctual_rate }
                    />
            </div>

            {
                (alert) && (
                    <div className="alert alert-danger" role="alert">
                        Todos los campos son obligatorios.
                    </div>
                )
            }

            <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
    );
}

export default TermstForm;
