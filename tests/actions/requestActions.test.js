import configureMockStore from "redux-mock-store";
import * as actions from '../../js/actions/requestActions';
import * as types from '../../js/constants/actions';
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('Request Action Types', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should create an action type for loaded data', () => {
    const data = [{
      id: 1,
      name: "MartinFirma",
      budget: 10000,
      budget_spent: 45000,
      date_of_first_purchase: "2119-07-07"
    }];
    const expectedAction = [{type: types.DATA_LOADED, response: data}];
    store.dispatch(actions.dataLoaded(data));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action type for data failed action', () => {
    const expectedAction = [{type: types.DATA_FAILED}];
    store.dispatch(actions.dataFailed());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action type for an empty data action', () => {
    const expectedAction = [{type: types.DATA_EMPTY}];
    store.dispatch(actions.dataEmpty());
    expect(store.getActions()).toEqual(expectedAction);
  });
})
