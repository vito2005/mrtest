import { combineReducers } from 'redux';
import acReducer from './autocomplete/reducers';

import {
  LOAD_DATA,
  DATA_EMPTY,
  DATA_SUCCESS,
  DATA_NOT_FOUND,
  CHANGE_CURRENT_PAGE
} from './actions';

const defaultState = {
  results: null,
  loading: null,
  currentPage: 1,
  resultsPerPage: 10,
  noResultsMessage: null
};


const contentReduser = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        loading: action.payload
      };
    case DATA_SUCCESS:
      return {
        ...state,
        results: action.payload
      };
    case DATA_EMPTY:
      return {
        ...state,
        results: []
      };
    case DATA_NOT_FOUND:
      return {
        ...state,
        results: [],
        noResultsMessage: action.payload
      };
    case CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  autocomplete: acReducer,
  content: contentReduser
});
