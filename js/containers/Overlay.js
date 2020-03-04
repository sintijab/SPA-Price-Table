import { connect } from 'react-redux';
import { updateTotalBudget } from '../actions/priceActions';
import { closeModal } from '../actions/modalActions';
import Overlay from '../components/Overlay';


const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(closeModal()),
  updateBudget: (id, price) => dispatch(updateTotalBudget(id, price)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Overlay);
