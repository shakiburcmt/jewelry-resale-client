import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useBuyer from '../hooks/useBuyer';
import useSeller from '../hooks/useSeller';
import Footer from '../Pages/Shared/Footer/Footer';
import Loading from '../Pages/Shared/Loading/Loading';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);
    const [isAdmin] = useAdmin(user?.email);
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer mt-2">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <div className="lg:w-1/2 mx-auto rounded-lg navbar bg-base-300 flex justify-center">
                        <ul className="menu menu-horizontal">
                            {isBuyer &&
                                <li><Link to='/dashboard/myOrders'>My Orders</Link></li>
                            }
                            {isSeller &&
                                <>
                                    <li><Link to='/dashboard/addAProduct'>Add A Product</Link></li>
                                    <li><Link to='/dashboard/myAddedProducts'>My Added Products</Link></li>
                                </>
                            }
                            {isAdmin &&
                                <>
                                    <li><Link to='/dashboard/admin/allSellers'>All Sellers</Link></li>
                                    <li><Link to='/dashboard/admin/allBuyers'>All Buyers</Link></li>
                                </>
                            }
                        </ul>
                    </div>
                    <Outlet></Outlet>
                    <Footer></Footer>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;