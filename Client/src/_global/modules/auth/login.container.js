import { connect } from 'react-redux';
import { compose, onlyUpdateForKeys, lifecycle } from 'recompose';
import qs from 'query-string';

import { login } from './auth.actions';
import Login from './Login';

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { emp_id: employmentId, id: sessionId } = qs.parse(props.location.search);

  return {
    onLogin: () => dispatch(login({ employmentId, sessionId }))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.onLogin();
    }
  }),
  onlyUpdateForKeys(['isAuth', 'location']),
)(Login);
