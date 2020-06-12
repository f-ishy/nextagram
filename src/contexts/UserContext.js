import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'
// import { Redirect } from 'react-router-dom'

const UserContext = createContext(null)
const JWT = localStorage.getItem('JWT')

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // if JWT exists, get the username and profile pic and place in context
    if (JWT && currentUser === null) {
      console.log(JWT)
      axios({
        method: 'get',
        url: 'https://insta.nextacademy.com/api/v1/users/me',
        headers: { 'Authorization': `Bearer ${JWT}` }
      })
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          setCurrentUser('');
          console.log(err)
        })
    }
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
