import { Suspense, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import StoreContext from '../context/store/StoreContext';
import { routes } from './routes';
import logo from '../logo.svg';

const Navigation = () => {
    const context = useContext(StoreContext);
    const { getProducts, getTerms } = context;
    
    useEffect(() => {
        getProducts();
        getTerms();
        // eslint-disable-next-line
    }, []);

    return (
        <Suspense fallback={ <span>Cargando...</span> }>
            <BrowserRouter>
                <div className='d-flex flex-row'>
                    <nav>
                        <img src={ logo } alt='React Logo' />
                        
                        <ul>
                            {
                                routes.map(({ name, to }) => (
                                    <li key={ name }>
                                        <NavLink className={ ({ isActive }) => isActive ? 'nav-active' : '' } to={ to } >{ name }</NavLink>
                                    </li>                                
                                ))
                            }
                        </ul>
                    </nav>

                    <Routes>
                        {
                            routes.map(({ component: Component, path }) => (
                                <Route 
                                    element={ <Component /> } 
                                    key={ path } 
                                    path={ path } 
                                />                              
                            ))
                        }

                        <Route path="/*" element={<Navigate to={ routes[0].to } replace />} />
                    </Routes>                
                </div>
            </BrowserRouter>
        </Suspense>
    );
}

export default Navigation;