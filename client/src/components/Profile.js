import React, { useState, useEffect }  from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon} from 'mdbreact';
import axios from 'axios';
import cookie from 'js-cookie'
import Navbar from './Navbar'
import {connect} from 'react-redux'

const Profile = (props) => {
    let token = cookie.get('token')
    const [data, setData] = useState([]);
    
    const deleteData = (element) => {
        axios.delete('http://127.0.0.1:8000/api/auth/notes/' + element, {
            params: {
                token : token
            }
        })
        .then(() => loadData())
    }

    const loadData = () => {
        axios.get('http://127.0.0.1:8000/api/auth/notes', {
            params: {
                token : token
            }
        })
        .then(
            res => setData(res.data)
        )
    }
    useEffect(() => {
        loadData()
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <Navbar />
            <div className="welcome-container">
                <h3 className="animated bounceInLeft slower">Welcome, {props.user.name}!</h3> 
            </div>
            <div className="mt-5 d-flex justify-content-center flex-wrap">
            {
                data.map( el => (
                    <MDBCard style={{ minWidth: "22rem", minHeight:"22em", margin:"1.5em 1.5em" }} className="animated FadeInUp slower" key={el.id}>
                    <MDBCardBody>
                        <div className="d-flex justify-content-end align-items-baseline icons-container">
                            <MDBBtn className="edit" href={"/note/" + el.id}><MDBIcon icon="edit" /></MDBBtn>
                            <MDBBtn className="delete" onClick={()=>deleteData(el.id)}><MDBIcon icon="trash-alt" /></MDBBtn>
                        </div>
                        <MDBCardTitle className="mt-3">{el.title}</MDBCardTitle>
                        <MDBCardText>
                        {el.text}
                        </MDBCardText>

                    </MDBCardBody>
                    </MDBCard>
                ))
            }
            </div>
        </>
    )
}


const mapStateToProps = state => {
    return {
        user :state.auth.user,
    }
}

export default connect(mapStateToProps)(Profile);
