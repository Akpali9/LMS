import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export async function checkAccess() {
  const user = auth.currentUser;

  if (!user) return false;

  const snap = await getDoc(doc(db, "users", user.uid));

  if (!snap.exists()) return false;

  const data = snap.data();

  const expired =
    data.expiresAt &&
    Date.now() > data.expiresAt;

  return (
    data.accessStatus === "approved" &&
    !expired
  );
}
