import React, { useState } from 'react';

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Logo from "./cisco_logo.png";

import SideNav, {NavItem,NavIcon,NavText} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import {useNavigate} from "react-router-dom";




const HeaderSidenav = ({ sideNavExpanded, setSideNavExpanded }) => {

  const navigate = useNavigate();
  const handleSelect = (selected) => {
    navigate(`/${selected}`);
  };

/* The profile icon is wrapped in a Tooltip component and an IconButton component. 
When the user clicks on the profile icon, it opens a Menu component. The user can click on either MenuItem 
to close the menu. The code uses React hooks to manage the state of the Menu component. 
The useState hook defines a state variable called anchorEl that is initially set to null. 
The handleClick function sets the anchorEl variable to the current target of the click event, which opens the menu. 
The handleClose function sets the anchorEl variable back to null, which closes the menu. */

var current_title="Executive Summary";
const [myTitle, setMyTitle] = useState(current_title);
var userName="Howard University";
return (
  <div>
	<AppBar position="fixed" className="header"elevation={0}>
        
		<Toolbar>
        <img src={Logo} width="120" alt="logo"/>
        <Typography className="headertext" variant="h6" 
            component="div" sx={{ flexGrow: 1  }}>
              {myTitle}
        </Typography>
        {userName}
		</Toolbar>
	</AppBar>
  <Toolbar />

  <SideNav onSelect={handleSelect} className="mysidenav" onToggle={() => {
          setSideNavExpanded(!sideNavExpanded);
        }} style={{position:'fixed'}}>
              <SideNav.Toggle />
              <SideNav.Nav defaultSelected="executive_summary">
                  <NavItem eventKey="executive_summary" onClick ={() => setMyTitle("Executive Summary")}>
                      <NavIcon><i className="fa fa-fw fa-house" style={{fontSize:"1.5em"}} ></i></NavIcon>
                      <NavText>Executive Summary</NavText>
                  </NavItem>
                  <NavItem eventKey="csaas" onClick ={() => setMyTitle("CSaaS")}>
                      <NavIcon><i className="fa fa-fw fa-hard-drive" style={{fontSize:"1.5em"}}></i></NavIcon>
                      <NavText>CSaaS</NavText>
                  </NavItem>
                  <NavItem eventKey="appd_cloud" onClick ={() => setMyTitle("Appd Cloud")}>
                      <NavIcon><i className="fa fa-fw fa-cloud" style={{fontSize:"1.5em"}}></i></NavIcon>
                      <NavText>Appd Cloud</NavText>
                  </NavItem>
                  <NavItem eventKey="on_prem" onClick ={() => setMyTitle("On-Prem")}>
                      <NavIcon><i className="fa fa-fw fa-upload" style={{fontSize:"1.5em"}}></i></NavIcon>
                      <NavText>On-Prem</NavText>
                  </NavItem>
                  <NavItem eventKey="fso" onClick ={() => setMyTitle("FSO and CNAO")}>
                      <NavIcon><i className="fa fa-fw fa-desktop" style={{fontSize:"1.5em"}}></i></NavIcon>
                      <NavText>FSO and CNAO</NavText>
                  </NavItem>
                  <NavItem eventKey="submission_form" style={{position: "relative"}} onClick ={() => setMyTitle("Submission Form")}>
                      <NavIcon><i className="fa fa-pencil" style={{fontSize:"1.5em"}}></i></NavIcon>
                      <NavText>Submission Form</NavText>
                  </NavItem >
  
  
              </SideNav.Nav>
              </SideNav>
          </div>
);
}


export default HeaderSidenav;
