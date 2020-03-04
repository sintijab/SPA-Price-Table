import {
  DATA_LOADED,
  DATA_FAILED,
  DATA_EMPTY,
  DATA_UPDATED,
} from '../constants/actions';
import { ERROR_TEXT } from '../constants/titles';

const requests = (state = [], action) => {
  switch (action.type) {
    case DATA_LOADED:
      return [
        {
          data: action.response,
          type: action.type,
          loading: false,
          error: false,
        },
      ];
    case DATA_FAILED:
      return [
        ...state,
        {
          data: null,
          type: action.type,
          loading: false,
          error: {
            message: ERROR_TEXT,
          },
        },
      ];
    case DATA_EMPTY:
      return [
        ...state,
        {
          data: null,
          type: action.type,
          loading: false,
          error: {
            message: ERROR_TEXT,
          },
        },
      ];
    case DATA_UPDATED:
      let initialState = state;
      if (initialState.length) {
        try {
          initialState = initialState[0].data;
          initialState.forEach((company, index) => {
            if (company.id === action.payload.idCompany) {
              initialState[index].budget = action.payload.newPrice;
            }
          });
        } catch(err) {
          console.error(err);
        }
      }
      return [
        {
          data: initialState,
          type: action.type,
          loading: false,
          error: false,
        },
      ];
    default:
      return state;
  }
};
export default requests;
