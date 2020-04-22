import { connect } from 'react-redux';

import TopBar from './Topbar.view';

const mapStateToProps = (state) => ({
  user: state.getIn(['auth', 'user']),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
