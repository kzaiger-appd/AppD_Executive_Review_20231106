import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppDCloud from './pages/appd_cloud';
import CSaaS from './pages/csaas';
import ExecutiveSummary from './pages/ExecutiveSummary';
import FSO from './pages/fso';
import OnPrem from './pages/on-prem';
import HeaderSidenav from './header_sidenav';
import SubmissionForm from './pages/submission_form';

function App() {
  const [sideNavExpanded, setSideNavExpanded] = React.useState(false);

  const contentStyle = {
    marginLeft: sideNavExpanded ? '170px' : '0px', // arbitrary values
    transition: 'margin 0.2s ease',
  };

  return (
    <Router>
      <HeaderSidenav setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} />
      <div style={contentStyle}>
        <Routes>
          <Route path="/appd_cloud" element={<AppDCloud />} />
          <Route path="/csaas" element={<CSaaS />} />
          <Route path="/executive_summary" element={<ExecutiveSummary />} />
          <Route path="/fso" element={<FSO />} />
          <Route path="/on_prem" element={<OnPrem />} />
          <Route path="/submission_form" element={<SubmissionForm />} />
          {/* Configure the default route by rendering ExecutiveSummary */}
          <Route index element={<ExecutiveSummary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
