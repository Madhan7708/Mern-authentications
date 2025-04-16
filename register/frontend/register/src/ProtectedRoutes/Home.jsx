import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../Usercontext";
function Home() {
    const nav = useNavigate();
    const { userEmail } = useContext(UserContext);

    function logout() {
        localStorage.removeItem('token');
        nav('/');
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                    <h4 className="mb-0">Dashboard</h4>
                    <button className="btn btn-outline-light btn-sm" onClick={logout}>
                        Logout
                    </button>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Welcome to the Home Page! {userEmail}</h5>
                    <p className="card-text">
                        This is your dashboard. You can manage your account, check updates, and perform various actions here.
                    </p>
                  
                </div>
            </div>
        </div>
    );
}

export default Home;
