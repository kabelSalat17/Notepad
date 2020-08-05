import React, { useState }  from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import cookie from 'js-cookie'
import { MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBContainer } from 'mdbreact';
import Navbar from './Navbar';



const New = () => {
    let history = useHistory();
    let token = cookie.get('token')


    const [data, setData] = useState({title:'', text:''});

    const handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setData({...data,[name]:value})
    }
    const handleForm = (e) => {
        e.preventDefault();
        const new_data = {title: data.title, text: data.text}
        axios.post("http://127.0.0.1:8000/api/auth/notes/", new_data, {
            params: {
                token : token
            }})
            .then(history.push('/profile'))        
        
    }

return (
        <>
        <Navbar />
        <MDBContainer className="mt-5 pt-5">
        <MDBRow className="w-100 mt-3 d-flex justify-content-center">
        <MDBCol sm="12" md="8" lg="6">
        <MDBCard>
            <MDBCardBody>
            <form onSubmit={handleForm}>
                <p className="h4 text-center py-4">Create</p>
                <label
                htmlFor="title"
                className="grey-text font-weight-light"
                >
                Title
                </label>
                <input
                type="text"
                name = "title"
                className="form-control"
                onChange={handleInput}
                value={data.title||''}
                />
                <br />
                <label
                htmlFor="text"
                className="grey-text font-weight-light"
                >
                Text
                </label>
                <textarea
                type="text"
                name="text"
                className="form-control"
                onChange={handleInput}
                value={data.text}
                />
                <div className="text-center py-4 mt-3">
                <MDBBtn className="btn btn-outline-blue" type="submit">
                    Send
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                </MDBBtn>
                </div>
            </form>
            </MDBCardBody>
        </MDBCard>
        </MDBCol>
        </MDBRow>
        </MDBContainer>
        </>


);
};

export default New;