import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import thunk from "redux-thunk";
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store'
import Provider from 'react-redux';
import ViewContainer from '../../js/templates/ViewContainer';
import { DATA_LOADED } from '../../js/constants/actions';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe('<ViewContainer />', () => {
  let store;

  beforeEach(() => {
    const data = [{
      id: 7,
      name: "InsuranceFirma",
      budget: 9787866,
      budget_spent: 46000,
      date_of_first_purchase: "2409-07-07"
    }];
      const initialState = {
        modals: [],
        requests: [{
         data,
         type: DATA_LOADED,
         loading: false,
         error: false,
        }],
        prices: [],
      };
      store = mockStore(initialState);
  });

    it('should render ViewContainer container', () => {
      const wrapper = shallow(<ViewContainer store={store} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render ViewContainer container with stored data', () => {
      const wrapper = mount(<ViewContainer store={store} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
});
