import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Help from "./pages/Help";
import RoutePlanner from "./pages/RoutePlanner";
import RouteScorer from "./pages/RouteScorer";
import Stories from "./pages/Stories";
import ProfilePage from "./pages/ProfilePage";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col h-[100vh]">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Stories />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/help" element={<Help />} />
            <Route path="/routeplanner" element={<RoutePlanner />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/routescorer" element={<RouteScorer />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
