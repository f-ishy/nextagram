import React, { useEffect } from "react";
import styled from "styled-components";

const StyledImageContainer = styled.div`
	display: inline-block;
	height: ${({ height }) => height};
	cursor: pointer;

	@media (max-width: 500px) {
		height: 80px;
	}
`;

export const ImageContainer = ({ image, width, height, setSelectedImage }) => {
	useEffect(() => {
		fetch(image.url).then((res) => res.json()).then((res) => console.log(res));
	}, []);

	return (
		<StyledImageContainer
			onClick={() => setSelectedImage(image)}
			width={width}
			height={height}
		>
			Hi
		</StyledImageContainer>
	);
};
