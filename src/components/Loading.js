import React from "react";
import Lottie from "react-lottie";
import freeTime from "../lotties/freeTime.json";

class Loading extends React.Component {
	defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: freeTime,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	render() {
		return (
			<div style={{ flexGrow: "1" }}>
				<div
					style={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
						alignItems: "center",
					}}
				>
					<Lottie options={this.defaultOptions} height={400} width={400} />
					<p>
						If the cat can't stop spinning, please{" "}
						<a
							href="https://insta.nextacademy.com/api/v1/users/"
							target="_blank"
							rel="noopener noreferrer"
						>
							click here
						</a>{" "}
						and enable the certificate!
					</p>
				</div>
			</div>
		);
	}
}

export default Loading;
