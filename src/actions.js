export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER"

export function getCurrentUser(user) {
	return { type: GET_CURRENT_USER, user: user };
}

export function removeCurrentUser(user) {
	return { type: REMOVE_CURRENT_USER, user: user };
}