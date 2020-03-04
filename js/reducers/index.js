import { combineReducers } from 'redux';
import requests from './requests';
import modals from './modals';

export default combineReducers({
  requests,
  modals
});
