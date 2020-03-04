/* eslint react/no-danger: 0 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import { openModal } from '../../actions/modalActions';
import {
  COMPANY_TITLE,
  COMPANY_BUDGET,
  COMPANY_BUDGET_SPENT,
  COMPANY_BUDGET_LEFT,
  PURCHASE_DATE,
} from '../../constants/titles';
import { useWindowDimensions } from '../../utils/functions';
import {
  validatePrice,
  getActiveBudget,
  displayFormat,
} from '../../utils/priceFunctions';
import styles from './index.scss';

const { sanitize } = DOMPurify;

const ViewContainer = (
  {
    data,
    showModal,
  },
) => {
  const { isMobile, isTablet } = useWindowDimensions();
  const hasSmallViewPort = isMobile || isTablet;
  if (data && data[0] && data[0].data) {
    const rows = data[0].data.map((item) => {
      const fullPrice = validatePrice(item.budget);
      const expenses = validatePrice(item.budget_spent);
      const totalPrice = getActiveBudget(fullPrice, expenses);
      const {
        0: budgetTotal,
        1: budgetSpent,
        2: budgetLeft,
      } = displayFormat([fullPrice, expenses, totalPrice]);
      const {
        name,
        date_of_first_purchase: purchaseDate,
      } = item || {};
      const shortTitle = `<div><div>${name}</div> <div>${purchaseDate}</div></div>`;

      return (
        <div
          key={item.id}
          role="presentation"
          onClick={() => showModal(item)}
          className={styles.row}
        >
          {!hasSmallViewPort && (
            <div
              className={styles.col}
              dangerouslySetInnerHTML={{ __html: sanitize(name) }}
            />
          )}
          {!hasSmallViewPort && (
            <div
              className={styles.col}
              dangerouslySetInnerHTML={{ __html: sanitize(purchaseDate) }}
            />
          )}
          {hasSmallViewPort && (
            <div
              className={styles.col}
              dangerouslySetInnerHTML={{ __html: sanitize(shortTitle) }}
            />
          )}
          <div
            className={styles.col}
            dangerouslySetInnerHTML={{ __html: sanitize(budgetTotal) }}
          />
          <div
            className={styles.col}
            dangerouslySetInnerHTML={{ __html: sanitize(budgetSpent) }}
          />
          <div
            className={styles.col}
            dangerouslySetInnerHTML={{ __html: sanitize(budgetLeft) }}
          />
        </div>
      );
    });
    return (
      <section className={styles.section}>
        <header className={styles.header}>
          <div
            className={styles.col}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(COMPANY_TITLE) }}
          />
          {!hasSmallViewPort && (
            <div
              className={styles.col}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(PURCHASE_DATE) }}
            />
          )}
          <div
            className={styles.col}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(COMPANY_BUDGET) }}
          />
          <div
            className={styles.col}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(COMPANY_BUDGET_SPENT) }}
          />
          <div
            className={styles.col}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(COMPANY_BUDGET_LEFT) }}
          />
        </header>
        <div className={styles.list_items}>
          {rows}
        </div>
      </section>
    );
  }
  return <div />;
};

const mapStateToProps = (state) => ({
  data: state.requests,
  priceUpdate: state.prices,
});
const mapDispatchToProps = (dispatch) => ({
  showModal: (id) => dispatch(openModal(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewContainer);

ViewContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  showModal: PropTypes.func,
};

ViewContainer.defaultProps = {
  data: [],
  showModal: () => {},
};
