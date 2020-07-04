import { combineReducers } from "redux";

const {
	GET_CURRENT_USER_BEGIN,
	REMOVE_CURRENT_USER,
	GET_CURRENT_USER_SUCCESS,
	GET_CURRENT_USER_ERROR,
	SET_CURRENT_USER,
} = require("./actions");

/* 
  shape of currentUser state = {
    email: String, 
    id: Int, 
    profile_picture: String, 
    username: String
  } 
*/

const initialState = {
	status: "",
	error: "",
	email: "",
	id: null,
	profile_picture: "",
	username: "",
};

function currentUserReducer(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return { ...state, status: "fulfilled", ...action.user };
		case GET_CURRENT_USER_BEGIN:
			return { ...state, status: "pending" };
		case GET_CURRENT_USER_SUCCESS:
			return { ...state, status: "fulfilled", ...action.user };
		case GET_CURRENT_USER_ERROR:
			return { ...state, status: "error", error: action.error };
		case REMOVE_CURRENT_USER:
			return { ...initialState };
		default:
			return state;
	}
}

export default combineReducers({ currentUser: currentUserReducer });
