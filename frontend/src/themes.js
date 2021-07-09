import { createGlobalStyle } from 'styled-components';
export const lightTheme = {
  PRIMARY_BACKGROUND_COLOR: '#fff',
  fontColor: '#000',
};

export const darkTheme = {
  PRIMARY_BACKGROUND_COLOR: '#000',
  fontColor: '#fff',
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
	}
`;
