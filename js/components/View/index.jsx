import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewContainer from '../../templates/ViewContainer';
import Overlay from '../../containers/Overlay';
import { URL_HOST, ALL_COMPANIES } from '../../constants/endpoints';

import { requestData } from '../../utils/functions';

class App extends Component {
  constructor() {
    super();

    this.getFinanceData = this.getFinanceData.bind(this);
  }

  componentDidMount() {
    this.getFinanceData();
  }

  getFinanceData() {
    const { dataLoaded, dataFailed, dataEmpty } = this.props;
    const allCompaniesUrl = `${URL_HOST}${ALL_COMPANIES}`;
    requestData(allCompaniesUrl).then((res) => {
      if (res && res.data && res.data.length) {
        dataLoaded(res.data);
      } else if (res.data && res) {
        dataEmpty();
      }
    })
      .catch((error) => {
        dataFailed();
        console.error(error);
      });
  }

  render() {
    const { modalState = [] } = this.props;
    const hasOverlay = !!modalState.length && modalState[0].overlay;
    return (
      <div>
        {hasOverlay && <Overlay item={modalState[0].item} />}
        <ViewContainer />
      </div>
    );
  }
}

App.propTypes = {
  dataFailed: PropTypes.func,
  dataLoaded: PropTypes.func,
  dataEmpty: PropTypes.func,
  modalState: PropTypes.arrayOf(PropTypes.object),
};

App.defaultProps = {
  dataFailed: () => {},
  dataLoaded: () => {},
  dataEmpty: () => {},
  modalState: [],
};

export default App;
