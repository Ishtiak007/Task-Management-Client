import Banner from "../Banner/Banner";
import FAQ from "../FAQ/FAQ";
import WhoUse from "./WhoUse";

import Navbar from "../../Shared/Navbar/Navbar";
import { useEffect } from "react";
import Aos from "aos";

import "aos/dist/aos.css";
import RegisterLink from "./RegisterLink";


const Home = () => {

    useEffect(() => {
        Aos.init();
    }, []);
    return (
        <div>
            <Navbar></Navbar>
            <div data-aos="fade-up" data-aos-duration="1000">
                <Banner></Banner>
            </div>


            <div data-aos="fade-up" data-aos-duration="1000">
                <WhoUse></WhoUse>
            </div>


            <div data-aos="fade-up" data-aos-duration="1000">
                <FAQ></FAQ>
            </div>

            <div data-aos="fade-up" data-aos-duration="1000">
                <RegisterLink></RegisterLink>
            </div>
        </div>
    );
};

export default Home;