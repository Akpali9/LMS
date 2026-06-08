import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import Dashboard from "./student/Dashboard";
import Course from "./student/Course";
import Module from "./student/Module";
import Payment from "./student/Payment";

import Admin from "./admin/Admin";
import CreateStudent from "./admin/CreateStudent";
import CreateCourse from "./admin/CreateCourse";
import Payments from "./admin/Payments";
import UploadModule from "./admin/UploadModule";
import Grade from "./admin/Grade";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        <Route
          path="/course"
          element={<ProtectedRoute><Course /></ProtectedRoute>}
        />

        <Route
          path="/module"
          element={<ProtectedRoute><Module /></ProtectedRoute>}
        />

        <Route
          path="/payment"
          element={<ProtectedRoute><Payment /></ProtectedRoute>}
        />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create-student" element={<CreateStudent />} />
        <Route path="/admin/create-course" element={<CreateCourse />} />
        <Route path="/admin/payments" element={<Payments />} />
        <Route path="/admin/upload" element={<UploadModule />} />
        <Route path="/admin/grade" element={<Grade />} />
      </Routes>
    </BrowserRouter>
  );
}
