import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Assignment() {
  const { courseId, moduleId } = useParams();
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const submit = async () => {
    const uid = auth.currentUser.uid;

    await addDoc(collection(db, "assignments"), {
      uid,
      courseId,
      moduleId,
      answer,
      status: "pending",
      createdAt: Date.now()
    });

    alert("Assignment submitted for review");

    navigate(`/course/${courseId}`);
  };

  return (
    <div className="container">
      <h2>Module Assignment</h2>

      <textarea
        placeholder="Write your answer..."
        value={answer}
        onChange={(e) =>
          setAnswer(e.target.value)
        }
        rows={6}
      />

      <button onClick={submit}>
        Submit Assignment
      </button>
    </div>
  );
}
