import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { connect } from "react-redux";

import Loading from "./components/Loading";
import { getCurrentUser } from "./actions";
import { Landing } from "./pages/Landing";
import AuthPages from "./pages/AuthPages";
import theme from "./styles/theme";

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
		color: ${({ theme: { colors } }) => colors.white};
		background-color: ${({ theme }) => theme.colors.black};

		a {
			color: ${({ theme }) => theme.colors.lightGrey};
		}
	`;

	return (
		<ThemeProvider theme={theme}>
			<Layout>
				{currentUser.status === "pending" && <Loading />}
				{currentUser.status === "success" && <AuthPages />}
				{(currentUser.status === "error" || !currentUser.status) && <Landing />}
			</Layout>
		</ThemeProvider>
	);
};

const mapStateToProps = ({ currentUser }) => ({ currentUser });

const mapDispatchToProps = (dispatch) => ({
	getCurrentUser: () => dispatch(getCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
