import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Lazy pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Subscribe = lazy(() => import("./pages/Subscribe"));
const CheckResult = lazy(() => import("./pages/CheckResult"));
const UploadProof = lazy(() => import("./pages/UploadProof"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Charity = lazy(() => import("./pages/Charity"));
const History = lazy(() => import("./pages/History"));
const ManageWinners = lazy(() => import("./pages/ManageWinners"));
const AdminDraw = lazy(() => import("./pages/AdminDraw"));

export default function App() {
  return (
    <BrowserRouter>

      {/* Suspense for lazy loading */}
      <Suspense fallback={<div className="p-4">Loading...</div>}>

        <Routes>
           <Route path="/" element={<Home />} />
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <MainLayout><Dashboard /></MainLayout>
            </PrivateRoute>
          } />

          <Route path="/subscribe" element={
            <PrivateRoute>
              <MainLayout><Subscribe /></MainLayout>
            </PrivateRoute>
          } />

          <Route path="/check" element={
            <PrivateRoute>
              <MainLayout><CheckResult /></MainLayout>
            </PrivateRoute>
          } />

          <Route path="/proof" element={
            <PrivateRoute>
              <MainLayout><UploadProof /></MainLayout>
            </PrivateRoute>
          } />

          <Route path="/admin" element={
            <PrivateRoute>
              <MainLayout><AdminDashboard /></MainLayout>
            </PrivateRoute>
          } />

          <Route path="/charity" element={
            <PrivateRoute>
              <MainLayout><Charity /></MainLayout>
            </PrivateRoute>
          } />

          <Route path="/history" element={
            <PrivateRoute>
              <MainLayout><History /></MainLayout>
            </PrivateRoute>
          } />

          <Route path="/admin/winners" element={
            <PrivateRoute>
              <MainLayout><ManageWinners /></MainLayout>
            </PrivateRoute>
          } />

          <Route path="/admin/draw" element={
  <PrivateRoute>
    <MainLayout><AdminDraw /></MainLayout>
  </PrivateRoute>
} />

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}