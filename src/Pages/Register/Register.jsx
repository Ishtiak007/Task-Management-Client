import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Shared/Hooks/useAuth";
import { FaSpinner } from "react-icons/fa6";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";


const Register = () => {
    const [spin, setspin] = useState(false);
    const { createUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || "/dashboard";

    const onSubmit = async (data) => {
        const pass = data?.password;
        if (pass.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Please Enter Atleast 6 Character",
            });
            return;
        } else if (!/(?=.*[A-Z])/.test(pass)) {
            Swal.fire({
                icon: "error",
                title: "Please Enter Atleast One Capital Letter",
            });
            return;
        } else if (!/(?=.*[0-9])/.test(pass)) {
            Swal.fire({
                icon: "error",
                title: "Please Enter Atleast One Numeric Number",
            });
            return;
        } else if (!/^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/.test(pass)) {
            Swal.fire({
                icon: "error",
                title: "Please Enter Atleast One Special Character",
            });
            return;
        }
        setspin(true);
        createUser(data?.email, pass)
            .then(() => {
                console.log();
                updateUserProfile(data?.name, data?.photo)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "User created successfully",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        reset();
                        navigate(from, { replace: true });
                        setspin(false);
                    });
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops",
                    text: err.message,
                });
                setspin(false);
            });
    };
    return (
        <>
            <div>
                <div className=" py-10">
                    <div className="mx-auto max-w-xl p-6 rounded-md sm:p-10 shadow-2xl text-black  mt-5">
                        <div className="mb-8 text-center">
                            <h1 className="my-3 text-4xl font-bold">Register Here</h1>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6 ng-untouched ng-pristine ng-valid"
                        >
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register("name")}
                                        required
                                        placeholder="Enter Your Name Here"
                                        className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-900"
                                        data-temp-mail-org="0"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm">
                                        Profile PhotoUrl
                                    </label>
                                    <input
                                        type="url"
                                        {...register("photo")}
                                        placeholder="Enter Your Image URL"
                                        required
                                        className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-900"
                                        data-temp-mail-org="0"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email")}
                                        placeholder="Enter Your Email Here"
                                        required
                                        className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-900"
                                        data-temp-mail-org="0"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between">
                                        <label htmlFor="password" className="text-sm mb-2">
                                            Password
                                        </label>
                                    </div>
                                    <input
                                        type="password"
                                        {...register("password")}
                                        required
                                        placeholder="Enter A Strong Password"
                                        className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-900"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full buttonProject2 uppercase"
                                >
                                    {spin ? (
                                        <FaSpinner className=" animate-spin m-auto" />
                                    ) : (
                                        "Register"
                                    )}
                                </button>
                            </div>
                        </form>
                        <div className="flex flex-col w-full border-opacity-50 pt-3">
                            <div className="divider">OR</div>
                            <SocialLogin></SocialLogin>
                            <p className="px-6 text-sm text-center text-black">
                                Already have an account?{" "}
                                <Link
                                    to="/signin"
                                    className="hover:underline text-blue-500 font-bold"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;