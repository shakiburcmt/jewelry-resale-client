import React from 'react';
import { Link } from 'react-router-dom';
import route404 from '../../assets/images/404.png';

const NoMatchRoute = () => {
    return (
        <div>
            <div className='flex justify-center p-10'>
                <img className='w-1/2 rounded-lg' src={route404} alt="" />
            </div>
            <h1 className='text-center text-2xl'>Sorry, the page not found. Go back <Link className='underline font-bold' to='/'>Home</Link></h1>
        </div>
    );
};

export default NoMatchRoute;