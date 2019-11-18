import { combineReducers } from 'redux';
import acReducer from './autocomplete/reducers';
import contentReduser from './content/reducers';

export default combineReducers({
  autocomplete: acReducer,
  content: contentReduser
});
