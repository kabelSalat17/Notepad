import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import axios from 'axios'
import cookie from 'js-cookie'
import {connect} from 'react-redux'
import Error from './Error'
import Navbar from './Navbar';

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {email:'', password:'', errors:{}}
    }

    handleForm = (e) => {
        e.preventDefault();
        const data = {email: this.state.email, password:this.state.password}
        axios.post("http://127.0.0.1:8000/api/auth/login", data)
            .then(res => {
                cookie.set('token', res.data.access_token)
                //dispatch to set login state
                this.props.setLogin(res.data.user)
                this.props.setToken(res.data.access_token)
            })
            .catch(e => this.setState({errors: e.response.data.errors}))
    }

    handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        this.setState({[name]:value})
    }
    render() {

        return (
            <>
            <Navbar />
            <MDBContainer className="d-flex justify-content-center align-items-center">
                <MDBRow className="w-100  d-flex justify-content-center">
                    <MDBCol sm="12" md="8" lg="6">
                        <MDBCard>
                        <MDBCardBody>
                            <form  onSubmit={this.handleForm}>
                            <p className="h5 text-center mb-4">Log In</p>
                            <Error error={this.state.errors['result'] ? this.state.errors['result'] : null} />
                            <div className="grey-text mt-5">
                                <MDBInput label="Your email" icon="envelope" group type="text" name="email" onChange={this.handleInput}/>
                                <Error error={this.state.errors['email'] ? this.state.errors['email'] : null} />

                                <MDBInput label="Your password" icon="lock" group type="password"  name="password" onChange={this.handleInput} />

                            </div>
                            <div className="text-center mt-5 pt-3">
                            <MDBBtn color="primary" type="submit">Log In</MDBBtn>
                            </div>
                            </form>
                        </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            </>

        )
    }
}

const mapDispactToProps = dispatch => {
    return {
        setLogin : (user) => dispatch({
            type : "SET_LOGIN",
            payload:user
        }),
        setToken : (tkn) => dispatch({
            type : "SET_TOKEN",
            payload:tkn
        })
    }}

export default connect(null, mapDispactToProps)(Login);