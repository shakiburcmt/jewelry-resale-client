import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { logIn, providerLogIn, setUser } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();
    const [logInError, setLogInError] = useState('');

    const handleLogIn = (data) => {
        console.log(data);
        setLogInError('');
        logIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.error(err)
                setLogInError(err)
            })
    }

    const handleProverLogIn = () => {
        providerLogIn(googleProvider)
            .then(result => {
                const user = result.user;
                setUser(user)
                saveUser(user.displayName, user.email, "Buyer")
                navigate(from, { replace: true });
                console.log(user);
            })
            .catch(error => console.error(error))
    }

    const saveUser = (name, email, account_type) => {
        const user = { name, email , account_type};
        fetch('https://jewelry-resale-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    return (
        <div className='flex justify-center items-center'>
            <div>
                <form onSubmit={handleSubmit(handleLogIn)}>

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
                            minLength: { value: 6, message: "Input at least 6 characters" }
                        })}
                            className="input input-bordered" />
                        {errors.password && <p className='mt-2 text-error'>{errors.password?.message}</p>}
                        <label className="label"><span className="label-text">Forget Password?</span>
                        </label>
                    </div>
                    <input className='btn' type="submit" value="login" />
                    <div>
                        {logInError && <p className='text-error text-center'>Wrong Password</p>}
                    </div>
                </form>

                <p className='text-sm p-6 text-center'>New to c2cJewel? <Link to="/signup" className='text-[#655D48]'>Create new account</Link></p>
                <button onClick={handleProverLogIn} className='btn w-full btn-outline'>continue with Google</button>

            </div >
        </div >
    );
};

export default Login;