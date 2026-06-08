import { useState } from "react";
import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  auth,
  db
} from "../firebase";

import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

import {
  useNavigate,
  Link
} from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const uid =
        userCredential.user.uid;

      await setDoc(
        doc(db, "users", uid),
        {
          uid,
          fullName,
          email,
          phone,

          role: "student",

          courseId: null,

          paymentStatus:
            "pending",

          accessStatus:
            "pending",

          currentModule: 0,

          certificateIssued:
            false,

          expiresAt: null,

          createdAt:
            serverTimestamp()
        }
      );

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Create Student Account</h2>

      {error && (
        <p className="status-rejected">
          {error}
        </p>
      )}

      <form onSubmit={register}>
        <label>Full Name</label>

        <input
          type="text"
          required
          value={fullName}
          onChange={(e) =>
            setFullName(
              e.target.value
            )
          }
        />

        <label>Email</label>

        <input
          type="email"
          required
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <label>Phone Number</label>

        <input
          type="text"
          required
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
        />

        <label>Password</label>

        <input
          type="password"
          required
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button disabled={loading}>
          {loading
            ? "Creating..."
            : "Register"}
        </button>
      </form>

      <br />

      <Link to="/">
        Already have an account?
      </Link>
    </div>
  );
}
