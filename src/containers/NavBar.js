import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useHistory } from "react-router-dom";
import {
	NavbarToggler,
	Collapse,
	Nav,
	NavItem,
	Navbar,
	Spinner,
} from "reactstrap";
import styled from "styled-components";
import { connect } from "react-redux";

import logo from "../images/logo.png";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { removeCurrentUser } from "../actions";
import { GreenButton, RedButton } from "../components/Buttons";

const StyledNavbar = styled(Navbar)`
	background-color: ${({ theme }) => theme.colors.violet};
	.navbar-toggler-icon {
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
	}
`;

const ProfilePicture = styled.img`
	border-radius: 5px;
`;

const NavBar = ({ currentUser, removeCurrentUser }) => {
	const [currentModal, setCurrentModal] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const history = useHistory();

	const logout = () => {
		setIsLoggingOut(true);
		setTimeout(() => {
			setCurrentModal("");
			setIsOpen(false);
			localStorage.clear();
			removeCurrentUser();
			history.push("/");
		}, 1500);
	};

	return (
		<>
			<StyledNavbar className="mb-3" expand="md">
				<Link to="/">
					<img
						src={logo}
						width="40px"
						style={{ marginLeft: "15px", marginRight: "15px" }}
						alt=""
					></img>
				</Link>
				<NavbarToggler onClick={() => setIsOpen((opened) => !opened)} />
				<Collapse isOpen={isOpen} navbar>
					{currentUser && currentUser.username ? (
						<Nav className="ml-auto" navbar style={{ alignItems: "center" }}>
							<NavItem>
								<Link to="/profile">
									<ProfilePicture
										src={currentUser.profile_picture}
										width="30px"
										height="30px"
										alt=""
									/>
								</Link>
							</NavItem>
							<NavItem>
								<RedButton
									onClick={isLoggingOut ? null : logout}
									style={{ margin: "10px" }}
								>
									<div>{isLoggingOut ? <Spinner size="sm" /> : "Logout"}</div>
								</RedButton>
							</NavItem>
						</Nav>
					) : (
						<Nav className="ml-auto" navbar style={{ alignItems: "center" }}>
							<NavItem>
								<GreenButton
									onClick={() => setCurrentModal("login")}
									style={{ margin: "10px" }}
								>
									Login
								</GreenButton>
							</NavItem>
						</Nav>
					)}
				</Collapse>
			</StyledNavbar>
			<LoginModal
				currentModal={currentModal}
				setCurrentModal={setCurrentModal}
			/>
			<SignUpModal
				currentModal={currentModal}
				setCurrentModal={setCurrentModal}
			/>
		</>
	);
};

const mapStateToProps = ({ currentUser }) => ({ currentUser });
const mapDispatchToProps = (dispatch) => {
	return {
		removeCurrentUser: () => dispatch(removeCurrentUser()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
