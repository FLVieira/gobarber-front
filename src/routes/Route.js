import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { isLoggedIn } = store.getState().auth;

  if (!isLoggedIn && isPrivate) {
    return <Redirect to="/" />;
  }

  if (isLoggedIn && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = isLoggedIn ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
