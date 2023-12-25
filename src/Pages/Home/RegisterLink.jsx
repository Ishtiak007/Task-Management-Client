import { Link } from "react-router-dom";
import img1 from '../../assets/image/register1.jpg'
import img2 from '../../assets/image/register2.jpg'


const RegisterLink = () => {
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className='lg:w-1/2 relative'>
                        <img src={img1} className="w-3/4 rounded-lg shadow-2xl border-8  border-white " />
                        <img src={img2} className='w-1/2 absolute right-5 top-1/2 rounded-lg shadow-2xl' alt="" />
                    </div>
                    <div className='lg:w-1/2 space-y-5 p-4'>
                        <h3 className='text-orange-600 text-2xl font-bold'>Register now and unlock the full Site experience!</h3>
                        <h1 className="text-3xl font-bold">Unlock exclusive features and personalized content by registering now on this site. Your journey begins with us!</h1>

                        <p>Register to Task Management and seamlessly manage, change, and complete tasks with intuitive drag-and-drop functionality. Your productivity awaits!</p>
                        <Link to='/register'><button className="buttonProject3 mt-5">Register Now</button></Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegisterLink;