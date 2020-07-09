import React from "react";
import { Card, CardTitle, Col, Row } from "reactstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";

import UserImages from "../containers/UserImages";

const UserCardContainer = styled(Row)`
	margin: unset;
`;

const UserCard = styled(Card)`
	border-width: 2px;
	border-style: inset;
	margin-bottom: 1rem;
	background-color: rgba(255, 255, 255, 0.13);

	@media (max-width: 576px) {
		background-color: unset;
		border-style: unset;
		border-width: unset;
	}
`;

const ProfilePic = styled.img`
	border: 1px solid ${({ theme }) => theme.colors.darkGrey};
	width: 80px;
	height: 80px;
	object-fit: cover;
	border-radius: 50%;
	margin-right: 1em;
`;

const FlexedTitle = styled(CardTitle)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0;
	padding: 1em;
`;

export default function UserCards({ user }) {
	return (
		<UserCardContainer>
			<Col md={{ size: 6, offset: 3 }} sm={{size: 8, offset: 2}}>
				<UserCard>
					<FlexedTitle>
						<Link to={`/users/${user.id}`}>
							<ProfilePic src={user.profileImage} alt={user.username} />
							<span>{user.username}</span>
						</Link>
						{/* <PurpleButton>Follow</PurpleButton> */}
					</FlexedTitle>
					<UserImages user_id={user.id} height="150px" width="210px" />
				</UserCard>
			</Col>
		</UserCardContainer>
	);
}
