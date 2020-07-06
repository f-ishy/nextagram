import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "reactstrap";
import ImagePreviewer from "./ImagePreviewer";
import { getUserImages } from "../actions";
import { connect } from "react-redux";

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
			<Grid>
				{Array.isArray(images) &&
					images.length > 0 &&
					images.map((image, index) => (
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
				{Array.isArray(images) &&
					images.length === 0 &&
					"This user has no images! :((("}
				{!images && "Loading"}
			</Grid>
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
