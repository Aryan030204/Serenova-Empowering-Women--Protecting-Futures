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
import RoutesPage from "./pages/RoutesPage";
import OpenedPost from "./components/OpenedPost";
import SavedPosts from "./pages/SavedPosts";
import SavedPost from "./pages/SavedPost";
import TrendingStories from "./pages/TrendingStories";
import MostLikedStories from "./pages/MostLikedStories";
import MostViewedStories from "./pages/MostViewedStories";
import RecentStories from "./pages/RecentStories";
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
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/blog/stories/:id" element={<OpenedPost />} />
            <Route path="/blog/:id/saved" element={<SavedPosts />} />
            <Route path="/user/saved/:id" element={<SavedPost />} />
            <Route path="/stories/trending" element={<TrendingStories />} />
            <Route path="/stories/mostliked" element={<MostLikedStories />} />
            <Route path="/stories/mostviewed" element={<MostViewedStories />} />
            <Route path="/stories/recent" element={<RecentStories />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
