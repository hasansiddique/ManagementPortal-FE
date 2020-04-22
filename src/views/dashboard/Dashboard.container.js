import { connect } from 'react-redux';

import Dashboard from './Dashboard.view';

const mapStateToProps = (state) => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
