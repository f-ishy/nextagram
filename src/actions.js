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
					dispatch(getCurrentUserSuccess(res));
				})
				.catch((err) => {
					dispatch(getCurrentUserError(err));
				});
		}
	};
}
