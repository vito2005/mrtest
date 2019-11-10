import { CHANGE_SEARCH_TEXT, SHOW_SUGGESTIONS, HIDE_SUGGESTIONS } from './actions';

const defaultState = {
  searchText: '',
  suggestions: [],
  items: []
};


export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload
      };
    case SHOW_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.payload
      };
    case HIDE_SUGGESTIONS:
      return {
        ...state,
        suggestions: defaultState.suggestions
      };
    default:
      return state;
  }
};
