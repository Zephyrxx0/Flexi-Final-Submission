import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/Pages/Login";
import Home from "@/Pages/Home";
import Shop from "./Pages/Shop";
import ProtectedRoute from "./utils/ProtectedRoute";

import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App