import React, {Component} from "react";
import UserImages from '../containers/UserImages';
import {Container} from 'reactstrap';
import styled from "styled-components";

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  width: 80%;
`


export default class UserProfilePage extends Component {

  render() {    
    return (
      <>
        <StyledContainer>
            <img src={this.props.user.profileImage} width="150px" height="150px" style={{objectFit:"cover", borderRadius: "50%"}} alt=""/>
            <h1>Profile page of {this.props.user.username}</h1>
            <hr />
          <div style={{margin:'auto'}}>
            <UserImages user_id={this.props.match.params.id} height="300px" width="300px"/>
          </div>
        </StyledContainer>
      </>
    )
  }
}