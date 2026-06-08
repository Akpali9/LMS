import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const uid = userCredential.user.uid;

      const userDoc = await getDoc(
        doc(db, "users", uid)
      );

      if (!userDoc.exists()) {
        setError("User profile not found");
        return;
      }

      const userData = userDoc.data();

      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Student Login</h2>

      {error && (
        <p className="status-rejected">
          {error}
        </p>
      )}

      <form onSubmit={login}>
        <label>Email</label>

        <input
          type="email"
          required
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <label>Password</label>

        <input
          type="password"
          required
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button disabled={loading}>
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>

      <br />

      <Link to="/register">
        Create Account
      </Link>
    </div>
  );
}
