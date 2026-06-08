import { useEffect, useState } from "react";
import { checkAccess } from "../utils/checkAccess";

export default function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const run = async () => {
      const ok = await checkAccess();
      setAllowed(ok);
    };

    run();
  }, []);

  if (allowed === null) {
    return <div className="container">Checking access...</div>;
  }

  if (!allowed) {
    return (
      <div className="container">
        <h2>❌ Access denied or expired</h2>
        <p>Please contact admin or complete payment.</p>
      </div>
    );
  }

  return children;
}
