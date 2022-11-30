import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const { data: bookings, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`https://jewelry-resale-server.vercel.app/bookings?email=${user.email}`);
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="overflow-x-auto mt-2">
            <table className="table w-5/6 mx-auto">
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Pay Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map(booking => <tr key={booking._id} className="hover">
                            <td><div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={booking.img} alt="Avatar Tailwind CSS Component" />
                                </div>
                            </div></td>
                            <td>{booking.product}</td>
                            <td>{booking.price}$</td>
                            {booking.price && !booking.paid && <td><Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-xs'>pay now</button></Link></td>}
                            {booking.price && booking.paid && <td><button className='btn btn-xs'>Paid</button></td>}
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;