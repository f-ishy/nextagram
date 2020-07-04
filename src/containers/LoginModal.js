import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../actions";

const LoginModal = ({ currentModal, setCurrentModal, setCurrentUser }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [loginFailed, setLoginFailed] = useState(false);
	const history = useHistory();

	const handleSubmit = (event) => {
		event.preventDefault();
		setSubmitting(true);
		setLoginFailed(false);
		const data = { username: username, password: password };

		fetch("https://insta.nextacademy.com/api/v1/login", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "post",
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status === "failed") {
					console.log(res);
				} else {
					localStorage.setItem("JWT", res.auth_token);
					setCurrentUser(res.user);
					setCurrentModal("");
					history.push("/");
				}
			})
			.catch((err) => {
				setSubmitting(false);
				setLoginFailed(true);
				console.log(err);
			});
	};

	return (
		<>
			<Modal
				isOpen={currentModal === "login"}
				toggle={() => setCurrentModal("")}
			>
				<ModalHeader toggle={() => setCurrentModal("")}>Login</ModalHeader>
				<ModalBody>
					<Form onSubmit={handleSubmit}>
						<FormGroup>
							<Label for="username">Username</Label>
							<Input
								onChange={(e) => setUsername(e.target.value)}
								type="text"
								name="username"
								id="username"
								placeholder="username"
							/>
						</FormGroup>
						<FormGroup>
							<Label for="password">Password</Label>
							<Input
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								name="password"
								id="password"
								placeholder="password"
							/>
						</FormGroup>
						<small className="text-danger">
							{loginFailed
								? "Login failed, please check your username or password and try again."
								: ""}
						</small>
						<p>
							New member?{" "}
							<a href="/#" onClick={() => setCurrentModal("signup")}>
								Sign up here.
							</a>
						</p>
						<ModalFooter>
							<div>
								{submitting ? (
									<Button disabled>Logging in</Button>
								) : (
									<Button type="submit" color="primary">
										Log in
									</Button>
								)}{" "}
								<Button color="secondary" onClick={() => setCurrentModal("")}>
									Cancel
								</Button>
							</div>
						</ModalFooter>
					</Form>
				</ModalBody>
			</Modal>
		</>
	);
};

export default connect(null, { setCurrentUser })(LoginModal);
