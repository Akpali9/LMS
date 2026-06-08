import { useState } from "react";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function UploadModule() {
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [video, setVideo] = useState(null);

  const uploadModule = async () => {
    if (!video) return alert("Video required");

    // Upload video
    const videoRef = ref(storage, `courses/${courseId}/${video.name}`);
    await uploadBytes(videoRef, video);

    const videoUrl = await getDownloadURL(videoRef);

    // Get course
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      return alert("Course not found");
    }

    const courseData = courseSnap.data();

    const newModule = {
      title,
      content,
      videoUrl
    };

    await updateDoc(courseRef, {
      modules: [...(courseData.modules || []), newModule]
    });

    alert("Module uploaded successfully");
  };

  return (
    <div className="container">
      <h2>Upload Module</h2>

      <input
        placeholder="Course ID"
        onChange={(e) => setCourseId(e.target.value)}
      />

      <input
        placeholder="Module Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Module Content"
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setVideo(e.target.files[0])}
      />

      <button onClick={uploadModule}>
        Upload Module
      </button>
    </div>
  );
}
