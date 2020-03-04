import reducer from '../../js/reducers/modals';
import * as types from '../../js/constants/actions';

describe('Modals reducer', () => {
  const item = {
    id: 1,
    name: "MartinFirma",
    budget: 10000,
    budget_spent: 45000,
    date_of_first_purchase: "2119-07-07"
  };
  const item2 = {
    id: 1,
    name: "TestFirma",
    budget: 310000,
    budget_spent: 45000,
    date_of_first_purchase: "2119-07-07"
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([])
  });

  it('should handle SHOW_OVERLAY', () => {
    expect(
      reducer([], {
        type: types.SHOW_OVERLAY,
        item
      })
    ).toEqual([
      {
        item,
        overlay: true
      }
    ])
  });

  it('should handle SHOW_OVERLAY with stored overlay', () => {
    expect(
      reducer(
        [item2],
        {
          type: types.SHOW_OVERLAY,
          item
        }
      )
    ).toEqual([
      {
        item: {
          id: 1,
          name: "MartinFirma",
          budget: 10000,
          budget_spent: 45000,
          date_of_first_purchase: "2119-07-07"
        },
        overlay: true
      }
    ])
  });

  it('should handle CLOSE_OVERLAY', () => {
    expect(
      reducer([], {
        type: types.CLOSE_OVERLAY
      })
    ).toEqual([
      {
        item: {},
        overlay: false
      }
    ])
  });

  it('should handle CLOSE_OVERLAY with stored overlay', () => {
    expect(
      reducer(
        [item],
        {
          type: types.CLOSE_OVERLAY
        }
      )
    ).toEqual([
      {
        item: {},
        overlay: false
      }
    ])
  })
})
