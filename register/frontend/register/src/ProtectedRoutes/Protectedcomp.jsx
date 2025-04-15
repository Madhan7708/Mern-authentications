
import { Navigate } from "react-router-dom";
function Protectedcomp({children}){
    const token=localStorage.getItem('token');

    return(
        <div className="Protectedcomp">
             {token ? children:<Navigate to='/' />}
        </div>
    );
}
export default Protectedcomp;