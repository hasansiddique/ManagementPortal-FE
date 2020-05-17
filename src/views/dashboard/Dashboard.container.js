import { connect } from 'react-redux';

import Dashboard from './Dashboard.view';

const mapStateToProps = (state) => ({
  user: state.getIn(['auth', 'user']),
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
