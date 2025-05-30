import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="not_Found" >
      <h1>404.This page doesn't Exist</h1>
      <Link to="/" className="Homepage_link" >
      <h2>HomPage</h2>
      </Link>
    </div>
  );
}

export default Notfound;
