import axios from "../../axios";

import {
  SET_NEWS_LOADING,
  SET_SOURCE_LOADING,
  GET_NEWS_SOURCE,
  NEWS_SOURCE_ERROR,
  TOP_NEWS_ERROR,
  SET_NEWS,
  ADD_NEWS,
  CLEAR_NEWS,
} from "./types";

//let newsApiKey = "40797288395247e6b6772ea3cf1c61f2";

// Set Source loading
export const setSourceLoading = () => {
  return {
    type: SET_SOURCE_LOADING,
  };
};

// Set News Loading
export const setNewsLoading = () => {
  return {
    type: SET_NEWS_LOADING,
  };
};

// Get News Source
export const getNewsSource = () => async (dispatch) => {
  dispatch(setSourceLoading());
  const user = JSON.parse(sessionStorage.getItem("user"));
  try {
    const newsSource = await axios.get(`sources?apiKey=${user.apiKey}`);
    if (newsSource) {
      dispatch({
        type: GET_NEWS_SOURCE,
        payload: newsSource.data.sources,
      });
    }
  } catch (error) {
    dispatch({
      type: NEWS_SOURCE_ERROR,
    });
  }
};

// Set Top News
export const setNews = (items) => async (dispatch) => {
  try {
    if (items) {
      dispatch({
        type: SET_NEWS,
        payload: items,
      });
    }
  } catch (error) {
    dispatch({
      type: TOP_NEWS_ERROR,
    });
  }
};

// Set Top News
export const addNews = (items) => async (dispatch) => {
  try {
    if (items) {
      dispatch({
        type: ADD_NEWS,
        payload: items,
      });
    }
  } catch (error) {
    dispatch({
      type: TOP_NEWS_ERROR,
    });
  }
};

export const getNews =
  ({ q, page, full }) =>
  async (dispatch, getState) => {
    dispatch(setNewsLoading());
    const user = JSON.parse(sessionStorage.getItem("user"));
    try {
      const { pageSize } = getState().news;
      const response = await axios.get(
        `top-headlines?country=us&q=${q ? q : ""}&apiKey=${user.apiKey}&page=${
          page ? page : "1"
        }${full ? "" : `&pageSize=${pageSize}`}`
      );
      if (response.status === 200 && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      return error;
    }
  };

//  Clear news
export const clearNews = () => {
  return {
    type: CLEAR_NEWS,
  };
};
