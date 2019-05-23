import React, {Component} from "react";
import UserImages from '../containers/userimages';
import {Container} from 'reactstrap';

export default class UserProfilePage extends Component {

  render() {    
    return (
      <>
        <Container className='d-flex text-center justify-content-center flex-column' style ={{width:'80%'}}>
          <div style={{borderBottom: '1px solid grey'}}>
            <img src={this.props.user.profileImage} width="150px" height="150px" style={{objectFit:"cover", borderRadius: "50%"}} alt=""/>
            <h1>Profile page of {this.props.user.username}</h1>
          </div>
          <div style={{margin:'auto'}}>
            <UserImages user_id={this.props.match.params.id} height="300px" width="300px"/>
          </div>
        </Container>
      </>
    )
  }
}