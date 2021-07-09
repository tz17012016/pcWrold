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
  SUB_CREATE_RESET,
  SUB_UPDATE_REQUEST,
  SUB_UPDATE_SUCCESS,
  SUB_UPDATE_FAIL,
  SUB_UPDATE_RESET,
  SUB_DELETE_REQUEST,
  SUB_DELETE_SUCCESS,
  SUB_DELETE_FAIL,
} from '../constants/subConstants';
export const subsListReducer = (state = { subs: [] }, action) => {
  switch (action.type) {
    case SUBS_GET_REQUEST:
      return {
        loading: true,
        subs: [],
      };
    case SUBS_GET_SUCCESS:
      return {
        loading: false,
        success: true,
        subs: action.payload,
      };
    case SUBS_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSubReducer = (state = { sub: { products: [] } }, action) => {
  switch (action.type) {
    case SUB_GET_REQUEST:
      return { ...state, loading: true };
    case SUB_GET_SUCCESS:
      return { loading: false, sub: action.payload };
    case SUB_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const CreateSubReducer = (state = {}, action) => {
  switch (action.type) {
    case SUB_CREATE_REQUEST:
      return {
        loading: true,
      };
    case SUB_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        sub: action.payload,
      };
    case SUB_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SUB_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const UpdateSubReducer = (state = { sub: {} }, action) => {
  switch (action.type) {
    case SUB_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case SUB_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        sub: action.payload,
      };
    case SUB_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SUB_UPDATE_RESET:
      return { sub: {} };
    default:
      return state;
  }
};
export const RemoveSubReducer = (state = {}, action) => {
  switch (action.type) {
    case SUB_DELETE_REQUEST:
      return { loading: true };
    case SUB_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SUB_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
