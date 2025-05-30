import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function SecureNavbar() {
  const { user } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="Secure_Navbar_Container">
      <div className="Navbar_Box">
        <div className="User_Name"> 
        </div>
        <div className="Navbar_User_Letter" >
          <Link to="/secure/CreateOKR" >
          <button className="Add_okr_Button" > +</button>
          </Link>
          <div className="" onClick={() => setOpenMenu(!openMenu)}>
          <h2 className="single_Name"  >{user.name.toUpperCase().slice(0,1)}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecureNavbar;
