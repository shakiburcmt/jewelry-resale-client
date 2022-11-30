import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const BookModal = ({ product, setProduct }) => {
    const { product_name, resale_price, img } = product;
    const { user } = useContext(AuthContext);

    const handleBookNowModal = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const product = form.product.value;
        const price = form.price.value;
        const number = form.number.value;
        const location = form.location.value;
        // collection create for sending data in DB
        const book = {
            name,
            email,
            product,
            img,
            price,
            number,
            location
        }
        fetch('https://jewelry-resale-server.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(book)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setProduct(null);
                    toast.success(`${product_name} is booked`);
                }
                else {
                    toast.error(data.message);
                }
            })
    }

    return (
        <>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleBookNowModal} className='grid lg:grid-cols-2 gap-4 mt-10'>
                        <input name="name" type="text" defaultValue={user?.displayName} disabled className="input input-bordered" />
                        <input name="email" type="email" defaultValue={user?.email} disabled className="input input-bordered" />
                        <input name="product" type="text" defaultValue={product_name} disabled className="input input-bordered" />
                        <input name="price" type="text" defaultValue={resale_price} disabled className="input input-bordered" />
                        <input name="number" type="number" placeholder='Your phone number' className="input input-bordered" />
                        <input name="location" type="text" placeholder='Location of delivery' className="input input-bordered" />
                        <input className='btn' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookModal;