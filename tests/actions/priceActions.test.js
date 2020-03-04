import configureMockStore from "redux-mock-store";
import * as actions from '../../js/actions/priceActions';
import * as types from '../../js/constants/actions';
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('Price Action Types', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should create an action type for updating stored budget of company', () => {
    const data = {
      id: 1,
      price: 1234
    }
    const payload = {
      idCompany: 1,
      newPrice: 1234
    };
    const expectedAction = [{type: types.DATA_UPDATED, payload}];
    store.dispatch(actions.updateTotalBudget(data.id, data.price));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action type for handling error of the invalid budget price', () => {
    const data = {
      id: 1,
      price: `[['$fw33', 3].['14', 1],`
    }
    const expectedAction = [{type: types.DATA_FAILED}];
    store.dispatch(actions.updateTotalBudget(data.id, data.price));
    expect(store.getActions()).toEqual(expectedAction);
  });
})
