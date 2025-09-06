import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import UserStores from "./pages/UserStores";
import OwnerDashboard from "./pages/OwnerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import StoreLogos from "./pages/StoreLogos";
import ChatBot from "./components/ChatBot";


export default function App() {
 return (
  <div style={{minHeight: '100vh', backgroundColor: '#f9fafb'}}>
   <Navbar />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/brands" element={<StoreLogos />} />

    <Route
     path="/admin"
     element={
      <ProtectedRoute role="ADMIN">
       <AdminDashboard />
      </ProtectedRoute>
     }
    />
    <Route
     path="/stores"
     element={
      <ProtectedRoute role="USER">
       <UserStores />
      </ProtectedRoute>
     }
    />
    <Route
     path="/owner"
     element={
      <ProtectedRoute role="OWNER">
       <OwnerDashboard />
      </ProtectedRoute>
     }
    />
   </Routes>
   <ChatBot />
  </div>
 );
}
