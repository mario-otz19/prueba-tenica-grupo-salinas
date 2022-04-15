import { AdminProducts, AdminTerms, CreditRating } from '../pages';

export const routes = [
    {
        to: '/administracion-productos',
        path: 'administracion-productos',
        component: AdminProducts,
        name: 'Administración de productos'
    },
    {
        to: '/administracion-plazos',
        path: 'administracion-plazos',
        component: AdminTerms,
        name: 'Administración de plazos'
    },
    {
        to: '/cotizacion-credito',
        path: 'cotizacion-credito',
        component: CreditRating,
        name: 'Cotización de crédito'
    },
];