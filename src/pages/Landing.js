import React, { useState } from "react";
import styled from "styled-components";

import preview from "../images/preview.png";
import SignUpModal from "../containers/SignUpModal";
import LoginModal from "../containers/LoginModal";
import { PurpleButton } from "../components/Buttons";

const LandingContainer = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.black};
`;

const PreviewImg = styled.img`
	height: 80%;
	margin-right: 5rem;
	@media (max-width: 576px) {
		display: none;
	}
`;

const AuthBox = styled.div`
	background-color: ${({ theme }) => theme.colors.elevations[0]};
	text-align: center;
	height: 80vh;
	border: 1px solid ${({ theme }) => theme.colors.darkGrey};
	display: flex;
	flex-direction: column;
	padding: 2rem;
`;

const Branding = styled.p`
	font-family: "Grand Hotel", "Berlin Sans FB", cursive;
	font-size: 3rem;
`;

const Tagline = styled.p`
	margin-bottom: 5rem;
`;

const ButtonsContainer = styled.div`
	margin: auto unset;
`;

const ButtonSeparator = styled.div`
	display: flex;
	flex-direction: row;
	margin: 1rem 0;
	> div {
		margin: 0 1rem;
		height: 1px;
		flex-grow: 1;
		flex-shrink: 1;
		position: relative;
		top: 0.7rem;
		background-color: #777;
	}
`;

export const Landing = () => {
	const [currentModal, setCurrentModal] = useState("");
	return (
		<>
			<LandingContainer fluid>
				<PreviewImg src={preview} alt="iphone preview" />
				<AuthBox>
					<Branding>Nextagram</Branding>
					<Tagline>Sign up or log in to see your friends' photos!</Tagline>
					<ButtonsContainer>
						<PurpleButton onClick={() => setCurrentModal("login")}>
							Log in
						</PurpleButton>
						<ButtonSeparator>
							<div />
							OR
							<div />
						</ButtonSeparator>
						<PurpleButton
							color="primary"
							onClick={() => setCurrentModal("signup")}
						>
							Sign Up
						</PurpleButton>
					</ButtonsContainer>
				</AuthBox>
			</LandingContainer>
			<SignUpModal
				currentModal={currentModal}
				setCurrentModal={setCurrentModal}
			/>
			<LoginModal
				currentModal={currentModal}
				setCurrentModal={setCurrentModal}
			/>
		</>
	);
};
