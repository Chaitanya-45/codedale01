import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import HeroSection from "./herosection";
import DepartmentsSection from "./DepartmentsSection";
import CampaignSection from "./CampaignSection";
import SlidesSection from "./Slides";
import Footer from "./footer";
import LoginPage from "./login";
import Signup from "./signup";
import PostLoginLayout from "./postloginlayout";
import Dashboard from "./dashboard";
import FormBuilder from "./FormBuilder";
import Response from "./response";
import FormFill from "./FormFill";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HeroSection />
              <DepartmentsSection />
              <CampaignSection />
              <SlidesSection />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/form/:formId" element={<FormFill />} />


        <Route element={<PostLoginLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/FormBuilder" element={<FormBuilder />} />
          <Route path="/response" element={<Response />} />
        </Route>
      </Routes>
    </Router>
  );
}
