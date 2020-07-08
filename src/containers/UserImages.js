import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import ImagePreviewer from "./ImagePreviewer";
import { getUserImages } from "../actions";
import ellipsis from "../lotties/ellipsis.json";
import Lottie from "react-lottie";
import { fadeImage } from "../styles/Keyframes";

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: ellipsis,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

const ImageContainer = styled.div`
	display: inline-block;
	height: ${({ height }) => height};
	cursor: pointer;
	margin: 1px;

	@media (max-width: 576px) {
		height: 100px;
	}

	@media (max-width: 420px) {
		height: 80px;
	}

	:hover {
		transition-duration: 0.5s;
		transition-property: filter;
		filter: brightness(50%);
	}
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	margin-bottom: 1rem;

	@media (max-width: 576px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
`;

function UserImages({ user_id, height, width, userList, getUserImages }) {
	const [selectedImage, setSelectedImage] = useState("");

	useEffect(() => {
		getUserImages(user_id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user_id]);

	const { images } = userList.users.find((user) => user.id === user_id);

	return (
		<>
			<ImagePreviewer
				selectedImage={selectedImage}
				setSelectedImage={setSelectedImage}
			/>
			{Array.isArray(images) && images.length > 0 && (
				<Grid>
					{images.map((image, index) => (
						<ImageContainer
							onClick={() => setSelectedImage(image)}
							key={index}
							width={width}
							height={height}
						>
							<img
								src={image.url}
								alt=""
								className="addhover"
								height="100%"
								width="100%"
								style={{ objectFit: "cover" }}
							/>
						</ImageContainer>
					))}
				</Grid>
			)}
			{Array.isArray(images) && images.length === 0 && (
				<div style={{ margin: "2rem" }}>This user has no images! :(((</div>
			)}
			{!images && <Lottie options={defaultOptions} height={200} width={200} />}
		</>
	);
}

const mapStateToProps = ({ userList }) => {
	return { userList };
};

const mapDispatchToProps = (dispatch) => ({
	getUserImages: (id) => dispatch(getUserImages(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserImages);
