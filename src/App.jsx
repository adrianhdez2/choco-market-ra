import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ArExperience from './pages/ArExperience.jsx';
import MindArExperience from './pages/MindArExperience.jsx';
import SmartArLauncher from './pages/SmartArLauncher.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ar" element={<ArExperience />} />
      <Route path="/mindar" element={<MindArExperience />} />
      <Route path="/smart-ar" element={<SmartArLauncher />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
