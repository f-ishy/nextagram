import React, { useEffect } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";

import Loading from "./components/Loading";
import { getCurrentUser } from "./actions";
import { Landing } from "./pages/Landing";
import AuthPages from "./pages/AuthPages";

const App = ({ getCurrentUser, currentUser }) => {
	useEffect(() => {
		getCurrentUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const Layout = styled.div`
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow-y: auto;
	`;

	return (
		<Layout>
			{currentUser.status === "pending" && <Loading />}
			{currentUser.status === "success" && <AuthPages />}
			{(currentUser.status === "error" || !currentUser.status) && <Landing />}
		</Layout>
	);
};

const mapStateToProps = ({ currentUser }) => ({ currentUser });

const mapDispatchToProps = (dispatch) => ({
	getCurrentUser: () => dispatch(getCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
