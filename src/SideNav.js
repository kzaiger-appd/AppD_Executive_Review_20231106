import SideNav, {NavItem,NavIcon,NavText} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import {useNavigate} from "react-router-dom";


function MySideNav(){
    const navigate = useNavigate();
    const handleSelect = (selected) => {
      navigate(`/${selected}`);
    };

    return (
    <SideNav
    onSelect={handleSelect}
    className="mysidenav"
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="ExeSummary">
                <NavItem eventKey="executive_summary">
                    <NavIcon><i className="fa fa-fw fa-house" style={{fontSize:"1.5em"}} ></i></NavIcon>
                    <NavText>Executive Summary</NavText>
                </NavItem>
                <NavItem eventKey="csaas">
                    <NavIcon><i className="fa fa-fw fa-hard-drive" style={{fontSize:"1.5em"}}></i></NavIcon>
                    <NavText>CSaaS</NavText>
                </NavItem>
                <NavItem eventKey="appd_cloud">
                    <NavIcon><i className="fa fa-fw fa-cloud" style={{fontSize:"1.5em"}}></i></NavIcon>
                    <NavText>Appd Cloud</NavText>
                </NavItem>
                <NavItem eventKey="on_prem">
                    <NavIcon><i className="fa fa-fw fa-upload" style={{fontSize:"1.5em"}}></i></NavIcon>
                    <NavText>On-Prem</NavText>
                </NavItem>
                <NavItem eventKey="fso">
                    <NavIcon><i className="fa fa-fw fa-desktop" style={{fontSize:"1.5em"}}></i></NavIcon>
                    <NavText>FSO</NavText>
                </NavItem>
                <NavItem eventKey="contact_us" style={{bottom: "-340px"}}>
                    <NavIcon><i className="fa fa-fw fa-phone" style={{fontSize:"1.5em"}}></i></NavIcon>
                    <NavText>Contact us </NavText>
                </NavItem >
                <NavItem eventKey="login" style={{bottom: "-340px"}}>
                    <NavIcon><i className="fa fa-fw fa-power-off" style={{fontSize:"1.5em"}} ></i></NavIcon>
                    <NavText>Logout</NavText>
                </NavItem>
            </SideNav.Nav>
            </SideNav>
            );
    }



    export default MySideNav;


