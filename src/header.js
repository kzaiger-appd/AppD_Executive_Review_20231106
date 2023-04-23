import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Logo from "./Logo.svg";
import profile from "./profile.png";


function Header() {

return (
    
	<AppBar position="static" className="header">
        
		<Toolbar>
        <img src={Logo} width="100" alt="logo"/>
        
        <Typography className="headertext" variant="h6" 
            component="div" sx={{ flexGrow: 1 }}>
            Executive Summary
          </Typography>
          <img src={profile} width="40" alt="logo"/>
		</Toolbar>
	</AppBar>
);
}

export default Header;