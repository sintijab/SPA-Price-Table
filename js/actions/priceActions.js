import { DATA_UPDATED, DATA_FAILED } from '../constants/actions';
import { updatePrice } from '../utils/priceFunctions';

export const updateTotalBudget = (id, price) => (dispatch) => {
  try {
    const newPrice = JSON.parse(price);
    const data = {
      idCompany: id,
      newPrice,
    };
    dispatch({
      type: DATA_UPDATED,
      payload: data
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: DATA_FAILED,
    });
  }
}
