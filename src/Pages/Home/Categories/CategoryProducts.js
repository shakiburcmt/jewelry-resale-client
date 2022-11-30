import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookModal from '../../BookModal/BookModal';
import ProductsCard from './ProductsCard';

const CategoryProducts = () => {
    const products = useLoaderData();
    const [product, setProduct] = useState({});
    return (
        <div className='grid lg:grid-cols-2 gap-4'>
            {
                products.map(product => <ProductsCard
                    key={product._id}
                    product={product}
                    setProduct={setProduct}
                ></ProductsCard>)
            }
            {
                product &&
                <BookModal
                        product={product}
                        setProduct={setProduct}
                ></BookModal>
            }
        </div>
    );
};

export default CategoryProducts;