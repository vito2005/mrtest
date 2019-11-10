import { loadData } from '../api';

export const LOAD_DATA = 'LOAD_DATA';
export const DATA_EMPTY = 'DATA_EMPTY';
export const DATA_SUCCESS = 'DATA_SUCCESS';
export const DATA_NOT_FOUND = 'DATA_NOT_FOUND';
export const DATA_ERROR = 'DATA_ERROR';

export const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';

export const setCurrentPage = (value) => ({
  type: CHANGE_CURRENT_PAGE,
  payload: value
});

export const getData = async (dispatch, value, loadData) => {
  dispatch({ type: DATA_EMPTY, payload: true }); // clear results
  dispatch({ type: LOAD_DATA, payload: true });
  try {
    const cities = await loadData(value);
    const isDataEmpty = cities.length === 0;
    if (isDataEmpty) dispatch({ type: DATA_NOT_FOUND, payload: 'Не найдено ни одного места с кладом!' });
    else {
      dispatch({
        type: DATA_SUCCESS,
        payload: cities
      });
    }
    dispatch({ type: LOAD_DATA, payload: false });
  } catch (error) {
    console.error((error.message));
    dispatch({ type: DATA_ERROR });
  }
};

export const getDataInjector = (value) => (dispatch) => getData(dispatch, value, loadData);
