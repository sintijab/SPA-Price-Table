import { connect } from 'react-redux';
import App from '../components/View';
import { dataLoaded, dataFailed, dataEmpty } from '../actions/requestActions';
import { openModal } from '../actions/modalActions';

const mapDispatchToProps = (dispatch) => ({
  showModal: (id) => dispatch(openModal(id)),
  dataLoaded: (response) => dispatch(dataLoaded(response)),
  dataFailed: () => dispatch(dataFailed()),
  dataEmpty: () => dispatch(dataEmpty()),
});

const mapStateToProps = (state) => ({
  modalState: state.modals,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
