export const setVisibleTrue = () => async (dispatch) => {
  dispatch({
    type: 'SET_VISIBLE_TRUE',
    payload: { status: true },
  });
};
export const setVisibleFalse = () => async (dispatch) => {
  dispatch({
    type: 'SET_VISIBLE_FALSE',
    payload: { status: false },
  });
};
