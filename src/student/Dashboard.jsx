import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const uid = auth.currentUser.uid;

      const snap = await getDoc(doc(db, "users", uid));

      if (!snap.exists()) {
        navigate("/");
        return;
      }

      const data = snap.data();

      // Access control
      if (data.accessStatus !== "approved") {
        navigate("/payment");
        return;
      }

      // Expiry check
      if (data.expiresAt && Date.now() > data.expiresAt) {
        alert("Your access has expired");
        navigate("/");
        return;
      }

      setUser(data);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return <div className="container">Loading dashboard...</div>;
  }

  return (
    <div className="container">
      <h1>Welcome, {user.fullName}</h1>

      <div className="card">
        <h3>Course Status</h3>
        <p className="status-approved">
          {user.accessStatus === "approved"
            ? "Active"
            : "Pending"}
        </p>
      </div>

      <button
        onClick={() =>
          navigate(`/course/${user.courseId}`)
        }
      >
        Go to Course
      </button>
    </div>
  );
}
