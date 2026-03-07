import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <h1>CSI CSE AI&ML Symposium Registration</h1>
        <Link to="/register" className="btn btn-primary">
          Register
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
