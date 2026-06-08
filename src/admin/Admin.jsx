import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <div className="admin-grid">
        <Link className="admin-card" to="/admin/create-course">
          Create Course
        </Link>

        <Link className="admin-card" to="/admin/upload-module">
          Upload Module
        </Link>

        <Link className="admin-card" to="/admin/grade">
          Grade Assignments
        </Link>
      </div>
    </div>
  );
}
