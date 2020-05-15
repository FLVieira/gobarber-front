import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import * as userActions from '~/store/modules/user/actions';
import * as authActions from '~/store/modules/auth/actions';

import AvatarInput from './AvatarInput';
import { Container } from './styles';

function Profile() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  function handleSubmit(data) {
    dispatch(userActions.updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(authActions.signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço de e-mail" />

        <hr />
        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha "
        />

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="button" onClick={handleSignOut}>
        Sair do GoBarber
      </button>
    </Container>
  );
}

export default Profile;
