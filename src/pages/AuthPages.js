import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import PictureDisplay from "../components/PictureDisplay";
import MyProfilePage from "./MyProfilePage";
import UserProfilePage from "./UserProfilePage";
import Home from "./Home";
import NavBar from "../containers/NavBar";
import { getUserList } from "../actions";
import Loading from "../components/Loading";

const AuthPages = ({ userList, getUserList }) => {
	useEffect(() => {
		getUserList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{userList.status === "pending" && <Loading />}
			{userList.status === "success" && (
				<>
					<NavBar />
					<Switch>
						<Route
							exact
							path="/"
							render={(props) => <Home {...props} users={userList.users} />}
						/>
						<Route
							exact
							path="/users/:id"
							render={(props) =>
								userList.users.length > 0 ? (
									<UserProfilePage
										{...props}
										user={userList.users.find(
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
			{userList.status === "error" && (
				<p>Oh no error for some reason! This is embarassing.</p>
			)}
		</>
	);
};

const mapStateToProps = ({ userList }) => {
	console.log(userList);
	return { userList };
};

const mapDispatchToProps = (dispatch) => ({
	getUserList: () => dispatch(getUserList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPages);
