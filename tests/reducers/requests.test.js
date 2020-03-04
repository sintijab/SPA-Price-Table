import reducer from '../../js/reducers/requests'
import * as types from '../../js/constants/actions';
import { ERROR_TEXT } from '../../js/constants/titles';

describe('Requests reducer', () => {
  const data = [
    {
      id: 1,
      name: "MartinFirma",
      budget: 65345664332234,
      budget_spent: 45000,
      date_of_first_purchase: "2119-07-07"
    }
  ];
  const data2 = [
    {
      id: 1,
      name: "MartinFirma",
      budget: 10000,
      budget_spent: 45000,
      date_of_first_purchase: "2119-07-07"
    },
    {
      id: 2,
      name: "TestFirma",
      budget: 233334232,
      budget_spent: 45223000,
      date_of_first_purchase: "2119-07-07"
    }
  ];
  const data3 = [
    {
      id: 5,
      name: "NewFirma",
      budget: 65345664332234,
      budget_spent: 45000,
      date_of_first_purchase: "2119-07-07"
    }
  ];

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([])
  });

  it('should handle DATA_LOADED', () => {
    expect(
      reducer([], {
        type: types.DATA_LOADED,
        response: data
      })
    ).toEqual([
      {
        data,
        type: types.DATA_LOADED,
        loading: false,
        error: false,
      },
    ])
  });

  it('should handle DATA_LOADED with stored data', () => {
    expect(
      reducer(
        data2,
        {
          type: types.DATA_LOADED,
          response: data
        }
      )
    ).toEqual([
      {
        data,
        type: types.DATA_LOADED,
        loading: false,
        error: false,
      },
    ])
  });

  it('should handle DATA_FAILED', () => {
    expect(
      reducer([], {
        type: types.DATA_FAILED
      })
    ).toEqual([
      {
        data: null,
        type: types.DATA_FAILED,
        loading: false,
        error: {
          message: ERROR_TEXT,
        },
      }
    ])
  });

  it('should handle DATA_FAILED with stored data', () => {
    expect(
      reducer(
        data,
        {
          type: types.DATA_FAILED
        }
      )
    ).toEqual([
      {
        id: 1,
        name: "MartinFirma",
        budget: 65345664332234,
        budget_spent: 45000,
        date_of_first_purchase: "2119-07-07"
      },
      {
        data: null,
        type: types.DATA_FAILED,
        loading: false,
        error: {
          message: ERROR_TEXT,
        },
      }
    ])
  });

  it('should handle DATA_EMPTY', () => {
    expect(
      reducer(
        [],
        {
          type: types.DATA_EMPTY
        }
      )
    ).toEqual([
      {
        data: null,
        type: types.DATA_EMPTY,
        loading: false,
        error: {
          message: ERROR_TEXT,
        },
      }
    ])
  });

  it('should handle DATA_EMPTY with stored data', () => {
    expect(
      reducer(
        [data],
        {
          type: types.DATA_EMPTY
        }
      )
    ).toEqual([
      [{
        id: 1,
        name: "MartinFirma",
        budget: 65345664332234,
        budget_spent: 45000,
        date_of_first_purchase: "2119-07-07"
      }],
      {
        data: null,
        type: types.DATA_EMPTY,
        loading: false,
        error: {
          message: ERROR_TEXT,
        },
      }
    ])
  })

  it('should handle DATA_UPDATED', () => {
    expect(
      reducer(
        [],
        {
          payload: data2,
          type: types.DATA_UPDATED
        },
      )
    ).toEqual([
      {
        data: [],
        type: types.DATA_UPDATED,
        loading: false,
        error: false,
      }
    ])
  });

  it('should handle DATA_UPDATED with stored data', () => {
    expect(
      reducer(
        data2,
        [{
          payload: data,
          type: types.DATA_UPDATED
        }],
      )
    ).toEqual([
      {
        id: 1,
        name: "MartinFirma",
        budget: 10000,
        budget_spent: 45000,
        date_of_first_purchase: "2119-07-07"
      },
      {
        id: 2,
        name: "TestFirma",
        budget: 233334232,
        budget_spent: 45223000,
        date_of_first_purchase: "2119-07-07"
      }
    ])
  })

  it('should handle DATA_UPDATED with no equal items from store', () => {
    expect(
      reducer(
        data3,
        [{
          payload: data,
          type: types.DATA_UPDATED
        }],
      )
    ).toEqual([
      {
        id: 5,
        name: "NewFirma",
        budget: 65345664332234,
        budget_spent: 45000,
        date_of_first_purchase: "2119-07-07"
      }
    ])
  })
})
