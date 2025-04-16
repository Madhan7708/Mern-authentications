
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../Usercontext";
function Protectedcomp({children}){
    //const token=localStorage.getItem('token');
    const nav=useNavigate();
    const {userEmail} = useContext(UserContext);
   useEffect(()=>{
    console.log(userEmail);
       if(!userEmail) nav('/');
   },[])
    return(
        <div>
             { children}
        </div>
    );
}
export default Protectedcomp;