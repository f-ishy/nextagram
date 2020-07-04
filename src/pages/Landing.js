import React, { useState } from "react";
import preview from "../images/preview.png";
import styled from "styled-components";
import { Button } from "reactstrap";
import SignUpModal from "../containers/SignUpModal";
import LoginModal from "../containers/LoginModal";

const LandingContainer = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
  background-color: #eee;
`;

const PreviewImg = styled.img`
	height: 80%;
  margin-right: 5rem;
  @media (max-width: 768px){
    display: none;
  }
`;

const AuthBox = styled.div`
  background-color: white;
	text-align: center;
	height: 80vh;
	border: 1px solid #777;
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	padding: 2rem;
`;

const Branding = styled.p`
	font-family: "Grand Hotel", "Berlin Sans FB", cursive;
	font-size: 3rem;
`;

const Tagline = styled.p`
	color: #777;
  margin-bottom: 5rem;
`;

const ButtonsContainer = styled.div`
  margin: auto unset;
`;

const ButtonSeparator = styled.div`
	display: flex;
	flex-direction: row;
  margin: 1rem 0;
  color: #777;
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
					<Button color="primary" onClick={() => setCurrentModal("login")}>
						Log in
					</Button>
					<ButtonSeparator>
						<div />
						OR
						<div />
					</ButtonSeparator>
					<Button color="primary" onClick={() => setCurrentModal("signup")}>
						Sign Up
					</Button>
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
