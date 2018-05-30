import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import { Form } from 'antd';

import LoginForm from '../components/Login';
import { duckRequest } from '../ducks';

const mapDispatchToProps = (dispatch, props) => {
  const submitHandler = (e, form) => {
    e.preventDefault();

    form.validateFields((err, params) => {
      if (!err) {
        console.log('Received params of form: ', params);
        const fields = {
          email: params.userName,
          password: params.password,
        };
        console.log(fields)

        dispatch(duckRequest('LOGIN_REQUEST', fields))
      }
    });

  };

  return { submitHandler };
};

export default connect(null, mapDispatchToProps)(LoginForm);