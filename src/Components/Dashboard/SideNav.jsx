import { useForm } from "react-hook-form";
import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../Shared/Hooks/useAuth";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic";

const SideNav = ({ title, btn, profile, refetch }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const owner = user?.email
    // console.log(owner)

    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm();


    const onSubmit = async (data) => {
        data.deadline = selectedDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });

        const currentDate = new Date();
        data.createdAt = currentDate.toISOString();

        const task = { title: data.title, description: data.description, deadline: data.deadline, priority: data.priority, owner: owner, createdAt: data.createdAt, status: 'todo' };
        // console.log("Form Data:", task);

        axiosPublic.post('/addTask', task)
            .then(res => {
                if (res.data.insertedId) {
                    toast('Task Added Successfully')
                    reset()
                    setSelectedDate('')
                    refetch()
                    // document.getElementById('my_modal_2').close()
                }
            })
            .catch(err => {
                toast.error(err.message)
            })
    }

    return (
        <div>
            <div className="navbar bg-base-300">
                <div className="navbar-start">

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={profile} />
                            </div>
                        </div>

                    </div>
                    <a className="hidden md:block font-semibold px-2 text-xl">{title}</a>
                </div>

                <div className="navbar-end space-x-1">
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>{btn}</button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            {/* things go here */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="form-control w-full">
                                    <input
                                        type="text"
                                        {...register("title", { required: "Title is required" })}
                                        placeholder="Task Title"
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <input
                                        type="text"
                                        {...register("description", { required: 'Description is required' })}
                                        placeholder="Task Description"
                                        className="input input-bordered"
                                    />

                                </div>
                                <div className="flex space-x-1">
                                    <div className="form-control w-full">
                                        <DatePicker
                                            {...register("deadline", {
                                                required: 'Deadline is required',
                                                validate: {
                                                    isNotPast: value => new Date(value) > new Date(),
                                                },
                                            })}
                                            selected={selectedDate}
                                            onChange={(date) => {
                                                setSelectedDate(date);
                                                setValue("deadline", date, { shouldValidate: true });
                                            }}
                                            placeholderText="Select Deadline"
                                            dateFormat="dd MMM yyyy"
                                            minDate={new Date()}
                                            className="input input-bordered"
                                        />
                                        {errors.deadline && <span className="text-error">{errors.deadline.message}</span>}
                                    </div>
                                    <div className="form-control w-full">
                                        <select
                                            {...register("priority", { required: 'Priority is required' })}
                                            className="input input-bordered"
                                            name="priority"
                                        >
                                            <option value="" disabled>Select Priority</option>
                                            <option value="Low">Low</option>
                                            <option value="Moderate">Moderate</option>
                                            <option value="High">High</option>
                                        </select>
                                        {errors.priority && <span className="text-error">{errors.priority.message}</span>}
                                    </div>
                                </div>
                                <input type="submit" value="Submit" className="btn w-full" />

                            </form>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>


                    <NavLink to='/' className="btn"><FaHome /></NavLink>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SideNav;