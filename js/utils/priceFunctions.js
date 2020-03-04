import axios from 'axios';
import BigNumber from 'bignumber.js';
import { EUR } from '../constants/currencies';

class ToFixed extends Number {
  constructor(nr = null) {
    super(nr)
    this.nr = nr;
  }
  ceil(nr) {
    var aux = Math.pow(10, 2);
    return Math.ceil(this.nr.toPrecision(70) * aux) / aux;
  }
  round(nr) {
    var aux = Math.pow(10, 2);
    return Math.round(this.nr.toPrecision(70) * aux) / aux;
  }
}

export const validatePrice = (number) => {
  try {
    const isTypeNumber = typeof number === 'number';
    const isTypeString = typeof number === 'string';

    if (number && (isTypeNumber || isTypeString)) {
      let value = number;
      if (isTypeString && !(/^[a-zA-Z0-9.,]+$/.test(number))) {
        // Number contains other characters than alphabetic, numbers and separators
        return null;
      }
      if (isTypeString) {
        // remove all occurrences of whitespaces
        value = value.replace(/^\s+|\s+$/gm, '');
        // replace all occurrences of comma
        value = value.replace(/,/g, '.');
        // replace all occurrences of dots except last one
        value = value.replace(/[.](?=.*[.])/g, '');
        value = parseFloat(value);
      }
      value = new BigNumber(value).toFixed(2);
      return value;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
  return null;
};

export const getActiveBudget = (budget, budgetSpent) => {
  if (budget) {
    let totalBudget = budgetSpent ? new BigNumber(budget).minus(budgetSpent) : budget;
    totalBudget = new BigNumber(totalBudget).toFixed(2);
    return budgetSpent ? totalBudget : budget;
  }
  return null;
}

export const displayFormat = (prices) => {
  // eslint-disable-next-line
  let displayPrices = {};

  prices.forEach((price, index) => {
    if (price) {
      let floatNrPrice = parseFloat(price);
      //add separator to convert all integers fixed float format
      floatNrPrice = Number.isInteger(floatNrPrice) ?  new BigNumber(floatNrPrice).toFixed(2) : floatNrPrice;
      let string = typeof floatNrPrice === 'string' ? floatNrPrice : floatNrPrice.toString();
      let displayPrice = string.replace(/\./g,',');
      // add thousand separator before comma
      displayPrice = displayPrice.replace(/\B(?=(\d{3})+(?!\d)*[,])/g, '.');

      displayPrices[index] = `${displayPrice} ${EUR}`;
    } else {
      displayPrices[index] = `-`;
    }
  });

  return displayPrices;
};

export const updatePrice = (url, id, price) => {
  const updatePath = `${url}/${id}`;
  axios.post(updatePath, {
    budget: `${price}`,
  });
};
