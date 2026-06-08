import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function CreateStudent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [courseId, setCourseId] = useState("");

  const create = async () => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      email,
      courseId,
      accessStatus: "pending",
      createdAt: Date.now(),
      expiresAt: null
    });

    alert("Created single-user course login");
  };

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <input onChange={(e) => setCourseId(e.target.value)} placeholder="course id" />

      <button onClick={create}>Create</button>
    </div>
  );
}
