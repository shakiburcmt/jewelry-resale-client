import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const AddAProduct = (data) => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();

    // query for find out specific category
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://jewelry-resale-server.vercel.app/categories');
            const data = await res.json();
            return data;
        }
    })

    const handleAddAProduct = (data) => {
        // this part is for image hosting
        const img = data.img[0];
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const product = {
                        category_name: data.category_name,
                        img: imgData.data.url,
                        product_name: data.product_name,
                        location: data.location,
                        resale_price: data.resale_price,
                        original_price: data.original_price,
                        usage_duration: data.usage_duration,
                        email: user.email,
                        name: user.displayName
                    }
                    // save product info to DB
                    fetch('https://jewelry-resale-server.vercel.app/categories', {
                        method: 'POST',
                        headers: {
                            "content-type": 'application/json'
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.product_name} is added successfully`);
                            navigate('/dashboard/myProducts')
                        })
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-96 mx-auto'>
            <h1 className='text-3xl text-center font-semibold text-[#655D48] my-2'>Add A Product</h1>
            <form onSubmit={handleSubmit(handleAddAProduct)}>

                <div className="form-control mb-2">
                    <select
                        {...register('category_name')}
                        className="select select-bordered">
                        {
                            categories.map(category => <option key={category._id}
                                value={category.category_name}
                            >{category.category_name}</option>)
                        }
                    </select>
                </div>

                <div className="form-control mb-2">
                    <input placeholder='Product image' type="file" {...register("img", {
                        required: "Required"
                    })}
                        className="input input-bordered" />
                </div>

                <div className="form-control mb-2">
                    <input placeholder='Product name' type="text" {...register("product_name", {
                        required: "Required"
                    })}
                        className="input input-bordered" />
                </div>

                <div className="form-control mb-2">
                    <select
                        {...register('condition_type')}
                        className="select select-bordered">
                        <option>Product Quality: Excellent</option>
                        <option>Product Quality: Good</option>
                        <option>Product Quality: Fair</option>
                    </select>
                </div>

                <div className="form-control mb-2">
                    <textarea
                        {...register('product_description')}
                        className="textarea textarea-bordered" placeholder="Product description">

                    </textarea>
                </div>

                <div className="form-control mb-2">
                    <input placeholder='Location' type="text" {...register("location", {
                        required: "Required"
                    })}
                        className="input input-bordered" />
                </div>

                <div className="form-control mb-2">
                    <input placeholder='Mobile number' type="number" {...register("number", {
                        required: "Required"
                    })}
                        className="input input-bordered" />
                </div>

                <div className="form-control mb-2">
                    <input placeholder='Resale price' type="text" {...register("resale_price", {
                        required: "Required"
                    })}
                        className="input input-bordered" />
                </div>

                <div className="form-control mb-2">
                    <input placeholder='Original price' type="text" {...register("original_price", {
                        required: "Required"
                    })}
                        className="input input-bordered" />
                </div>

                <div className="form-control mb-2">
                    <input placeholder='Usage duration' type="text" {...register("usage_duration", {
                        required: "Required"
                    })}
                        className="input input-bordered" />
                </div>
                <input className='btn w-full' type="submit" value="add product" />
            </form>
        </div>
    );
};

export default AddAProduct;