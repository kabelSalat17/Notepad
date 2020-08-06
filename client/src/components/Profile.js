import React, { useEffect }  from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon} from 'mdbreact';
import axios from 'axios';
import Navbar from './Navbar'
import {connect} from 'react-redux'

const Profile = ({user,setData, pending, data, token, setPending, success}) => {
    const tkn= token
    const loadData =  async () => {
        setPending()
        await axios.get('http://127.0.0.1:8000/api/auth/notes', {
            params: {
                token : tkn
            }
        })
        .then(res => setData(res.data))
        success()
    }
    useEffect( () => {
        loadData()
    }, [tkn, pending]);

    const deleteData = (element) => {
        axios.delete('http://127.0.0.1:8000/api/auth/notes/' + element, {
            params: {
                token : tkn
            }
        })
        .then(()=>loadData())
    }
    const dataArray = data
    return (
        <>
            <Navbar />
            
            <div className="welcome-container">
                <h3 className="animated bounceInLeft slower">Welcome, {user.name}!</h3> 
            </div>
            <div className="mt-5 d-flex justify-content-center flex-wrap">
            {
                dataArray.map( el => (
                    <MDBCard style={{ width: "22rem", minHeight:"22em", margin:"1.5em 1.5em" }} className="animated FadeInUp slower" key={el.id}>
                    <MDBCardBody>
                        <div className="d-flex justify-content-end align-items-baseline icons-container">
                            <MDBBtn className="edit" href={"/profile/note/" + el.id}><MDBIcon icon="edit" /></MDBBtn>
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
        data:state.auth.data,
        token:state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setData : (data) => dispatch({
            type : "SET_DATA",
            payload: data
        }),
        setPending : () => dispatch({
            type : "SET_PENDING"
        }),
        success : () => dispatch({
            type : "SUCCESS"
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
