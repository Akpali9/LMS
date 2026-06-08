import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./auth/Login";
import Register from "./auth/Register";

import Dashboard from "./student/Dashboard";
import Course from "./student/Course";
import Module from "./student/Module";
import Assignment from "./student/Assignment";

import Admin from "./admin/Admin";
import CreateCourse from "./admin/CreateCourse";
import UploadModule from "./admin/UploadModule";
import Grade from "./admin/Grade";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* STUDENT */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/course/:courseId"
          element={
            <ProtectedRoute>
              <Course />
            </ProtectedRoute>
          }
        />

        <Route
          path="/module/:courseId/:moduleId"
          element={
            <ProtectedRoute>
              <Module />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assignment/:courseId/:moduleId"
          element={
            <ProtectedRoute>
              <Assignment />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-course"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/upload-module"
          element={
            <ProtectedRoute>
              <UploadModule />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/grade"
          element={
            <ProtectedRoute>
              <Grade />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
