import { combineReducers } from "redux";

const {
	GET_CURRENT_USER_BEGIN,
	REMOVE_CURRENT_USER,
	GET_CURRENT_USER_SUCCESS,
	GET_CURRENT_USER_ERROR,
	SET_CURRENT_USER,
	GET_USER_LIST_BEGIN,
	GET_USER_LIST_SUCCESS,
	GET_USER_LIST_ERROR,
} = require("./actions");

/* Reducer for current logged in user */

const initialUserState = {
	status: "",
	error: "",
	email: "",
	id: null,
	profile_picture: "",
	username: "",
};

function currentUserReducer(state = initialUserState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return { ...state, status: "success", ...action.user };
		case GET_CURRENT_USER_BEGIN:
			return { ...state, status: "pending" };
		case GET_CURRENT_USER_SUCCESS:
			return { ...state, status: "success", ...action.user };
		case GET_CURRENT_USER_ERROR:
			return { ...state, status: "error", error: action.error };
		case REMOVE_CURRENT_USER:
			return { ...initialUserState };
		default:
			return state;
	}
}

/* Reducer for user list */
/* User list shape:
[
	{
		id: int,
		username: String,
		profileImage: String

		// for the actions involving their images:
		images: [String]
	}
] */

function userListReducer(state = {status: "" , users: []}, action) {
	switch (action.type) {
		case GET_USER_LIST_BEGIN:
			return { ...state, status: "pending" };
		case GET_USER_LIST_SUCCESS:
			// TODO: add logic here to compare users and only change state if user list is different
			return { ...state, status: "success", users: action.users };
		case GET_USER_LIST_ERROR:
			return { ...state, status: "error", error: action.error };
		default:
			return state;
	}
}

export default combineReducers({ currentUser: currentUserReducer, userList: userListReducer });
