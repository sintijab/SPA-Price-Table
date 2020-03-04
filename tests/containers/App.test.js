import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store'
import Provider from 'react-redux';
import App from '../../js/containers/View';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('<App />', () => {
  let wrapper, store;

  beforeEach(() => {
      const initialState = {
        modalState: [
          {
            id: 1,
            name: "MartinFirma",
            budget: 10000,
            budget_spent: 45000,
            date_of_first_purchase: "2119-07-07"
          },
        ]
      };
      store = mockStore(initialState);
      wrapper = shallow(
          <App store={store} />
      );
  });

    it('should render App container', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
});
