import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData();
    return (
        <div>
            <h1 className='text-3xl text-center p-6'>Payment for {booking.product}</h1>
            <div>
                <Elements stripe={stripePromise}>
                    <PaymentForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;