import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
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
import { PurpleButton, GreyButton } from "../components/Buttons";

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
					setCurrentModal("");
          setCurrentUser(res.user);
					history.push("/");
					localStorage.setItem("JWT", res.auth_token);
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
									<GreyButton>Logging in</GreyButton>
								) : (
									<PurpleButton type="submit">
										Log in
									</PurpleButton>
								)}{" "}
								<GreyButton color="secondary" onClick={() => setCurrentModal("")}>
									Cancel
								</GreyButton>
							</div>
						</ModalFooter>
					</Form>
				</ModalBody>
			</Modal>
		</>
	);
};

export default connect(null, { setCurrentUser })(LoginModal);
