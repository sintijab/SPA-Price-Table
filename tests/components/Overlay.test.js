import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Input, ButtonBase } from '@material-ui/core';
import toJson from 'enzyme-to-json';
import Overlay from '../../js/components/Overlay';

Enzyme.configure({ adapter: new Adapter() });

describe('<Overlay />', () => {
  let props = {
    id: 1,
    name: "MartinFirma",
    budget: 65345664332234,
    budget_spent: 45000,
    date_of_first_purchase: "2119-07-07"
  };

  it('renders <Overlay /> component', () => {
    const wrapper = shallow(<Overlay item={props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Input field', () => {
    const wrapper = shallow(<Overlay item={props} />);
    const input = wrapper.find(Input).at(0);
    expect(input).toHaveLength(1);
  });

  it('calls hideModal action by closing overlay', () => {
    const spy = jest.fn();
    const wrapper = mount(<Overlay item={props} hideModal={spy}/>);
    wrapper.find(".close-btn").simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('validates prefilled Input value with valid integer number', () => {
    const wrapper = shallow(<Overlay />);
    wrapper.setProps({ item: { budget: 123 }});
    expect(wrapper.find(Input).at(0).props().defaultValue).toBe('123.00');
  });

  it('validates prefilled Input value with string numeric value', () => {
    const wrapper = shallow(<Overlay />);
    wrapper.setProps({ item: { budget: '1254.489999993' }});
    expect(wrapper.find(Input).at(0).props().defaultValue).toBe('1254.49');
  });

  it('validates prefilled Input value with valid floating point number', () => {
    const wrapper = shallow(<Overlay  />);
    wrapper.setProps({ item: { budget: 123.123 }});
    expect(wrapper.find(Input).at(0).props().defaultValue).toBe('123.12');
  });

  it('validates prefilled Input value with not valid value', () => {
    const wrapper = shallow(<Overlay />);
    wrapper.setProps({ item: { budget: '123.ss7888[/.123' }});
    expect(wrapper.find(Input).at(0).props().defaultValue).toBe(null);
  });

  it('outputs correct prefilled Input values with floating-point exceptions', () => {
    const wrapper = shallow(<Overlay />);
    wrapper.setProps({ item: { budget: 1.015 }});
    expect(wrapper.find(Input).at(0).props().defaultValue).toBe('1.02');
  });

  it('outputs correct prefilled Input price values with floating-point exceptions', () => {
    const wrapper = shallow(<Overlay />);
    wrapper.setProps({ item: { budget: 1.0654 }});
    expect(wrapper.find(Input).at(0).props().defaultValue).toBe('1.07');
  });

  it('outputs correct prefilled Input price values with floating-point exceptions', () => {
    const wrapper = shallow(<Overlay />);
    wrapper.setProps({ item: { budget: 1.27499 }});
    expect(wrapper.find(Input).at(0).props().defaultValue).toBe('1.27');
  });
});
