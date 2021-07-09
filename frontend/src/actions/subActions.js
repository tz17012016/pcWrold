import axios from 'axios';
import {
  SUBS_GET_REQUEST,
  SUBS_GET_SUCCESS,
  SUBS_GET_FAIL,
  SUB_GET_REQUEST,
  SUB_GET_SUCCESS,
  SUB_GET_FAIL,
  SUB_CREATE_REQUEST,
  SUB_CREATE_SUCCESS,
  SUB_CREATE_FAIL,
  SUB_UPDATE_REQUEST,
  SUB_UPDATE_SUCCESS,
  SUB_UPDATE_FAIL,
  SUB_DELETE_REQUEST,
  SUB_DELETE_SUCCESS,
  SUB_DELETE_FAIL,
} from '../constants/subConstants';
import { logout } from './userActions';

export const getSubs = () => async (dispatch) => {
  try {
    dispatch({ type: SUBS_GET_REQUEST });
    const { data } = await axios.get(`/api/subs`);
    dispatch({ type: SUBS_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUBS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getSub = (slug) => async (dispatch) => {
  try {
    dispatch({ type: SUB_GET_REQUEST });
    const { data } = await axios.get(`/api/subs/sub/${slug}`);
    dispatch({ type: SUB_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUB_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSub = (sub) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUB_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/subs/sub/`, sub, config);

    dispatch({
      type: SUB_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SUB_CREATE_FAIL,
      payload: message,
    });
  }
};
export const updateSub = (slug, sub) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUB_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/subs/sub/${slug}`, sub, config);

    dispatch({
      type: SUB_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SUB_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const removeSub = (slug) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUB_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/subs/sub/${slug}`, config);

    dispatch({
      type: SUB_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SUB_DELETE_FAIL,
      payload: message,
    });
  }
};
