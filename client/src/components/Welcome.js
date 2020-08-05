import React from "react";
import { MDBJumbotron, MDBNavLink, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBNav } from "mdbreact";
import Image from '../css/img/bg.jpg'
const Welcome = () => {
    return (
    <MDBContainer>
        <MDBRow>
        <MDBCol>
            <MDBJumbotron style={{ padding: 0 }}>
            <MDBCol className="text-white text-center py-5 px-4 my-5" style={{ backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Image})` }}>
                <MDBCol className="py-5">
                <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">Take Your Notes Everywhere</MDBCardTitle>
                <p className="mx-5 mb-5">Welcome to Notepad App
                </p>
                <MDBNav className="d-flex justify-content-center font-weight-bold">
                    <MDBNavLink active to="/login">Log In</MDBNavLink>
                    <MDBNavLink to="/register">SignUp</MDBNavLink>
                </MDBNav>
                </MDBCol>
            </MDBCol>
            </MDBJumbotron>
        </MDBCol>
        </MDBRow>
    </MDBContainer>
    )
    }

export default Welcome;