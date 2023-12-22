import { NavLink } from "react-router-dom";


const Menubar = ({ label, address, icon: Icon }) => {
    return (
        <NavLink
            to={address}
            end
            className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-black ${isActive ? "bg-gray-300  text-black" : "text-white"
                }`
            }
        >
            <Icon className="w-5 h-5" />

            <span className="mx-4 font-medium">{label}</span>
        </NavLink>
    );
};
export default Menubar;