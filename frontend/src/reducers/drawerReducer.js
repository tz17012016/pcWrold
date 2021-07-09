export const drawerReducer = (state = { status: false }, action) => {
  switch (action.type) {
    case 'SET_VISIBLE_TRUE':
      return action.payload;
    case 'SET_VISIBLE_FALSE':
      return action.payload;
    default:
      return state;
  }
};
