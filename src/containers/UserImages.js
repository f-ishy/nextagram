import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "reactstrap";
import { connect } from "react-redux";

import ImagePreviewer from "./ImagePreviewer";
import { getUserImages } from "../actions";
import ellipsis from "../lotties/ellipsis.json";
import Lottie from "react-lottie";

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

	@media (max-width: 500px) {
		height: 80px;
	}
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 10px;
`;

function UserImages({ user_id, height, width, userList, getUserImages }) {
	const [selectedImage, setSelectedImage] = useState("");

	useEffect(() => {
		getUserImages(user_id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user_id]);

	const { images } = userList.users.find((user) => user.id === user_id);

	return (
		<Container className="d-flex justify-content-center">
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
								style={{ objectFit: "cover", padding: "10px" }}
							/>
						</ImageContainer>
					))}
				</Grid>
			)}
			{Array.isArray(images) && images.length === 0 && (
				<div style={{ margin: "2rem" }}>This user has no images! :(((</div>
			)}
			{!images && <Lottie options={defaultOptions} height={200} width={200} />}
		</Container>
	);
}

const mapStateToProps = ({ userList }) => {
	return { userList };
};

const mapDispatchToProps = (dispatch) => ({
	getUserImages: (id) => dispatch(getUserImages(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserImages);
