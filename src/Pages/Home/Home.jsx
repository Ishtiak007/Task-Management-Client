import Banner from "../Banner/Banner";
import FAQ from "../FAQ/FAQ";
import WhoUse from "./WhoUse";

import Navbar from "../../Shared/Navbar/Navbar";


const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <WhoUse></WhoUse>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;