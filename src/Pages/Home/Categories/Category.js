import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    const { category_name } = category;
    return (
        <div>
            <Link className='btn' to={`/category/${category_name}`}>{category_name}</Link>
        </div>
    );
};

export default Category;