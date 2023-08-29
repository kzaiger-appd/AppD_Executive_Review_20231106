import React, { useState } from 'react';

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Logo from "./cisco_logo.png";
import profile from "./profile.png";

// import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import SideNav, {NavItem,NavIcon,NavText} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import {useNavigate} from "react-router-dom";




function HeaderSidenav() {

  const navigate = useNavigate();
  const handleSelect = (selected) => {
    navigate(`/${selected}`);
  };

const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

// close the menu, constant to define that action
const handleClose = () => {
  setAnchorEl(null);
};

/* The profile icon is wrapped in a Tooltip component and an IconButton component. 
When the user clicks on the profile icon, it opens a Menu component. The user can click on either MenuItem 
to close the menu. The code uses React hooks to manage the state of the Menu component. 
The useState hook defines a state variable called anchorEl that is initially set to null. 
The handleClick function sets the anchorEl variable to the current target of the click event, which opens the menu. 
The handleClose function sets the anchorEl variable back to null, which closes the menu. */

var current_title="Executive Summary";
const [myTitle, setMyTitle] = useState(current_title);

return (
  <div>
	<AppBar position="static" className="header">
        
		<Toolbar>
        <img src={Logo} width="120" alt="logo"/>
        
        <Typography className="headertext" variant="h6" 
            component="div" sx={{ flexGrow: 1 }}>
              {myTitle}
        </Typography>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <img src={profile} width="40" alt="logo"/>
          </IconButton>
        </Tooltip>

        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick ={() => setMyTitle("Profile")} component={Link} to="/profile">
        
         {/* adds a profile image to the profile option in the menu */}
          <ListItemIcon>
            <img src={profile} width = "32" height="32" ml = "-0.5" mr = "1" alt = "logo"/> 
          </ListItemIcon>
          Profile 
        </MenuItem>

        <Divider />   {/* adds a divider between the menu items */}

        <MenuItem component={Link} to="/settings" onClick ={() => setMyTitle("Settings")} >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        {/* redirects the user to the login page */}
        <MenuItem component={Link} to="/login" onClick ={() => setMyTitle("Login")}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>

      </Menu>

		</Toolbar>
	</AppBar>

  <SideNav onSelect={handleSelect} className="mysidenav" >
              <SideNav.Toggle />
              <SideNav.Nav defaultSelected="ExeSummary">
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
                  <NavItem eventKey="fso" onClick ={() => setMyTitle("FSO")}>
                      <NavIcon><i className="fa fa-fw fa-desktop" style={{fontSize:"1.5em"}}></i></NavIcon>
                      <NavText>FSO</NavText>
                  </NavItem>
                  <NavItem eventKey="contact_us" style={{position: "relative"}} onClick ={() => setMyTitle("Contact Us")}>
                      <NavIcon><i className="fa fa-fw fa-phone" style={{fontSize:"1.5em"}}></i></NavIcon>
                      <NavText>Contact us</NavText>
                  </NavItem >
                  <NavItem eventKey="submission_form" style={{position: "relative"}} onClick ={() => setMyTitle("Submission Form")}>
                      <NavIcon><i className="fa fa-pencil" style={{fontSize:"1.5em"}}></i></NavIcon>
                      <NavText>Submission Form</NavText>
                  </NavItem >
  
                  {/*  keeping the  logout item for reference */}
  
                  {/* <NavItem eventKey="login" style={{position: "relative"}}>
                      <NavIcon><i className="fa fa-fw fa-power-off" style={{fontSize:"1.5em"}} ></i></NavIcon>
                      <NavText>Logout</NavText>
                  </NavItem> */}
  
              </SideNav.Nav>
              </SideNav>
          </div>
);
}


export default HeaderSidenav;
