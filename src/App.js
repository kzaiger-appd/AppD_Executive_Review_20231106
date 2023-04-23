import './App.css';
import MySideNav from "./SideNav";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AppDCloud from './pages/appd_cloud';
import ContactUs from "./pages/contactus";
import CSaaS from "./pages/csaas";
import ExecutiveSummary from "./pages/ExecutiveSummary";
import FSO from "./pages/fso";
import Login from "./pages/login";
import OnPrem from "./pages/on-prem";
import Header from "./header";

function App() {
  return (
  
    <Router>
      <Header/>
      <MySideNav/>
      <Routes>
        <Route path="/appd_cloud" element={<AppDCloud/>}/>
        <Route path="/contact_us" element={<ContactUs/>}/>
        <Route path="/csaas" element={<CSaaS/>}/>
        <Route path="/executive_summary" element={<ExecutiveSummary/>}/>
        <Route path="/fso" element={<FSO/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/on_prem" element={<OnPrem/>}/>
      </Routes>
    </Router>
  
  );
}

export default App;
