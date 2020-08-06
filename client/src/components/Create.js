import React, { useState }  from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBContainer } from 'mdbreact';
import Navbar from './Navbar';
import {connect} from 'react-redux'


const New = ({token, setData}) => {
    let history = useHistory();
    let tkn = token

    const loadData = ()=> {
        axios.get('http://127.0.0.1:8000/api/auth/notes', {
            params:{
                token:tkn
            }})
            .then((res => setData(res.data)))
    }
    const [info, setInfo] = useState({title:'', text:''});

    const handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setInfo({...info,[name]:value})
    }
    const handleForm = (e) => {
        e.preventDefault();
        const new_info = {title: info.title, text: info.text}
        axios.post("http://127.0.0.1:8000/api/auth/notes/", new_info, {
            params: {
                token : tkn
            }})
            .then(history.push('/profile'))
            .then(()=>loadData())
        
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
                value={info.title||''}
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
                value={info.text}
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


const mapStateToProps = state => {
    return {
        token:state.auth.token,
        data:state.auth.data,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        setData : (data) => dispatch({
            type : "SET_DATA",
            payload: data
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(New);
