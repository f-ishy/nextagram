import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import UserProfilePage from "./pages/UserProfilePage";
import NavBar from "./containers/NavBar";
import Loading from "./components/Loading";
import MyProfilePage from "./pages/MyProfilePage";
import PictureDisplay from "./components/PictureDisplay";
import { connect } from "react-redux";
import { getCurrentUser } from "./actions";
import { Landing } from "./pages/Landing";

const App = ({ getCurrentUser, currentUser }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getCurrentUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		axios
			.get(`https://insta.nextacademy.com/api/v1/users/`)
			.then((response) => {
				setUsers(response.data.filter((_, index) => index < 10));
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const Layout = styled.div`
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow-y: auto;
	`;

	/* 
		1. Check if there is an existing session (show loading cat)
		2. If session exists, show usual page
		3. If session does not exist, show sign up form
	*/

	return (
		<Layout>
			{currentUser.status === "pending" && <Loading />}
			{currentUser.status === "fulfilled" && (
				<>
					{isLoading ? (
						<Loading />
					) : (
						<>
							<NavBar />
							<Switch>
								<Route
									exact
									path="/"
									render={(props) => <Home {...props} users={users} />} //it takes the required Route props and adds in users and isLoading from this class' state
								/>
								<Route
									exact
									path="/users/:id"
									render={(props) =>
										users.length > 0 ? (
											<UserProfilePage
												{...props}
												user={users.find(
													(u) => u.id === parseInt(props.match.params.id),
												)}
											/>
										) : null
									}
								/>
								<Route
									exact
									path="/profile"
									render={(props) => <MyProfilePage {...props} />}
								/>
								<Route
									exact
									path="/image"
									render={(props) => <PictureDisplay {...props} />}
								/>
							</Switch>
						</>
					)}
				</>
			)}
			{(currentUser.status === "error" || !currentUser.status) && <Landing />}
		</Layout>
	);
};

const mapStateToProps = ({ currentUser }) => ({ currentUser });

const mapDispatchToProps = (dispatch) => ({
	getCurrentUser: () => dispatch(getCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
