import React from 'react'
import {
  Card, CardBody,
  CardTitle, Container, Button
} from 'reactstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserImages from '../containers/UserImages';

const ProfilePic = styled.img`
  border: 2px solid black;
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin: 1em;
`;

const FlexedTitle = styled(CardTitle)`
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  ${Button} {
    height: 100%;
  }
`;

const UserCard = styled(Card)`
  border-width: 2px;
  border-style: inset;
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

export default function UserCards({ user }) {
  return (
    <Container>
      <UserCard>
        <CardBody>
          <FlexedTitle>
            <Link to={`/users/${user.id}`}>
              <ProfilePic src={user.profileImage} alt={user.username} />
              <span>{user.username}</span>
            </Link>
            <Button color="primary">Follow</Button>
          </FlexedTitle>
          <UserImages user_id={user.id} height='150px' width='210px' />
        </CardBody>
      </UserCard>
    </Container>
  )
}
