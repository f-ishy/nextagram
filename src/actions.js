export const GET_CURRENT_USER_BEGIN = "GET_CURRENT_USER_BEGIN";
export const GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS";
export const GET_CURRENT_USER_ERROR = "GET_CURRENT_USER_ERROR";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

function getCurrentUserBegin() {
	return { type: GET_CURRENT_USER_BEGIN };
}

function getCurrentUserSuccess(user) {
	return { type: GET_CURRENT_USER_SUCCESS, user };
}

function getCurrentUserError(error) {
	return { type: GET_CURRENT_USER_ERROR, error };
}

export function setCurrentUser(user) {
	return { type: SET_CURRENT_USER, user };
}

export function removeCurrentUser() {
	return { type: REMOVE_CURRENT_USER };
}

export function getCurrentUser() {
	return (dispatch) => {
		const JWT = localStorage.JWT;
		if (JWT) {
			dispatch(getCurrentUserBegin());
			return fetch("https://insta.nextacademy.com/api/v1/users/me", {
				headers: {
					Authorization: `Bearer ${JWT}`,
				},
				method: "get",
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.status === "failed") {
						dispatch(getCurrentUserError(res.message));
					} else {
						dispatch(getCurrentUserSuccess(res));
					}
				})
				.catch((err) => {
					console.log(err);
					dispatch(getCurrentUserError(err));
				});
		}
	};
}

/* Actions to get user list */

export const GET_USER_LIST_BEGIN = "GET_USER_LIST_BEGIN";
export const GET_USER_LIST_SUCCESS = "GET_USER_LIST_SUCCESS";
export const GET_USER_LIST_ERROR = "GET_USER_LIST_ERROR";

function getUserListBegin() {
	return { type: GET_USER_LIST_BEGIN };
}

function getUserListSuccess(users) {
	return { type: GET_USER_LIST_SUCCESS, users };
}

function getUserListError(error) {
	return { type: GET_USER_LIST_ERROR, error };
}

export function getUserList() {
	return (dispatch) => {
		dispatch(getUserListBegin());
		return fetch("https://insta.nextacademy.com/api/v1/users", {
			method: "get",
			redirect: "follow",
		})
			.then((res) => res.json())
			.then((users) => {
				dispatch(getUserListSuccess(users));
			})
			.catch((err) => {
				console.log(err);
				dispatch(getUserListError(err));
			});
	};
}
