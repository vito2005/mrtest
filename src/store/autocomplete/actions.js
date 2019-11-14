import { loadSuggestions } from '../../api/index';

export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';
export const SHOW_SUGGESTIONS = 'SHOW_SUGGESTIONS';
export const HIDE_SUGGESTIONS = 'HIDE_SUGGESTIONS';
export const SELECT_SUGGESTION = 'SELECT_SUGGESTION';
export const SET_ACTIVE_SUGGESTION = 'SET_ACTIVE_SUGGESTION';
export const CLEAR_ACTIVE_SUGGESTION = 'CLEAR_ACTIVE_SUGGESTION';

export const setSearchText = (value) => ({
  type: CHANGE_SEARCH_TEXT,
  payload: value
});

export const showSuggestions = (value) => ({
  type: SHOW_SUGGESTIONS,
  payload: value
});

export const hideSuggestions = () => ({
  type: HIDE_SUGGESTIONS
});

export const selectSuggestions = (value) => ({
  type: SELECT_SUGGESTION,
  payload: value
});

export const setActiveSuggestion = (index) => ({
  type: SET_ACTIVE_SUGGESTION,
  index
});
export const clearActiveSuggestion = () => ({
  type: CLEAR_ACTIVE_SUGGESTION
});

export const getSuggestions = async (dispatch, value, loadSuggestions) => {
  try {
    const cities = await loadSuggestions(value);
    const isDataEmpty = cities.length === 0;
    if (cities.length > 9) cities.splice(10, cities.length); // check length of result
    if (isDataEmpty) dispatch({ type: HIDE_SUGGESTIONS });
    else {
      dispatch({
        type: SHOW_SUGGESTIONS,
        payload: cities.map((c) => ({ ...c, active: !!c.active }))
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getSuggestionsInjector = (value) => (dispatch) => getSuggestions(dispatch, value, loadSuggestions);
