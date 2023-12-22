import { useForm } from "react-hook-form";
import useAuth from "../../Shared/Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic";


const AddTodo = () => {
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        const task = {
            title: data?.title,
            description: data?.description,
            deadline: data?.deadline,
            priority: data?.priority,
            email: user?.email,
            status: "to-do",
        };

        await axiosPublic.post("/tasks", task);
        Swal.fire({
            icon: "success",
            title: "Todo has been Added To list",
            showConfirmButton: false,
            timer: 1500,
        });
        reset();
    };
    return (
        <>
            {" "}
            <div className="py-16">
                <h1 className="text-3xl font-medium text-center">Add Your Task From Here</h1>
            </div>
            <div className="pb-11 shadow-2xl">
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
                                    <span className="text-red-300">Select a option</span>
                                )}
                            </label>
                            <select
                                className="select select-bordered w-full  ps-5 h-10 rounded-[3px] focus:outline-none"
                                required
                                defaultValue={"low"}
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
                                    <span className="text-red-300">Select a date</span>
                                )}
                            </label>
                            <input
                                type="date"
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
                            required
                            {...register("description")}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full buttonProject2"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddTodo;