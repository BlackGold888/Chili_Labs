import React from 'react';
import { ProductProps } from "@/types/product";

const Product = ({ id, price, name, description, category, currency } : ProductProps) => {
    return (
        <div className="card w-60 h-60 bg-primary text-primary-content opacity-90 hover:opacity-100">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{price} {currency}</p>
                <p>{category}</p>
            </div>
        </div>
    );
};

export default Product;