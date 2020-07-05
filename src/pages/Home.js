import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Loading from "../components/Loading";
import UserCards from "../components/UserCards";
import { connect } from "react-redux";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<>
				<ul style={{ padding: "0" }}>
					{this.props.users.map((user) => (
						<UserCards user={user} key={user.id} />
					))}
				</ul>
			</>
		);
	}
}

const mapStateToProps = ({ userList }) => ({
	userList,
});

export default connect(mapStateToProps)(Home);
