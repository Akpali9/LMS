import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const uid = auth.currentUser.uid;

      const userSnap = await getDoc(doc(db, "users", uid));
      const userData = userSnap.data();

      // Ensure student only accesses assigned course
      if (userData.courseId !== courseId) {
        alert("Unauthorized course access");
        navigate("/dashboard");
        return;
      }

      const courseSnap = await getDoc(doc(db, "courses", courseId));

      setUser(userData);
      setCourse(courseSnap.data());
    };

    load();
  }, [courseId]);

  if (!course) {
    return <div className="container">Loading course...</div>;
  }

  return (
    <div className="container">
      <h1>{course.title}</h1>

      <h3>Modules</h3>

      {course.modules?.map((m, index) => {
        const locked = index > user.currentModule;

        return (
          <div key={index} className="card">
            <h3>
              Module {index + 1}: {m.title}
            </h3>

            {locked ? (
              <p className="status-pending">
                Locked (Complete previous module)
              </p>
            ) : (
              <button
                onClick={() =>
                  navigate(
                    `/module/${courseId}/${index}`
                  )
                }
              >
                Open Module
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
