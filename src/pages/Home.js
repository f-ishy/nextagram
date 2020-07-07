import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import UserCards from "../components/UserCards";
import { connect } from "react-redux";

// Infinite scrolling provided by: https://www.pluralsight.com/guides/how-to-implement-infinite-scrolling-with-reactjs

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			length: 15,
			prevY: 0,
		};
	}

	getMoreUsers = () => {
		setTimeout(() => {
			if (this.state.length + 15 <= this.props.users.length) {
				this.setState({ length: this.state.length + 15 });
			} else {
				this.setState({ length: this.props.users.length });
			}
		}, 1500);
	};

	handleObserver(entities, observer) {
		const y = entities[0].boundingClientRect.y;
		if (this.state.prevY > y) {
			this.getMoreUsers();
		}
		this.setState({ prevY: y });
	}

	componentDidMount() {
		var options = {
			root: null,
			rootMargin: "0px",
			threshold: 1.0,
		};

		this.observer = new IntersectionObserver(
			this.handleObserver.bind(this),
			options,
		);
		this.observer.observe(this.loadingRef);
	}

	render() {
		const { users } = this.props;
		return (
			<>
				{users.slice(0, this.state.length).map((user) => (
					<UserCards user={user} key={user.id} />
				))}
				<div
					ref={(loadingRef) => (this.loadingRef = loadingRef)}
					style={{ textAlign: "center", height: "3rem" }}
				>
					Loading more pics!!!!
				</div>
			</>
		);
	}
}

const mapStateToProps = ({ userList }) => {
	return { users: userList.users };
};

export default connect(mapStateToProps)(Home);
