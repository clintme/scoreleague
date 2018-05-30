import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'

export default function requireAuth(Component) {
  class Auth extends PureComponent {
    // componentWillMount() {
    //   this.checkAuth(this.props.isAuthenticated);
    // }

    // componentWillReceiveProps(nextProps) {
    //   this.checkAuth(nextProps.isAuthenticated);
    // }

    // checkAuth(isAuthenticated) {
    //   if (!isAuthenticated) {
    //     const { location, dispatch } = this.props;
    //     const redirectAfterLogin = `${location.pathname}${location.search}`;

    //     if (location.search) {
    //       dispatch(push(`/login${location.search}&redirect_url=${redirectAfterLogin}`));
    //       return;
    //     }
    //     dispatch(push('/login'));
    //   }
    // }

    render() {
      const {
        isAuthenticated,
        component: Component,
        ...props
      } = this.props

      return (
        <Route
          {...props}
          render={props =>
            isAuthenticated
              ? <Component {...props} />
              : (
                <Redirect to={{
                  pathname: '/login',
                  state: { from: props.location }
                }} />
              )
          }
        />
      )
    }
  }

  Auth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.shape({}).isRequired,
  };

  const mapStateToProps = state => ({
    isVerified: true, // state.user.getIn(['profile', 'email_verified']),
    isAuthenticated: false, // state.auth.get('isAuthenticated'),
  });

  return connect(mapStateToProps)(Auth);
}
