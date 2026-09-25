import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { getTheme, setTheme } from "./utils/storage";

function App() {
  useEffect(() => { setTheme(getTheme()); }, []);
  return <BrowserRouter><Routes><Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></BrowserRouter>;
}

export default App
