import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Input, ButtonBase } from '@material-ui/core';
import DOMPurify from 'dompurify';
import { updateData } from '../../utils/functions';
import { validatePrice } from '../../utils/priceFunctions';
import { URL_HOST, ALL_COMPANIES, BUDGET } from '../../constants/endpoints';
import {
  CLOSE_BUTTON,
  INPUT_ERROR_TEXT,
  INPUT_VALID_TEXT,
} from '../../constants/titles';
import styles from './index.scss';

const Overlay = ({ item, hideModal, updateBudget }) => {
  const {
    register,
    errors,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const [infoMessage, setAdditionalInfo] = useState(false);
  const {
    name,
    budget,
    id,
  } = item || {};
  const budgetTotal = validatePrice(budget);
  const onSubmit = (e) => {
    const params = {
      url: `${URL_HOST}${ALL_COMPANIES}/${id}`,
      property: BUDGET,
      value: e.totalBudget,
    };
    updateData(params)
      .then(() => {
        setAdditionalInfo(INPUT_VALID_TEXT);
        updateBudget(id, e.totalBudget);
      }).catch((err) => {
        console.error(err);
      });
  };
  const closeOverlay = () => {
    setAdditionalInfo(null);
    hideModal();
  };
  const buttonText = `${errors.totalBudget ? 'Disabled' : 'Submit'}`;
  const { sanitize } = DOMPurify;
  return (
    <div className={styles.modal}>
      <div className="close-btn" role="presentation" onClick={() => closeOverlay()}>
        {CLOSE_BUTTON}
      </div>
      <div
        className={styles.modal_item}
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{ __html: sanitize(`<h3>${name}</h3>`) }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="totalBudget"
          type="number"
          inputProps={{
            step: 'any',
          }}
          defaultValue={budgetTotal}
          onChange={() => setAdditionalInfo(null)}
          label="total price"
          inputRef={register({
            required: true,
            maxLength: 20,
            pattern: /^[0-9]+(\.[0-9][0-9])?$/,
          })}
          error={!!errors.totalBudget}
        />
        <br />
        {errors.totalBudget && (
          <h4 className="error-text">{INPUT_ERROR_TEXT}</h4>
        )}
        {!!infoMessage && (
          <h4 className="valid-text">{infoMessage}</h4>
        )}
        <ButtonBase
          type="submit"
          disabled={!!errors.totalBudget}
          classes={{ root: 'button' }}
        >
          {buttonText}
        </ButtonBase>
      </form>
    </div>
  );
};

Overlay.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.string, PropTypes.number],
  )),
  hideModal: PropTypes.func,
  updateBudget: PropTypes.func,
};

Overlay.defaultProps = {
  item: {},
  hideModal: () => {},
  updateBudget: () => {},
};

export default Overlay;
