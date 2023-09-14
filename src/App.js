import './App.css';
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AppDCloud from './pages/appd_cloud';
import ContactUs from "./pages/contactus";
import CSaaS from "./pages/csaas";
import ExecutiveSummary from "./pages/ExecutiveSummary";
import FSO from "./pages/fso";
import Login from "./pages/login";
import OnPrem from "./pages/on-prem";
import HeaderSidenav from "./header_sidenav";
import Settings from "./pages/settings";
import Profile from "./pages/profile";
import SubmissionForm from "./pages/submission_form";


function App() {
  return (
  
    <Router>
      <HeaderSidenav/>
      <Routes>
        <Route path="/appd_cloud" element={<AppDCloud/>}/>
        <Route path="/contact_us" element={<ContactUs/>}/>
        <Route path="/csaas" element={<CSaaS/>}/>
        <Route path="/executive_summary" element={<ExecutiveSummary/>}/>
        <Route path="/fso" element={<FSO/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/on_prem" element={<OnPrem/>}/>
        <Route path="/submission_form" element={<SubmissionForm/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
