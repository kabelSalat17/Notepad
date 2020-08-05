import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import axios from 'axios'
import cookie from 'js-cookie'
import Navbar from './Navbar'
import Error from './Error'

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state = {name:"", email:'', password:'', password_confirmation:'', errors:{}}
    }

    handleForm = (e) => {
        e.preventDefault();
        const data = {name:this.state.name ,email: this.state.email, password:this.state.password, password_confirmation:this.state.password_confirmation}
        axios.post("http://127.0.0.1:8000/api/auth/register", data)
        .then(res => {
            cookie.set('token', res.data.access_token)
            cookie.set('user', res.data.user)
            //navigate progmatically
            this.props.history.push('/profile') 
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
                <MDBRow className="w-100 d-flex justify-content-center">
                    <MDBCol sm="12" md="8" lg="6">
                        <MDBCard>
                        <MDBCardBody>
                            <form  onSubmit={this.handleForm}>
                            <p className="h5 text-center mb-4">Sign up</p>
                            <Error error={this.state.errors['result'] ? this.state.errors['result'] : null} />
                            <div className="grey-text">
                                <MDBInput label="Your name" icon="user" group type="text" name="name" onChange={this.handleInput}/>
                                <Error error={this.state.errors['name'] ? this.state.errors['name'] : null} />

                                <MDBInput label="Your email" icon="envelope" group type="email" name="email" onChange={this.handleInput} />
                                <Error error={this.state.errors['email'] ? this.state.errors['email'] : null} />

                                <MDBInput label="Your password" icon="lock" group type="password"  name="password" onChange={this.handleInput} />
                                <MDBInput label="Confirm password" icon="lock" group type="password" name="password_confirmation" onChange={this.handleInput} />
                            </div>
                            <div className="text-center">
                            <MDBBtn color="primary" type="submit">Register</MDBBtn>
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
