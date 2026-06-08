import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Module() {
  const { courseId, moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const uid = auth.currentUser.uid;

      const userSnap = await getDoc(doc(db, "users", uid));
      const userData = userSnap.data();

      const courseSnap = await getDoc(doc(db, "courses", courseId));
      const course = courseSnap.data();

      setUser(userData);
      setModule(course.modules[moduleId]);
    };

    load();
  }, []);

  const completeModule = async () => {
    const uid = auth.currentUser.uid;

    await updateDoc(doc(db, "users", uid), {
      currentModule: Number(moduleId) + 1
    });

    navigate(`/assignment/${courseId}/${moduleId}`);
  };

  if (!module) {
    return <div className="container">Loading module...</div>;
  }

  return (
    <div className="container">
      <h2>{module.title}</h2>

      <video
        controls
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        src={module.videoUrl}
        className="video-wrapper"
      />

      <div className="card">
        <h3>Lesson Content</h3>
        <p>{module.content || "No text content provided"}</p>
      </div>

      <button onClick={completeModule}>
        Mark as Completed & Continue
      </button>
    </div>
  );
}
