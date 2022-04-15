import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import StoreContext from '../context/store/StoreContext';
import ProductForm from '../components/ProductForm';

export const AdminProducts = () => {
    const context = useContext(StoreContext);
    const { products, deleteProduct } = context;
    const [ productDetails, setProductDetails ] = useState([]);

    const [edit, setEdit] = useState(false);
    const [productSku, setProductSku] = useState({});

    const handleDeleteProduct = (productId) => {
        deleteProduct(productId);
    }

    const handleEditProduct = (productSku) => {
        setProductSku(productSku);
        setEdit(true);
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
        setProductDetails(products);
    }, [products])

    return (
        <>
            <div className='m-5'>
                <h1 className='mb-5'>Administración de productos</h1>
                    
                {
                    (!edit) 
                        ? (
                            <ProductForm />
                        ) : (
                            <ProductForm 
                                edit={ edit }
                                productSku={ productSku }
                                setEdit={ setEdit }
                            />
                        )
                }
            </div>

            <div className='flex-grow-1 m-5 a'>                
                {
                    (productDetails.length === 0) 
                        ? (
                            <p className='mt-3 fs-2'>
                                Aún no se han registrado productos...
                            </p>
                        ) : (
                            <div className='d-flex flex-column mt-3'>
                                <h3>Productos</h3>

                                <ul className="rounded-3 list-group list-group-flush">
                                    {
                                        productDetails.map((p) => (
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
                                                            onClick={ () => handleDeleteProduct(p.sku) }
                                                        >Eliminar</button>
                                        
                                                        <button 
                                                            type="button" 
                                                            className="m-1 btn btn-secondary"
                                                            onClick={ () => handleEditProduct(p.sku) }
                                                        >Editar</button>
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