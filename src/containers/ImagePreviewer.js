import React from "react";
import styled from "styled-components";
import { likeImage } from "../utils/LikeImage";

const ImagePreviewContainer = styled.div`
	::before {
		background-color: inherit;
    content: "";
	}
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 99999;
	background-color: rgba(0, 0, 0, 0.5);
	height: 100vh;
	width: 100vw;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SelectedImage = styled.img`
	max-height: 80vh;
	max-width: 80vw;
	cursor: pointer;
`;

const ImagePreviewer = ({ selectedImage, setSelectedImage }) => {
	return (
		<>
			{selectedImage && (
				<ImagePreviewContainer
					onClick={() => {
						setSelectedImage("");
					}}
				>
					<SelectedImage
						src={selectedImage.url}
						alt="current selected"
						onClick={(event) => event.stopPropagation()}
						onDoubleClick={() => {
							likeImage(selectedImage.id);
						}}
					/>
				</ImagePreviewContainer>
			)}
		</>
	);
};

export default ImagePreviewer;
