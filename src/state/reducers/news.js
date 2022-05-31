import {
  SET_NEWS_LOADING,
  SET_NEWS,
  ADD_NEWS,
  CLEAR_NEWS,
  TOP_NEWS_ERROR,
  SET_SOURCE_LOADING,
  GET_NEWS_SOURCE,
  NEWS_SOURCE_ERROR,
} from "../actions/types";

const initialState = {
  newsLoading: false,
  newsSourceLoading: false,
  newsSource: [],
  newsItems: [],
  newsItemsTotal: null,
  pageSize: 2,
  newsSourceError: false,
  topNewsError: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_NEWS_LOADING:
      return {
        ...state,
        newsLoading: true,
      };
    case SET_NEWS:
      console.log("state", state.newsItems);
      console.log("payload", payload.articles);
      return {
        ...state,
        topNewsError: false,
        newsItems: [...payload.articles],
        newsItemsTotal: payload.totalResults,
        newsLoading: false,
      };
    case ADD_NEWS:
      console.log("state", state.newsItems);
      console.log("payload", payload.articles);
      return {
        ...state,
        topNewsError: false,
        newsItems: [...state.newsItems, ...payload.articles],
        newsItemsTotal: payload.totalResults,
        newsLoading: false,
      };
    case CLEAR_NEWS:
      return {
        ...state,
        newsItems: [],
        newsItemsTotal: null,
      };
    case TOP_NEWS_ERROR:
      return {
        ...state,
        newsItems: [],
        newsLoading: false,
        newsItemsTotal: 0,
        topNewsError: true,
      };
    case SET_SOURCE_LOADING:
      return {
        ...state,
        newsSourceLoading: true,
      };
    case GET_NEWS_SOURCE:
      return {
        ...state,
        newsSourceError: false,
        newsSourceLoading: false,
        newsSource: payload,
      };
    case NEWS_SOURCE_ERROR:
      return {
        ...state,
        newsSourceLoading: false,
        newsSource: [],
        newsSourceError: true,
      };
    default:
      return state;
  }
};
