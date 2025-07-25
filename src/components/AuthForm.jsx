// components/AuthForm.jsx
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';

const AuthForm = ({ isLogin }) => {
    const formRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        gsap.fromTo(
            formRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
    }, [isLogin]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log(isLogin ? 'Logging in:' : 'Signing up:', data);
        reset();

        setTimeout(() => navigate(isLogin ? '/' : '/login'), 1000);
    };

    return (
        <>
            <Nav />
            <div className="min-h-screen flex items-center justify-center  bg-[#f9f5ed] px-4 py-10">
                <div ref={formRef} className="w-full max-w-xl font-santoshi text-[#222] bg-[#f9f5ed]">
                    <h2 className="text-5xl  text-center   font-medium mb-2">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </h2>
                    <p className="text-center text-sm mb-10 text-gray-600">
                        {isLogin
                            ? 'Access your Lenskart account below.'
                            : 'Create your Lenskart account to start exploring.'}
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={`grid ${isLogin ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}
                    >
                        {!isLogin && (
                            <>
                                <div className="col-span-2">
                                    <input
                                        type="text"
                                        placeholder="Full Name*"
                                        autoComplete="name"
                                        {...register('name', { required: 'Name is required' })}
                                        className="w-full px-4 py-3 bg-[#eae6dd] placeholder-gray-700 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                    {errors.name && (
                                        <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="col-span-2">
                            <input
                                type="email"
                                placeholder="Email*"
                                autoComplete="username"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                                className="w-full px-4 py-3 bg-[#eae6dd] placeholder-gray-700 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {errors.email && (
                                <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="col-span-2">
                            <input
                                type="password"
                                placeholder="Password*"
                                autoComplete={isLogin ? 'current-password' : 'new-password'}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Minimum 6 characters'
                                    }
                                })}
                                className="w-full px-4 py-3 bg-[#eae6dd] placeholder-gray-700 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {errors.password && (
                                <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {!isLogin && (
                            <div className="col-span-2 flex items-center gap-2 mt-2 text-sm">
                                <input type="checkbox" id="agree" required />
                                <label htmlFor="agree">
                                    I agree to provide the above information for the purposes of account creation.
                                </label>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="col-span-2 bg-[#e2dbc9] hover:bg-[#dcd2bc] transition-all duration-300 text-[#222] font-semibold py-3 rounded-full mt-2"
                        >
                            {isLogin ? 'Login' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-sm text-gray-700">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <button
                            onClick={() => navigate(isLogin ? '/signup' : '/login')}
                            className="underline hover:text-black font-medium"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

export default AuthForm;
