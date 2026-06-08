import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const load = async () => {
      const u = auth.currentUser;

      const snap = await getDoc(doc(db, "users", u.uid));
      const data = snap.data();

      if (data.accessStatus !== "approved") {
        nav("/payment");
      }

      setUser(data);
    };

    load();
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Course: {user?.courseId}</p>
    </div>
  );
}
