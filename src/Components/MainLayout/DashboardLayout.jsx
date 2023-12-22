import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../Shared/Hooks/useAuth";


const DashboardLayout = () => {
    const { user } = useAuth()
    return (
        <div>
            <div className="lg:flex md:flex my-4">
                <div className="lg:w-64 md:w-64 min-h-screen bg-red-400 rounded-md">
                    <div className="menu space-y-3">



                        <>
                            <h1 className="text-center my-5 font-bold text-2xl">Dashboard</h1>
                            <div>
                                <div className="w-full flex flex-col px-4 py-2 justify-center items-center mx-auto gap-4">
                                    <img
                                        // className='hidden md:block'
                                        src={user?.photoURL}
                                        className="rounded-[50%] shadow-lg h-36 w-36"
                                    />
                                    <h2 className="text-xl text-center font-bold">
                                        {user?.displayName}
                                    </h2>
                                </div>
                            </div>
                            <li className="bg-slate-500 rounded-md font-bold text-white">
                                <NavLink to='/'>Home</NavLink>
                            </li>
                            <li className="bg-slate-500 rounded-md font-bold text-white">
                                <NavLink to='/dashboard/addTodo'>Add Todo</NavLink>
                            </li>
                            <li className="bg-slate-500 rounded-md font-bold text-white">
                                <NavLink to='/dashboard/manage'>Manage Todo</NavLink>
                            </li>
                        </>

                    </div>
                </div>
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;