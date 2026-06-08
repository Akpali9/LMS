import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "payments"));
      setPayments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    load();
  }, []);

  const approve = async (p) => {
    await updateDoc(doc(db, "payments", p.id), {
      status: "approved"
    });

    await updateDoc(doc(db, "users", p.uid), {
      accessStatus: "approved",
      expiresAt: Date.now() + 90 * 24 * 60 * 60 * 1000
    });

    alert("Approved");
  };

  const reject = async (id) => {
    await updateDoc(doc(db, "payments", id), {
      status: "rejected"
    });
  };

  return (
    <div>
      <h2>Payments</h2>

      {payments.map(p => (
        <div key={p.id} className="card">
          <img src={p.receipt} width="200" />
          <button onClick={() => approve(p)}>Approve</button>
          <button onClick={() => reject(p.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
}
