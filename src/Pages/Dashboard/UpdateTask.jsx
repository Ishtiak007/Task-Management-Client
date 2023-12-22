
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Shared/Hooks/useAxiosPublic';

const UpdateTask = () => {
    const oldData = useLoaderData();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        const task = {
            title: data?.title,
            description: data?.description,
            deadline: data?.deadline,
            priority: data?.priority,
        };

        await axiosPublic.patch(`/tasks/${oldData?._id}`, task);
        Swal.fire({
            icon: "success",
            title: "Task has been Updated",
            showConfirmButton: false,
            timer: 1500,
        });
        navigate(-1);
    };

    return (
        <>
            {" "}
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-3 w-full lg:w-2/3 mx-auto"
                >
                    <div>
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Title"
                            defaultValue={oldData?.title}
                            className="input input-bordered w-full ps-5 h-10 rounded-[3px] focus:outline-none"
                            required
                            {...register("title")}
                        />
                    </div>

                    <div className="flex items-center flex-col md:flex-row justify-between w-full">
                        <div className="w-full md:w-[49%]">
                            <label className="label">
                                <span className="label-text">Priority</span>
                                {errors.priority && (
                                    <span className="text-red-600">Select a option</span>
                                )}
                            </label>
                            <select
                                className="select select-bordered w-full  ps-5 h-10 rounded-[3px] focus:outline-none"
                                required
                                defaultValue={oldData?.priority}
                                {...register("priority", { required: true })}
                            >
                                <option value={"low"}>Low</option>
                                <option value={"medium"}>Medium</option>
                                <option value={"high"}>High</option>
                            </select>
                        </div>
                        <div className="w-full md:w-[49%]">
                            <label className="label">
                                <span className="label-text">Deadline</span>
                                {errors.deadline && (
                                    <span className="text-red-600">Select a date</span>
                                )}
                            </label>
                            <input
                                type="date"
                                defaultValue={oldData?.deadline}
                                className="input input-bordered w-full ps-5 h-10 rounded-[3px] focus:outline-none"
                                {...register("deadline", { required: true })}
                                min={new Date().toISOString().split("T")[0]}
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-24 rounded-[3px] focus:outline-none"
                            placeholder="Description"
                            defaultValue={oldData?.description}
                            required
                            {...register("description")}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full buttonProject2"
                    >
                        Update Task
                    </button>
                </form>
            </div>
        </>
    );
};

export default UpdateTask;