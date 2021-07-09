import { SWITCH_THEME } from '../constants/themeConstants';

export const switchTheme = (theme) => (dispatch) => {
  dispatch({
    type: SWITCH_THEME,
    theme: theme,
  });
};
