import { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function CreateCourse() {
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");

  const createCourse = async () => {
    if (!courseId) return alert("Course ID required");

    await setDoc(doc(db, "courses", courseId), {
      title,
      modules: []
    });

    alert("Course created successfully");
  };

  return (
    <div className="container">
      <h2>Create Course</h2>

      <input
        placeholder="Course ID (e.g react-101)"
        onChange={(e) => setCourseId(e.target.value)}
      />

      <input
        placeholder="Course Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createCourse}>
        Create Course
      </button>
    </div>
  );
}
