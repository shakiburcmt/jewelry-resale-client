import React, { useContext } from 'react';
import { ImLocation2, ImClock } from 'react-icons/im';
import { AuthContext } from '../../../contexts/AuthProvider';
import useSeller from '../../../hooks/useSeller';

const ProductsCard = ({ product, setProduct }) => {
    const { user } = useContext(AuthContext);
    const [isSeller] = useSeller(user?.email);
    const { product_name, img, location, resale_price, original_price, usage_duration } = product;
    const date = new Date().toLocaleDateString();

    return (
        <div className="card bg-base-200 shadow-2xl mt-2">
            <figure><img className='rounded mt-2 w-[400px] h-[250px]' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {product_name} | Used for: {usage_duration}
                </h2>
                <p className='badge badge-outline font-semibold'>Resale Price: ${resale_price} | Original Price: ${original_price}</p>
                <div className="card-actions">
                    <div className="flex items-center"><ImClock className='mr-1' />Posted on: {date}</div>
                    <div className="flex items-center"><ImLocation2 />{location}</div>
                    <p className='text-clip'>Seller: {isSeller.displayName}</p>
                </div>
                <label onClick={() => setProduct(product)} htmlFor="my-modal-3" className="btn">Book Now</label>
            </div>
        </div>
    );
};

export default ProductsCard;