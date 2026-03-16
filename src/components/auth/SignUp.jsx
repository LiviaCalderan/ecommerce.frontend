import React, { useState } from 'react'
import Background from '../../assets/bg-auth.png'
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { FiGlobe } from 'react-icons/fi';
import InputField from '../shared/InputField';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerNewUser } from '../../store/actions';
import Spinners from '../shared/Spinners';

const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm({ mode: "onTouched" });
    const password = watch("password");

    const registerHandler = async (data) => {
        console.log("register click")
        dispatch(registerNewUser(data, toast, reset, navigate, setLoader))
    }

    return (
        <div className='bg-gray-100 min-h-[calc(100vh-64px)] flex items-center justify-center px-6'>
            <div className="w-full max-w-5xl flex flex-col md:flex-row font-raleway bg-white rounded-2xl shadow-md overflow-hidden">

                {/* FORM */}
                <div className="w-full flex flex-col items-center justify-center px-6 py-10">

                    <form onSubmit={handleSubmit(registerHandler)} className="w-full max-w-sm flex flex-col">


                        <h2 className="text-3xl font-bold uppercase tracking-widest text-zinc-900 font-anton-sc">
                            Register Here
                        </h2>
                        <p className="text-sm text-zinc-400 font-medium mt-1.5">
                            Create your account to get started.
                        </p>

                        {/* TODO: GOOGLE */}
                        {/* <button
                            type="button"
                            className="w-full mt-8 border border-zinc-200 bg-zinc-50 flex items-center justify-center gap-2.5 h-11 rounded-xl text-sm font-medium text-zinc-600 cursor-pointer hover:bg-black hover:text-white hover:font-semibold hover:shadow-sm"
                        >
                            <FcGoogle size={20} />
                            Continue with Google
                        </button> */}

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-6">
                            <div className="flex-1 h-px bg-zinc-100" />
                            {/* <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                                or
                            </span> */}
                            <div className="flex-1 h-px bg-zinc-100" />
                        </div>

                        {/* FIELDS */}
                        <div className="flex flex-col gap-4">

                            {/* USERNAME */}
                            <InputField
                                label="Username"
                                required
                                id="username"
                                type="text"
                                register={register}
                                message={"*Username is required"}
                                placeholder="janedoe"
                                errors={errors}
                                icon={<CiUser className='text-zinc-500' />} />

                            {/* EMAIL */}
                            <InputField
                                label="Email"
                                required
                                id="email"
                                type="email"
                                register={register}
                                message={"*Email is required"}
                                placeholder="jane@example.com"
                                errors={errors}
                                icon={<svg width="14" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#a1a1aa" />
                                </svg>} />


                            {/* PHONE */}
                            <InputField
                                label="Phone Number"
                                required
                                id="phone"
                                type="text"
                                register={register}
                                message={"*Phone number is required"}
                                placeholder="(11) 91234-5678"
                                errors={errors}
                                icon={<svg width="14" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#a1a1aa" />
                                </svg>} />

                            {/* PASSWORD */}
                            <InputField
                                label="Password"
                                required
                                id="password"
                                min={6}
                                type="password"
                                register={register}
                                message={"*Password is required"}
                                placeholder="********"
                                errors={errors}
                                icon={<svg width="12" height="16" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#a1a1aa" />
                                </svg>} />


                            {/* PASSWORD CONFIRMATION */}
                            <InputField
                                label="Password Confirmation"
                                required
                                id="password-confirmation"
                                type="password"
                                register={register}
                                message={"*Password is required"}
                                placeholder="********"
                                validation={{
                                    validate: (value) =>
                                        value === password || "Passwords do not match!"
                                }}
                                errors={errors}
                                icon={<svg width="12" height="16" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#a1a1aa" />
                                </svg>} />

                        </div>

                        {/* CHECKBOX */}
                        <div className="flex flex-col items-start justify-between mt-4 gap-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="marketing"
                                    className="w-4 h-4 accent-zinc-900 rounded"
                                />
                                <span className="text-xs text-zinc-400 font-medium">
                                    Receive promotions via email.
                                </span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="marketing"
                                    className="w-4 h-4 accent-zinc-900 rounded"
                                />
                                <span className="text-xs text-zinc-400 font-medium">
                                    I agree to the <span className='text-black underline cursor-pointer'>Terms and Conditions and Privacy Policy</span>.
                                </span>
                            </label>
                        </div>

                        {/* SUBMIT */}
                        <button
                            disabled={loader}
                            type="submit"
                            className="w-full mt-6 py-3.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl cursor-pointer hover:bg-gray-800 hover:shadow-sm"
                        >
                            {loader ? (
                                <Spinners />
                            ) : (
                                <>Register</>
                            )}
                        </button>

                        {/* LOGIN */}
                        <p className="text-sm text-zinc-500 text-center mt-5">
                            Already have an account?{" "}
                            <Link to="/login" className="text-zinc-900 font-semibold underline underline-offset-2">
                                Sign in
                            </Link>
                        </p>

                    </form>
                </div>

                {/* IMAGE */}
                <div className="hidden md:block w-full relative overflow-hidden">
                    <img
                        src={Background}
                        alt="background"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-zinc-900/60 flex flex-col justify-end p-12">
                        <p className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-white font-bold mb-2">
                            Orbis
                            <FiGlobe />
                        </p>
                        <h2 className="text-4xl font-bold uppercase tracking-widest text-white font-anton-sc leading-tight">
                            Your journey into a world of refined shopping begins here.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp
