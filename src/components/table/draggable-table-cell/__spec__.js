import React from 'react';
import { shallow, mount } from 'enzyme';
import DraggableTableCell from './draggable-table-cell';
import TableCell from './../table-cell';
import WithDrag from './../../drag-and-drop/with-drag';
import Icon from './../../icon';

describe('DraggableTableCell', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <DraggableTableCell identifier="foo" />
    );
  });

  it('renders a table cell', () => {
    let cell = wrapper.find(TableCell);
    expect(cell.props().className).toEqual('draggable-table-cell');
  });

  it('renders a WithDrag component', () => {
    let wd = wrapper.find(WithDrag);
    expect(wd.props().identifier).toEqual('foo');
  });

  it('renders an icon', () => {
    let icon = wrapper.find(Icon);
    expect(icon.props().type).toEqual('drag_vertical');
  });

  it('does not render on last row', () => {
    wrapper = shallow(
      <DraggableTableCell identifier="foo" canDrag={ false }/>
    );
    let icon = wrapper.find(Icon);
    //expect(icon.props().type).toEqual(true);
    //expect(icon.props().className).toEqual('<span />');
    //expect(wrapper.isEmptyRender()).toEqual(false);
    expect(icon.exists()).toEqual(false);
  });
});
