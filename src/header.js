import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Logo from "./Logo.svg";
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

function Header() {

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

return (
    
	<AppBar position="static" className="header">
        
		<Toolbar>
        <img src={Logo} width="100" alt="logo"/>
        
        <Typography className="headertext" variant="h6" 
            component="div" sx={{ flexGrow: 1 }}>
            Executive Summary
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
        <MenuItem onClick={handleClose}>
        
         {/* adds a profile image to the profile option in the menu */}
          <ListItemIcon>
            <img src={profile} width = "32" height="32" ml = "-0.5" mr = "1" alt = "logo"/> 
          </ListItemIcon>
          Profile 
        </MenuItem>

        <Divider />   {/* adds a divider between the menu items */}

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        {/* redirects the user to the login page */}
        <MenuItem onClick={handleClose} component={Link} to="/login">
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>

      </Menu>

		</Toolbar>
	</AppBar>
);
}


export default Header;
