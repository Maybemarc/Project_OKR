import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const {user} = useAuth()

  return (
    <div>
{!user ? 
   <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" >
        <h2>MyOKR</h2>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/login" >
          <button className="nav-btn">Login</button>
        </Link>
        <Link to="/register">
          <button className="nav-btn">Signup</button>
        </Link>
      </div>
    </nav>:null
}
 
    </div>
  );
};

export default Navbar;
