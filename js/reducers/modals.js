import { SHOW_OVERLAY, CLOSE_OVERLAY } from '../constants/actions';

const modals = (state = [], action) => {
  switch (action.type) {
    case SHOW_OVERLAY:
      return [
        {
          item: action.item,
          overlay: true,
        },
      ];
    case CLOSE_OVERLAY:
      return [
        {
          item: {},
          overlay: false,
        },
      ];
    default:
      return state;
  }
};
export default modals;
