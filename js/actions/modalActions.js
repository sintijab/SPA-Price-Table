import { SHOW_OVERLAY, CLOSE_OVERLAY } from '../constants/actions';

export const openModal = item => (dispatch) => {
  dispatch({
    type: SHOW_OVERLAY,
    item
  });
}

export const closeModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_OVERLAY
  });
}
