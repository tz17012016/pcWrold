import axios from 'axios';
import {
  CATEGORIES_GET_REQUEST,
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_GET_FAIL,
  CATEGORY_GET_REQUEST,
  CATEGORY_GET_SUCCESS,
  CATEGORY_GET_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORYSUB_GET_REQUEST,
  CATEGORYSUB_GET_SUCCESS,
  CATEGORYSUB_GET_FAIL,
} from '../constants/categoryConstants';
import { logout } from './userActions';

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORIES_GET_REQUEST });
    const { data } = await axios.get(`/api/categories`);
    dispatch({ type: CATEGORIES_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CATEGORIES_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getCategory = (slug) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_GET_REQUEST });
    const { data } = await axios.get(`/api/categories/category/${slug}`);
    dispatch({ type: CATEGORY_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CATEGORY_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCategory = (category) => async (dispatch, getState) => {
  console.log(category);
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/categories/category`,
      category,
      config
    );
    console.log(data);
    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response);
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: message,
    });
  }
};
export const updateCategory =
  (slug, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CATEGORY_UPDATE_REQUEST,
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

      const { data } = await axios.put(
        `/api/categories/category/${slug}`,
        category,
        config
      );
      console.log(data);
      dispatch({
        type: CATEGORY_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error.response);
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: CATEGORY_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const removeCategory = (slug) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/categories/category/${slug}`, config);

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
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
      type: CATEGORY_DELETE_FAIL,
      payload: message,
    });
  }
};
export const getCategorySubs = (_id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORYSUB_GET_REQUEST });
    const { data } = await axios.get(`/api/categories/category/subs/${_id}`);
    dispatch({ type: CATEGORYSUB_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CATEGORYSUB_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
