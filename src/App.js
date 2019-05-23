import React, {Component} from 'react';
import { Route,Switch} from "react-router-dom";
import NavBar from './containers/NavBar';
import Loading from './components/loading'


import './App.css';
import axios from 'axios';
import Home from './pages/home';
import UserProfilePage from './pages/UserProfilePage';

import 'bootstrap/dist/css/bootstrap.css';
import MyProfilePage from './pages/MyProfilePage';
import PictureDisplay from './components/PictureDisplay';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading : true,
      users: [],
    }
  }

  componentDidMount(){
    axios.get(`https://insta.nextacademy.com/api/v1/users/`)
      .then((response) => {
        this.setState({users : response.data, isLoading : false})
      })
      .catch((error) => {
        console.log(error);
      })
  }


  render(){
    const {users} = this.state;
    return (
      <> 
        <NavBar/>
        {this.state.isLoading 
        ? <Loading/>
        : null}
        <Switch>
          <Route
            exact path="/"
            render={props => <Home {...props} users={users}/>} //it takes the required Route props and adds in users and isLoading from this class' state
          />
          <Route 
            exact path='/users/:id' 
            render={props => this.state.users.length > 0 ? <UserProfilePage {...props} user={users.find(u => u.id === parseInt(props.match.params.id))}/> : null} 
          />
          <Route 
            exact path='/profile' 
            render={props => <MyProfilePage {...props}/>} 
          />
          <Route
            exact path='/image'
            render={props => <PictureDisplay {...props}/>}
          />
        </Switch>
      </>
    )
  }
}