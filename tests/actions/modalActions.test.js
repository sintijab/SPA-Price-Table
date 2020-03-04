import configureMockStore from "redux-mock-store";
import * as actions from '../../js/actions/modalActions';
import * as types from '../../js/constants/actions';
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('Modal Action Types', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should create an action type to open overlay', () => {
    const item = {
      id: 1,
      name: "MartinFirma",
      budget: 10000,
      budget_spent: 45000,
      date_of_first_purchase: "2119-07-07"
    };
    const expectedAction = [{type: types.SHOW_OVERLAY, item}];
    store.dispatch(actions.openModal(item));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action type to close overlay', () => {
    const expectedAction = [{type: types.CLOSE_OVERLAY}];
    store.dispatch(actions.closeModal());
    expect(store.getActions()).toEqual(expectedAction);
  });
})
