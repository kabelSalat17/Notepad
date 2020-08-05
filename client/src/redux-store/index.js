//Store
import {createStore} from 'redux';
import Reducer from './reducers/Reducer'

//create store
const initialStates = {
    auth:{
        loggedIn:false,
        user:{},
    }
}
const store = createStore(
    Reducer, 
    initialStates,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

export default store