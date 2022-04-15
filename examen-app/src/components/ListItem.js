import React from 'react';
import bootstrap from 'bootstrap';

const List = ({ product }) => {
    return (
            <ul className="rounded-3 list-group list-group-flush">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
                <li className="list-group-item">A fourth item</li>
                <li className="list-group-item">And a fifth one</li>
            </ul>
    );
}

export default List
