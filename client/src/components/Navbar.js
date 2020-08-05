import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBIcon} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import cookie from 'js-cookie'
import {connect} from 'react-redux'


const NavbarPage = (props) => {
    let history = useHistory();
    const [width, setWidth] = useState()


    const handleLogout = (e) => {
        e.preventDefault()
        cookie.remove("token")
        props.logout()
    }

    const handleHome = (e) => {
        e.preventDefault()
        history.push('/profile')
    }

    const handleCreate = (e) => {
        e.preventDefault()
        history.push('/create')
    }

    const update = () => {
        setWidth(window.innerWidth)
        console.log(width)
    }
    window.addEventListener("resize", update)

return (
    <Router>
    <MDBNavbar color="grey darken-4" dark expand="md" fixed="top">
        <MDBNavbarBrand>
        <MDBNavbarNav left>
            <MDBNavLink to="/home" onClick={handleHome}>Home</MDBNavLink>
        </MDBNavbarNav>
        </MDBNavbarBrand>
        <MDBNavbarNav right className="d-flex">
            <MDBNavItem>
                {width>700
                    ? 
                    <MDBNavLink to="/create" onClick={handleCreate}>Add Note</MDBNavLink> 
                    :
                    <MDBNavLink to="/create" onClick={handleCreate}><MDBIcon icon="plus" /></MDBNavLink>
                }
            </MDBNavItem>
            <MDBNavItem>
                {width>700
                    ? 
                    <MDBNavLink to="/logout" onClick={handleLogout}>Log Out</MDBNavLink>

                    :
                    <MDBNavLink to="/logout" onClick={handleLogout}><MDBIcon icon="sign-out-alt" /></MDBNavLink>
                }
            </MDBNavItem>
        </MDBNavbarNav>
    </MDBNavbar>
    </Router>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        logout : () => dispatch({type:'SET_LOGOUT'}),

    }
}
export default connect(null, mapDispatchToProps)(NavbarPage);