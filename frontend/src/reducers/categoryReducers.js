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
  CATEGORY_CREATE_RESET,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_RESET,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORYSUB_GET_REQUEST,
  CATEGORYSUB_GET_SUCCESS,
  CATEGORYSUB_GET_FAIL,
} from '../constants/categoryConstants';
export const categoriesListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORIES_GET_REQUEST:
      return {
        loading: true,
        categories: [],
      };
    case CATEGORIES_GET_SUCCESS:
      return {
        loading: false,
        success: true,
        categories: action.payload,
      };
    case CATEGORIES_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getCategoryReducer = (
  state = { category: { products: [] } },
  action
) => {
  switch (action.type) {
    case CATEGORY_GET_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_GET_SUCCESS:
      return { loading: false, category: action.payload };
    case CATEGORY_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const getCategorySubsReducer = (state = { subs: [] }, action) => {
  switch (action.type) {
    case CATEGORYSUB_GET_REQUEST:
      return {
        loading: true,
        subs: [],
      };
    case CATEGORYSUB_GET_SUCCESS:
      return {
        loading: false,
        success: true,
        subs: action.payload,
      };
    case CATEGORYSUB_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const CreateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        category: action.payload,
      };
    case CATEGORY_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CATEGORY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const UpdateCategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        category: action.payload,
      };
    case CATEGORY_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CATEGORY_UPDATE_RESET:
      return { category: {} };
    default:
      return state;
  }
};
export const RemoveCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
