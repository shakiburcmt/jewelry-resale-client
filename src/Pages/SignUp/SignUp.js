import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser, providerLogIn, setUser } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();
    const [signUpError, setSignUpError] = useState('');
    // const [createdUserEmail, setCreatedUSerEmail] = useState('');

    const handleSignIn = (data) => {
        setSignUpError('')
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.account_type);
                        navigate(from, { replace: true });
                    })
                    .catch(err => console.error(err))
            })
            .catch(err => {
                console.error(err)
                setSignUpError(err)
            })
    }

    const saveUser = (name, email, account_type) => {
        const user = { name, email, account_type };
        fetch('https://jewelry-resale-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                // setCreatedUSerEmail(email);
                console.log(data);
            })
    }

    const handleProverLogIn = () => {
        providerLogIn(googleProvider)
            .then(result => {
                const user = result.user;
                setUser(user)
                saveUser(user.displayName, user.email, "Buyer");
                navigate(from, { replace: true });
                console.log(user);
            })
            .catch(error => console.error(error))
    }

    return (
        <div className='flex justify-center items-center'>
            <div>
                <form onSubmit={handleSubmit(handleSignIn)}>

                    <div className="form-control">
                        <label className="label"><span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", {
                            required: "Name is required"
                        })}
                            className="input input-bordered" />
                        {errors.name && <p className='mt-2 text-error'>{errors.name?.message}</p>}
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", {
                            required: "Email Address is required"
                        })}
                            className="input input-bordered" />
                        {errors.email && <p className='mt-2 text-error'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Input at least 6 characters" },
                            pattern: { value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/, message: "Provide a strong password" }
                        })}
                            className="input input-bordered" />
                        {errors.password && <p className='mt-2 text-error'>{errors.password?.message}</p>}
                    </div>

                    <div className="form-control mb-2">
                        <label className="label"><span className="label-text">Sign up as a</span>
                        </label>
                        <select
                            {...register('account_type')}
                            className="select select-bordered">
                            <option>Buyer</option>
                            <option>Seller</option>
                        </select>
                    </div>
                    <input className='btn' type="submit" value="sign up" />
                    {signUpError && <p className='text-error text-center'>Email already in use</p>}
                </form>

                <p className='text-sm p-6 text-center'>Already have an account? <Link to="/login" className='text-[#655D48]'>Please Login</Link></p>
                <button onClick={handleProverLogIn} className='btn w-full btn-outline'>continue with google</button>

            </div >
        </div >
    );
};

export default SignUp;