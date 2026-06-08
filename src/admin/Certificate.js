import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function issueCertificate(uid, courseId, url) {
  await setDoc(doc(db, "certificates", `${uid}_${courseId}`), {
    uid,
    courseId,
    certificateUrl: url,
    issued: true,
    issuedAt: Date.now()
  });
}
