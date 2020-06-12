import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./pages/Home";
import UserProfilePage from "./pages/UserProfilePage";
import NavBar from "./containers/NavBar";
import Loading from "./components/Loading";
import MyProfilePage from "./pages/MyProfilePage";
import PictureDisplay from "./components/PictureDisplay";

const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios
			.get(`https://insta.nextacademy.com/api/v1/users/`)
			.then((response) => {
				setUsers(response.data.filter((res, index) => index < 10 ));
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<NavBar />
			{isLoading ? <Loading /> : null}
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
	);
};

export default App;
