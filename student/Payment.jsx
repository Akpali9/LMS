import { useState } from "react";
import { db, storage, auth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export default function Payment() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const user = auth.currentUser;

    const fileRef = ref(storage, `receipts/${user.uid}`);
    await uploadBytes(fileRef, file);

    const url = await getDownloadURL(fileRef);

    await addDoc(collection(db, "payments"), {
      uid: user.uid,
      courseId: user.uid,
      receipt: url,
      status: "pending",
      createdAt: Date.now()
    });

    alert("Sent for approval");
  };

  return (
    <div className="container">
      <h2>Upload Payment Receipt</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Submit</button>
    </div>
  );
}
