import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/Dashboard/Sidebar";


const DashboradLayout = () => {
    return (
        <div className="relative min-h-screen md:flex">
            {/* Sidebar Component */}
            <Sidebar />
            <div className="flex-1  md:ml-64">
                <div className="px-5 py-0">
                    {/* Outlet for dynamic contents */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboradLayout;