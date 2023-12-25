import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";


const MainLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;