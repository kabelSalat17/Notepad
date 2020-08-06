import React from "react";
import { useHistory } from "react-router-dom";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import cookie from 'js-cookie'
import {connect} from 'react-redux'


const NavbarPage = (props) => {
    let history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault()
        cookie.remove("token")
        props.logout()
        history.go()
    }

    const handleHome = (e) => {
        e.preventDefault()
        history.push('/profile')
    }

    const handleCreate = (e) => {
        e.preventDefault()
        history.push('/profile/create')
    }

    const handleRegister = (e) => {
        e.preventDefault()
        history.push('/register')
    }
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
                <MDBNavLink to="/create" onClick={handleCreate}>Add Note</MDBNavLink> 
            </MDBNavItem>
            <MDBNavItem>
                <MDBNavLink to="/register" onClick={handleRegister}>Register</MDBNavLink> 
            </MDBNavItem>
            <MDBNavItem>
                <MDBNavLink to="/logout" onClick={handleLogout}>Log Out</MDBNavLink>
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