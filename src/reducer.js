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
	GET_USER_IMAGES_BEGIN,
	GET_USER_IMAGES_SUCCESS,
	GET_USER_IMAGES_ERROR,
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
{
	status: ""
	users: 
		[
			{
				id: int,
				username: String,
				profileImage: String

				// for the actions involving their images:
				imageLoadStatus: String
				images: [String]
			}
		]
} */

function userListReducer(state = { status: "", users: [] }, action) {
	const currentUser = action.id && {
		...state.users.find((user) => user.id === action.id),
	};
	const userIndex = state.users.findIndex((user) => user.id === action.id);

	switch (action.type) {
		case GET_USER_LIST_BEGIN:
			return { ...state, status: "pending" };
		case GET_USER_LIST_SUCCESS:
			// TODO: add logic here to compare users and only change state if user list is different
			return { ...state, status: "success", users: action.users };
		case GET_USER_LIST_ERROR:
			return { ...state, status: "error", error: action.error };
		case GET_USER_IMAGES_BEGIN:
			currentUser.imageLoadStatus = "pending";
			return {
				...state,
				users: updateUsersArray(userIndex, [...state.users], currentUser),
			};
		case GET_USER_IMAGES_SUCCESS:
			currentUser.images = action.images;
			currentUser.imageLoadStatus = "success";
			return {
				...state,
				users: updateUsersArray(userIndex, state.users, currentUser),
			};
		case GET_USER_IMAGES_ERROR:
			currentUser.imageLoadStatus = "error";
			return {
				...state,
				users: updateUsersArray(userIndex, state.users, currentUser),
			};
		default:
			return state;
	}
}

const updateUsersArray = (index, users, userToUpdate) => {
	if (index >= 0) {
		return [...users.slice(0, index), userToUpdate, ...users.slice(index + 1)];
	} else {
		return [...users];
	}
};

export default combineReducers({
	currentUser: currentUserReducer,
	userList: userListReducer,
});
