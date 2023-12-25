/* eslint-disable no-unused-vars */
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaCalendar, FaCheckSquare, FaEdit, FaTrash } from "react-icons/fa";
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdOutlineUpdate } from "react-icons/md";
import SideNav from './SideNav';
import useAuth from '../../Shared/Hooks/useAuth';
import useAxiosPublic from '../../Shared/Hooks/useAxiosPublic';

const DashboardPage = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();



    useEffect(() => {
        // Manually trigger the queries when user data is available
        if (user?.email) {
            queryClient.refetchQueries(['tasks']);
            queryClient.refetchQueries(['ongoingTasks']);
            queryClient.refetchQueries(['completedTasks']);
        }
    }, [user?.email, queryClient]);

    const { data: tasks, refetch: refetchTasks, isLoading: tasksLoading } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                return [];
            }

            const res = await axiosPublic.get(`/tasks/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const { data: ongoingTasks, refetch: refetchOngoing, isLoading: ongoingLoading } = useQuery({
        queryKey: ['ongoingTasks', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                return [];
            }

            const res = await axiosPublic.get(`/ongoingTasks/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const { data: completedTasks, refetch: refetchCompleted, isLoading: completedLoading } = useQuery({
        queryKey: ['completedTasks', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                return [];
            }

            const res = await axiosPublic.get(`/completedTasks/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(source.index, 1);
        updatedTasks.splice(destination.index, 0, movedTask);

        axiosPublic.put(`/updateTaskStatus/${draggableId}`, {
            newStatus: destination.droppableId,
        }).then(() => {
            refetchTasks();
            refetchOngoing()
            refetchCompleted()
        });
    };

    const handleDelete = (id) => {
        axiosPublic.delete(`/deleteTask/${id}`).then((res) => {
            if (res.data.deletedCount > 0) {
                toast('Task Deleted Successfully');
                refetchTasks();
                refetchOngoing()
                refetchCompleted()
            }
        });
    };


    const isDeadlineNear = (deadline) => {
        const deadlineDate = new Date(deadline);
        const currentDate = new Date();

        const daysDifference = Math.floor((deadlineDate - currentDate) / (1000 * 60 * 60 * 24));

        if (daysDifference <= 1) {
            return 'red';
        } else if (daysDifference >= 2 && daysDifference <= 6) {
            return 'yellow';
        } else {
            return '';
        }
    };



    const handleUpgrade = (event, id) => {

        event.preventDefault();

        const formData = new FormData(event.target);
        const formDataObject = {};

        // Format the date field if it exists in the form data
        if (formData.has('deadline')) {
            const deadlineDate = new Date(formData.get('deadline'));
            const day = deadlineDate.getDate();
            const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(deadlineDate);
            const year = deadlineDate.getFullYear();
            const formattedDeadline = `${day} ${month} ${year}`;

            formData.set('deadline', formattedDeadline);
        }

        // Convert FormData to an object
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        console.log('Form Data:', formDataObject);



        axiosPublic.put(`/updateTask/${id}`, formDataObject)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    toast('Task Updated Successfully');
                    refetchTasks();
                    refetchOngoing()
                    refetchCompleted()
                    event.target.reset();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })



    };


    return (
        <div>
            <SideNav title={`Welcome ${user?.displayName}`} btn='Add Your Task' profile={user?.photoURL} refetch={refetchTasks} />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 px-1">
                    <Droppable droppableId="todo">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="flex-1 bg-gray-300 min-h-screen"
                            >
                                <h1 className="text-center bg-red-400 p-3 font-bold text-base-300 ">{
                                    tasks?.length > 0 ? `Task Lists (${tasks?.length})` : 'To-Do'
                                }</h1>
                                <div>
                                    {tasks?.map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="card card-compact m-2 bg-base-300 bg-opacity-75 shadow-2xl"
                                                >
                                                    <div className="card-body space-y-1">
                                                        <div className="flex justify-between items-center">
                                                            <h2 className="font-bold">{task.title}</h2>
                                                            <div className='space-x-1'>
                                                                {/* The button to open modal */}
                                                                <label htmlFor={`my_modal_${task._id}`} className="btn text-green-400">
                                                                    <FaEdit />
                                                                </label>


                                                                {/* Put this part before </body> tag */}
                                                                <input type="checkbox" id={`my_modal_${task._id}`} className="modal-toggle" />

                                                                <div className="modal" role="dialog">
                                                                    <div className="modal-box">
                                                                        <form onSubmit={(event) => handleUpgrade(event, task._id)} className="space-y-4 font-normal">
                                                                            <div className="form-control w-full">
                                                                                <input
                                                                                    type="text"
                                                                                    name="title"
                                                                                    placeholder="Task Title"
                                                                                    className="input input-bordered"
                                                                                    required
                                                                                />
                                                                            </div>
                                                                            <div className="form-control w-full">
                                                                                <input
                                                                                    type="text"
                                                                                    name="description"
                                                                                    placeholder="Task Description"
                                                                                    className="input input-bordered"
                                                                                    required
                                                                                />
                                                                            </div>
                                                                            <div className="flex space-x-1">
                                                                                <div className="form-control w-full">
                                                                                    <input
                                                                                        type="date"
                                                                                        name="deadline"
                                                                                        placeholder="Select Deadline"
                                                                                        className="input input-bordered"
                                                                                        min={new Date().toISOString().split('T')[0]}
                                                                                        required
                                                                                    />
                                                                                </div>
                                                                                <div className="form-control w-full">
                                                                                    <select
                                                                                        name="priority"
                                                                                        className="input input-bordered"
                                                                                        required
                                                                                    >
                                                                                        <option value="" disabled>Select Priority</option>
                                                                                        <option value="Low">Low</option>
                                                                                        <option value="Moderate">Moderate</option>
                                                                                        <option value="High">High</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <input type="submit" value="Submit" className="btn w-full" />
                                                                        </form>

                                                                    </div>
                                                                    <label className="modal-backdrop" htmlFor={`my_modal_${task._id}`}></label>
                                                                </div>

                                                                <button
                                                                    onClick={() => handleDelete(task._id)}
                                                                    className="btn  text-red-600"
                                                                >
                                                                    <FaTrash />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs">{task.description}</p>
                                                        <div className="md:flex justify-between">
                                                            <div className="flex items-center text-xs space-x-2">
                                                                <p className="font-semibold">Priority :</p>
                                                                {task?.priority === 'High' ? (
                                                                    <FcHighPriority />
                                                                ) : task?.priority === 'Moderate' ? (
                                                                    <FcMediumPriority />
                                                                ) : (
                                                                    <FcLowPriority />
                                                                )}
                                                                <span> {task.priority}</span>
                                                            </div>
                                                            <div className="flex items-center text-xs space-x-1">
                                                                <p className="font-semibold">Deadline:</p>
                                                                <span style={{ color: isDeadlineNear(task.deadline) }}>
                                                                    <FaCalendar />
                                                                </span>
                                                                <span>{task.deadline}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Droppable droppableId="ongoing">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="flex-1 bg-gray-300 min-h-screen"
                            >
                                <h1 className="text-center bg-orange-400 p-3 font-bold text-base-300">{
                                    ongoingTasks?.length > 0 ? `Ongoing Tasks (${ongoingTasks?.length})` : 'On Going'
                                }</h1>
                                <div>
                                    {ongoingTasks?.map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="card card-compact m-2 bg-orange-900 bg-opacity-75 shadow-2xl"
                                                >
                                                    <div className="card-body space-y-1">
                                                        <div className="flex justify-between items-center">
                                                            <h2 className="font-bold">{task.title}</h2>
                                                            <button
                                                                onClick={() => handleDelete(task._id)}
                                                                className="btn text-red-500"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </div>
                                                        <p className="text-xs">{task.description}</p>
                                                        <div className="md:flex justify-between">
                                                            <div className="flex items-center text-xs space-x-2">
                                                                <p className="font-semibold">Priority :</p>
                                                                {task?.priority === 'High' ? (
                                                                    <FcHighPriority />
                                                                ) : task?.priority === 'Moderate' ? (
                                                                    <FcMediumPriority />
                                                                ) : (
                                                                    <FcLowPriority />
                                                                )}
                                                                <span> {task.priority}</span>
                                                            </div>
                                                            <div className="flex items-center text-xs space-x-1">
                                                                <p className="font-semibold">Deadline:</p>
                                                                <span style={{ color: isDeadlineNear(task.deadline) }}>
                                                                    <FaCalendar />
                                                                </span>
                                                                <span>{task.deadline}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Droppable droppableId="completed">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="flex-1 bg-gray-300 min-h-screen"
                            >
                                <h1 className="text-center bg-green-600 p-3 font-bold text-base-300">{
                                    completedTasks?.length > 0 ? `Completed Tasks (${completedTasks?.length})` : 'Completed'
                                }</h1>
                                <div>
                                    {completedTasks?.map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="card card-compact m-2 bg-green-900 bg-opacity-75 shadow-2xl"
                                                >
                                                    <div className="card-body space-y-1">
                                                        <div className="flex justify-between items-center">
                                                            <h2 className="font-bold">{task.title}</h2>
                                                            <button
                                                                onClick={() => handleDelete(task._id)}
                                                                className="btn text-green-500"
                                                            >
                                                                <FaCheckSquare />
                                                            </button>
                                                        </div>
                                                        <p className="text-xs">{task.description}</p>
                                                        <div className="md:flex justify-between">
                                                            <div className="flex items-center text-xs space-x-2">
                                                                <p className="font-semibold">Priority :</p>
                                                                {task?.priority === 'High' ? (
                                                                    <FcHighPriority />
                                                                ) : task?.priority === 'Moderate' ? (
                                                                    <FcMediumPriority />
                                                                ) : (
                                                                    <FcLowPriority />
                                                                )}
                                                                <span> {task.priority}</span>
                                                            </div>
                                                            <div className="flex items-center text-xs space-x-1">
                                                                <p className="font-semibold">Deadline:</p>
                                                                <span className='text-green-500'>
                                                                    <FaCalendar />
                                                                </span>
                                                                <span>{task.deadline}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
            <ToastContainer />
        </div>
    );
};

export default DashboardPage;