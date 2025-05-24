import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ReportIssuePage from './pages/ReportIssuePage';
import DashboardPage from './pages/DashboardPage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportIssuePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;