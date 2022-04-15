import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import StoreContext from '../context/store/StoreContext';
import CreditForm from '../components/CreditForm';

export const CreditRating = () => {
    const context = useContext(StoreContext);
    const { productsFound, terms } = context;

    const [detailsProdcutsFound, setDetailsProdcutsFound] = useState([]);
    const [creditQuote, setCreditQuote] = useState(false);
    const [productData, setProductData] = useState({});
    const [suscriptions, setSuscriptions] = useState({
        weekly: 0,
        punctual: 0
    });


    const handleCreditQuote = (product) => {
        setCreditQuote(true);
        setProductData(product);
    }

    const calculateSubscriptions = (weeks) => {
        if (Number(weeks) === 0) {
            setSuscriptions({
                weekly: 0,
                punctual: 0
            });
        }

        else {
            const [ rateTime ] = terms.filter((t) => (Number(t.id) === Number(weeks)));
            
            const weeklySubscription = (((productData.price * rateTime.normal_rate) + productData.price)/rateTime.weeks).toFixed(2);
            const punctualPayment = (((productData.price * rateTime.punctual_rate) + productData.price)/rateTime.weeks).toFixed(2);
    
            setSuscriptions({
                weekly: weeklySubscription,
                punctual: punctualPayment
            });
        }
    }

    const handleProductInfo = (p) => {
        Swal.fire({
            title: 'Información del producto',
            html:
            `<p><b>SKU:</b> ${p.sku}</p>`+
            `<p><b>Nombre:</b> ${p.name}</p>`+
            `<p><b>Descripción:</b> ${p.description}</p>`+
            `<p><b>Precio:</b> $${p.price}</p>`,
            confirmButtonText: 'Aceptar',
            width: 600,
            padding: '3em',
            color: '#716add',
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://i.gifer.com/H5z.gif")
              left top
              no-repeat
            `
          });
    }

    useEffect(() => {
        setDetailsProdcutsFound(productsFound);
    }, [productsFound]);

    // useEffect(() => {
        // calculateSubscriptions();
    // }, [termProduct]);

    return (
        <>
            <div className='m-5'>
                <h1 className='mb-5'>Cotización de crédito</h1>
                    
                <CreditForm />
            </div>

            <div className='flex-grow-1 m-5 a'>                
                {
                    (detailsProdcutsFound.length > 0) 
                        ? (
                            <div className='d-flex flex-column mt-3'>
                                <h3>Plazos</h3>

                                <ul className="rounded-3 list-group list-group-flush">
                                    {
                                        detailsProdcutsFound.map((p) => (
                                            <div key={ p.sku }>
                                                <li className="d-flex justify-content-between align-items-center list-group-item">
                                                    { p.name }  
                                                    
                                                    <div>
                                                        <button 
                                                            type="button" 
                                                            className="m-1 btn btn-primary"
                                                            onClick={ () => handleProductInfo(p) }
                                                        >Info</button>

                                                        <button 
                                                            type="button" 
                                                            className="m-1 btn btn-danger"
                                                            onClick={ () => handleCreditQuote(p) }
                                                        >Cotizar crédito</button>
                                                    </div>
                                                </li>
                                            </div>
                                        ))
                                    }
                                </ul>
                            </div>
                        ) : null
                }

                {
                    (creditQuote) 
                                ? (
                                    <div className='m-5'>
                                        <h2>Cotización</h2>

                                        <div className='mt-4'>
                                            <p>
                                                <b>SKU:</b> { productData.sku }
                                            </p>

                                            <p>
                                                <b>Nombre:</b> { productData.name }
                                            </p>
                                            
                                            <p>
                                                <b>Precio:</b> ${ productData.price }
                                            </p>
                                            
                                            <select 
                                                aria-label="Default select example"
                                                className="form-select" 
                                                onChange={ (e) => calculateSubscriptions(e.target.value) }
                                            >
                                                <option value={ 0 }>Selecciona un plazo</option>
                                                {
                                                    terms.map((t) => (
                                                        <option key={ t.weeks } value={ t.weeks }>{t.weeks} { (t.weeks === 1) ? `Semana` : `Semanas` }</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        {
                                            (Number(suscriptions.weekly) !== 0) && (
                                                <div className='mt-5'>
                                                    <h2>Detalles de cotización</h2>
                                                    
                                                    <div className='mt-4'>
                                                        <p>
                                                            {/* <b>Semanas:</b> { termProduct } */}
                                                        </p>

                                                        <p>
                                                            <b>Abono semanal:</b> { suscriptions.weekly }
                                                        </p>
                                                        
                                                        <p>
                                                            <b>Abono puntual:</b> ${ suscriptions.punctual }
                                                        </p>         
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                ) : null
                }
            </div>

        </>
    );
}