import { useState } from 'react';
import useAuth from '../../Shared/Hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';


import { AiOutlineMenu } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { GrLogout } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import Menubar from './Menubar';

const Sidebar = () => {
    const { user, logOut } = useAuth();
    const [isActive, setActive] = useState(false);
    const navigate = useNavigate();

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive);
    };

    const handleLogOut = () => {
        logOut().then(navigate("/")).catch();
    };

    return (
        <>
            {/* Small Screen Navbar */}
            <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
                <div>
                    <div className="block cursor-pointer p-4 font-bold">
                        <Link to="/dashboard">
                            <h2 className="text-4xl  font-bold">TimeCraft</h2>
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
                >
                    <AiOutlineMenu className="h-5 w-5" />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#d88531]  w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && "-translate-x-full"
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className="w-full flex flex-col px-4 py-2 justify-center items-center mx-auto gap-4">
                            <img
                                // className='hidden md:block'
                                src={user.photoURL}
                                alt="logo"
                                width="100"
                                height="100"
                                className="rounded-[50%] shadow-lg"
                            />
                            <h2 className="text-xl text-center font-bold">
                                {user.displayName}
                            </h2>
                        </div>
                    </div>
                    {/* Nav Items */}
                    <div className="flex flex-col justify-between flex-1 mt-6">

                        <nav>
                            <Menubar
                                label={`Task Management`}
                                address="/dashboard"
                                icon={FaTasks}
                            ></Menubar>

                            <Menubar
                                label={`Add Task`}
                                address="addTask"
                                icon={IoMdAdd}
                            ></Menubar>
                        </nav>
                    </div>
                </div>

                <div>
                    <hr />
                    <button
                        onClick={handleLogOut}
                        className="flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
                    >
                        <GrLogout className="w-5 h-5" />

                        <span className="mx-4 font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;