//Here All reducers combined into only one
import { combineReducers } from "redux";
import AuthReducer from './AuthReducer';

const Reducer = combineReducers({auth:AuthReducer})

export default Reducer