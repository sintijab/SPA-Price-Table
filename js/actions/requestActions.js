import { DATA_LOADED, DATA_FAILED, DATA_EMPTY } from '../constants/actions';

export const dataLoaded = (data) => (dispatch) => {
  dispatch({
    type: DATA_LOADED,
    response: data
  });
}

export const dataFailed = () => (dispatch) => {
  dispatch({
    type: DATA_FAILED,
  });
}

export const dataEmpty = () => (dispatch) => {
  dispatch({
    type: DATA_EMPTY,
  });
}
