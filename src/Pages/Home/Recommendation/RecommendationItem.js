import React from 'react';
import { Link } from 'react-router-dom';

const RecommendationItem = ({r}) => {
    return (
        <div>
            <figure><img className='rounded-lg' src={r.img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{r.product_name}</h2>
                <p className='text-xl'>Resale Price: {r.resale_price}$</p>
                <div className="card-actions justify-end">
                    <Link className='btn' to={`/category/${r.category_name}`}>View All Products</Link>
                </div>
            </div>
        </div>
    );
};

export default RecommendationItem;