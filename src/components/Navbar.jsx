import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const logout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        LMS Portal
      </div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/admin">Admin</Link>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
