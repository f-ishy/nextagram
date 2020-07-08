import styled from "styled-components";

const { Button } = require("reactstrap");

export const GreenButton = styled(Button)`
	background-color: ${({ theme }) => theme.colors.green};
	border-color: ${({ theme }) => theme.colors.green};
	color: ${({ theme }) => theme.colors.white};
	:hover {
		background-color: ${({ theme }) => theme.colors.lightGreen};
		border-color: ${({ theme }) => theme.colors.lightGreen};
	}
`;

export const PurpleButton = styled(Button)`
	background-color: ${({ theme }) => theme.colors.purple};
	border-color: ${({ theme }) => theme.colors.purple};
	:hover, :focus {
		border-color: ${({ theme }) => theme.colors.lightPurple} !important;
		background-color: ${({ theme }) => theme.colors.lightPurple} !important;
	}
`;

export const RedButton = styled(Button)`
	background-color: ${({ theme }) => theme.colors.red};
	border-color: ${({ theme }) => theme.colors.red};
	:hover, :focus {
		border-color: ${({ theme }) => theme.colors.lightRed} !important;
		background-color: ${({ theme }) => theme.colors.lightRed} !important;
  }
`;

export const GreyButton = styled(Button)`
	background-color: ${({ theme }) => theme.colors.darkGrey};
	border-color: ${({ theme }) => theme.colors.darkGrey};
	:hover, :focus {
		border-color: ${({ theme }) => theme.colors.lightGrey} !important;
		background-color: ${({ theme }) => theme.colors.lightGrey} !important;
  }
`;
