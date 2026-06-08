import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Certificate() {
  const [cert, setCert] = useState(null);

  useEffect(() => {
    const load = async () => {
      const uid = auth.currentUser.uid;

      const snap = await getDoc(
        doc(db, "certificates", `${uid}_course`)
      );

      if (snap.exists()) {
        setCert(snap.data());
      }
    };

    load();
  }, []);

  if (!cert) {
    return (
      <div className="container">
        <h2>No certificate yet</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>🎓 Your Certificate</h2>

      <a
        href={cert.certificateUrl}
        target="_blank"
        rel="noreferrer"
      >
        Download Certificate
      </a>
    </div>
  );
}
