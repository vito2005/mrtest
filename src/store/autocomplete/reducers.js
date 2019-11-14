import {
  CHANGE_SEARCH_TEXT, SHOW_SUGGESTIONS,
  HIDE_SUGGESTIONS, SET_ACTIVE_SUGGESTION,
  CLEAR_ACTIVE_SUGGESTION
} from './actions';

const defaultState = {
  searchText: '',
  suggestions: null
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
    case SET_ACTIVE_SUGGESTION:
      return {
        ...state,
        suggestions: state.suggestions.map((s, i) => (i === action.index ? { ...s, active: true } : s))
      };
    case CLEAR_ACTIVE_SUGGESTION:
      return {
        ...state,
        suggestions: state.suggestions.map((s) => ({ ...s, active: false }))
      };
    default:
      return state;
  }
};
