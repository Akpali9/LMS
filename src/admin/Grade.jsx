import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

export default function Grade() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "assignments"));

      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data()
      }));

      setAssignments(data);
    };

    load();
  }, []);

  const approve = async (id) => {
    await updateDoc(doc(db, "assignments", id), {
      status: "passed"
    });

    alert("Assignment approved");
  };

  const reject = async (id) => {
    await updateDoc(doc(db, "assignments", id), {
      status: "rejected"
    });

    alert("Assignment rejected");
  };

  return (
    <div className="container">
      <h2>Assignment Review</h2>

      {assignments.length === 0 && (
        <p>No assignments submitted yet</p>
      )}

      {assignments.map((a) => (
        <div key={a.id} className="card">
          <p><b>Student:</b> {a.uid}</p>
          <p><b>Answer:</b> {a.answer}</p>
          <p>
            <b>Status:</b>{" "}
            <span
              className={
                a.status === "passed"
                  ? "status-approved"
                  : a.status === "rejected"
                  ? "status-rejected"
                  : "status-pending"
              }
            >
              {a.status}
            </span>
          </p>

          <button onClick={() => approve(a.id)}>
            Approve
          </button>

          <button onClick={() => reject(a.id)}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}
