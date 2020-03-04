import React from 'react';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Provider from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import Overlay from '../../js/containers/Overlay';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);
const UserContext = React.createContext();

describe('<Overlay />', () => {
  let wrapper, store;

  beforeEach(() => {
    const initialState  = {
      modals: []
    }
    store = mockStore(initialState);
    wrapper = shallow(
      <Overlay store={store} />
    );
  });

    it('should render Overlay container', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
});
