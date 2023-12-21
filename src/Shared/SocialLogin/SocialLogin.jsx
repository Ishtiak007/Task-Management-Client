import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import googleLogo from '../../assets/logo/googleLogo.png'


const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || "/dashboard";

    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                console.log(result.user)
                Swal.fire({
                    icon: "success",
                    title: "Thank You",
                    text: "Google Login was Succesful",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate(from, { replace: true });
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops",
                    text: "Google Login is Incomplete",
                });
            });
    };
    return (
        <div className="space-y-3 my-4">
            <button onClick={handleGoogleLogin} className="flex items-center gap-3 w-full justify-center rounded-3xl p-2 outline outline-1 outline-slate-800 mx-auto"><img src={googleLogo} className="w-6" alt="" /> Continue With Google</button>
            {/* <button onClick={handleGithubLogIn} className="flex items-center gap-3 w-3/4 rounded-3xl p-2 outline outline-1 outline-slate-800 mx-auto"><FaGithub></FaGithub>Continue With Github</button> */}
        </div>
    );
};

export default SocialLogin;