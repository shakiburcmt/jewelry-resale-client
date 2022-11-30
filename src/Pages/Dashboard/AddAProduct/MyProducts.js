import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import ConfirmWithModal from '../../Shared/ConfirmWithModal/ConfirmWithModal';
import Loading from '../../Shared/Loading/Loading';

const MyProducts = () => {
    const [deletingProduct, setDeletingProduct] = useState(null);
    const closeModal = () => {
        setDeletingProduct(null);
    }
    const { user } = useContext(AuthContext);
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`https://jewelry-resale-server.vercel.app/products?email=${user.email}`);
            const data = await res.json();
            return data;
        }
    })

    const handleDelete = (product) => {
        fetch(`https://jewelry-resale-server.vercel.app/products/${product._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Product deleted successfully`)
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="overflow-x-auto mt-2">
            <table className="table w-5/6 mx-auto">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Resale Price</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Promote your product</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => <tr key={product._id}>
                            <td>{product.product_name}</td>
                            <td>{product.resale_price}$</td>
                            <td>Unsold</td>
                            <td><label onClick={() => setDeletingProduct(product)} label htmlFor="confirmation" className="btn btn-xs" >Delete</label></td>
                            <td><button className='btn btn-xs'>Advertise</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
            {
                deletingProduct && <ConfirmWithModal
                    title={`Sure to delete?`}
                    message={`After deleting you can not recover anymore.`}
                    successAction={handleDelete}
                    successActionButton="delete"
                    modalData={deletingProduct}
                    closeModal={closeModal}
                ></ConfirmWithModal>
            }
        </div>
    );
};

export default MyProducts;