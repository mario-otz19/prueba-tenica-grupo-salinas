import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import StoreContext from '../context/store/StoreContext';
import TermstForm from '../components/TermstForm';

export const AdminTerms = () => {
    const context = useContext(StoreContext);
    const { terms, deleteTerm } = context;
    const [ termsDetails, setTermsDetails ] = useState([]);

    const handleDeleteTerm = (termId) => {
        deleteTerm(termId);
    }

    const handleTermInfo = (p) => {
        Swal.fire({
            title: 'Información del plazo',
            html:
                `<p><b>Semanas:</b> ${p.weeks}</p>`+
                `<p><b>Tasa normal:</b> ${p.normal_rate}</p>`+
                `<p><b>Tasa puntual:</b> ${p.punctual_rate}</p>`,
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
        setTermsDetails(terms);
    }, [terms])

    return (
        <>
            <div className='m-5'>
                <h1 className='mb-5'>Administración de plazos</h1>
                    
                <TermstForm />
            </div>

            <div className='flex-grow-1 m-5 a'>                
                {
                    (termsDetails.length === 0) 
                        ? (
                            <p className='mt-3 fs-2'>
                                Aún no se han registrado plazos...
                            </p>
                        ) : (
                            <div className='d-flex flex-column mt-3'>
                                <h3>Plazos</h3>

                                <ul className="rounded-3 list-group list-group-flush">
                                    {
                                        termsDetails.map((t) => (
                                            <div key={ t.id }>
                                                <li className="d-flex justify-content-between align-items-center list-group-item">
                                                    { (t.weeks === 1) ? `${t.weeks} Semana` : `${t.weeks} Semanas` } 
                                                    
                                                    <div>
                                                        <button 
                                                            type="button" 
                                                            className="m-1 btn btn-primary"
                                                            onClick={ () => handleTermInfo(t) }
                                                        >Info</button>

                                                        <button 
                                                            type="button" 
                                                            className="m-1 btn btn-danger"
                                                            onClick={ () => handleDeleteTerm(t.id) }
                                                        >Eliminar</button>
                                                    </div>
                                                </li>
                                            </div>
                                        ))
                                    }
                                </ul>
                            </div>
                        )
                }
            </div>
        </>
    );
}