// src/App.jsx (Best Practice Version)

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Layouts and Pages
import SpaceBiologyEngine from "./pages/Dashboard"; 
import OSDRDetailsPage from "./pages/Details";
import NoSidebarLayout from "./layouts/NoSidebarLayout"; 
import NotFoundPage from "./pages/404";
import LandingPage from "./pages/LandingPage.jsx";
import SearchBar from "./components/Searchbar.jsx";
import SearchPage from "./pages/search.jsx";
import DesktopOnlyWarning from "./components/DekstopWarning.jsx";

// *** CHANGE: Import the new component ***

function App() {
  return (
    <Router>
      {/* *** CHANGE: Render the warning component here *** */}
      <DesktopOnlyWarning /> 
      
      <Routes>
        {/* Dashboard Route (Uses your existing component, which has the sidebar) */}
        <Route path="/engine" element={<SpaceBiologyEngine />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />

        {/* OSDR Details Route (Uses the new layout which has NO sidebar) */}
        <Route
          path="/osdr/:osdrId"
          element={
            <NoSidebarLayout>
              <OSDRDetailsPage />
            </NoSidebarLayout>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;