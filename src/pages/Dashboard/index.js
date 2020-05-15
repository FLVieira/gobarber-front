import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import api from '~/services/api';

import { Container, Appointment } from './styles';

function Dashboard() {
  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>31 de maio</strong>
        <button type="button">
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        <Appointment past>
          <strong>08:00</strong>
          <span>Diego Fernandes</span>
        </Appointment>
        <Appointment available>
          <strong>09:00</strong>
          <span>Em aberto</span>
        </Appointment>
        <Appointment available>
          <strong>10:00</strong>
          <span>Em aberto</span>
        </Appointment>
        <Appointment>
          <strong>11:00</strong>
          <span>Diego Fernandes</span>
        </Appointment>
      </ul>
    </Container>
  );
}

export default Dashboard;
