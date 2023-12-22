import { Link, useNavigate } from 'react-router-dom';
import banner from '../../assets/image/bannerImage.jpg'

const Banner = () => {
    const navigate = useNavigate();
    return (
        <div style={{ '--image-url': `url(${banner})` }}
            className='hero bg-[image:var(--image-url)] relative overflow-hidden rounded-b-md bg-no-repeat text-center h-[200px] lg:h-screen bg-cover'>
            <div className="absolute bottom-0 left-0 right-0 top-0  overflow-hidden bg-fixed bg-[#3a3a3ac4]">
                <div className="w-full h-full flex justify-center items-center">
                    <Link to='/dashboard'><button onClick={() => navigate("/signin")} className='buttonProject3'>Let’s Explore</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;