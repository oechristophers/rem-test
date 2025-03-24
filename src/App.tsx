import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { loadTheme } from "./utils/theme";
import Content from "./components/Content";

// Main App component where routing and theme initialization occurs
const MainApp: React.FC = () => {
  useEffect(() => {
    loadTheme(); // Load the theme when the app is initialized
  }, []);

  return (
    <Content>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Content>
  );
};

// Wrapping the app in BrowserRouter for routing
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
};

export default App;
