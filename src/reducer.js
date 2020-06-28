const { GET_CURRENT_USER, REMOVE_CURRENT_USER } = require("./actions");

/* 
  shape of currentUser state = {
    email: String, 
    id: Int, 
    profile_picture: String, 
    username: String
  } 
*/

const initialState = {
  email: "",
  id: null,
  profile_picture: "",
  username: ""
}


function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {...state, ...action.user}
    case REMOVE_CURRENT_USER:
      return {...initialState}
    default:
      return state
  }
}

export default currentUserReducer;