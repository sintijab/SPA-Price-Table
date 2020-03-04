import React from 'react';
import App from '../../js/components/View';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import * as axios from "axios";
jest.mock("axios");

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  const props = {
    dataFailed: () => {},
    dataLoaded: () => {},
    dataEmpty: () => {},
    modalState: [{
      id: 7,
      name: "InsuranceFirma",
      budget: 9787866,
      budget_spent: 46000,
      date_of_first_purchase: "2409-07-07"
    }],
  };

  it('renders <App /> component', () => {
    const wrapper = shallow(<App item={props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('calls getFinanceData', () => {
    const wrapper = shallow(<App item={props} />);
    const spy = jest.spyOn(wrapper.instance(), 'getFinanceData');
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
  });
});
