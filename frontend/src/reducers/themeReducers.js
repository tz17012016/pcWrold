import { lightTheme } from '../themes';
import { SWITCH_THEME } from '../constants/themeConstants';

const themeReducer = (state = { theme: lightTheme }, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      return { theme: action.theme };

    default:
      return state;
  }
};
export default themeReducer;
