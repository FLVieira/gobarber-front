import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as authActions from './actions';
import api from '~/services/api';
import history from '~/services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      console.tron.error('Usuário não provider.');
      return;
    }

    yield put(authActions.signInSuccess(token, user));
    history.push('/dashboard');
  } catch (err) {
    yield put(authActions.signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
