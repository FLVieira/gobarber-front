import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import api from '~/services/api';

import { Container, Appointment } from './styles';

const range = [8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19];

function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const comercialDate = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  const formatDate = useCallback(
    (index, hour) => {
      let dayFormatted = String(date.getDate());
      if (dayFormatted.length === 1) {
        dayFormatted = `0${dayFormatted}`;
      }
      let monthFormatted = String(date.getMonth() + 1);
      if (monthFormatted.length === 1) {
        monthFormatted = `0${monthFormatted}`;
      }

      const dateString = `${date.getFullYear()}-${monthFormatted}-${dayFormatted}`;

      let date1;
      if (index === 0 || index === 1) {
        date1 = new Date(`${dateString}T0${hour}:00`);
      } else {
        date1 = new Date(`${dateString}T${hour}:00`);
      }

      const dateByMe = format(date1, "yyyy'-'MM'-'dd'T'HH':00:00.000Z'", {
        locale: pt,
      });

      return dateByMe;
    },
    [date]
  );

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('/schedule', {
        params: { date },
      });
      const data = range.map((hour, index) => {
        const fullDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        const formattedDate = formatDate(index, hour);

        return {
          time: `${hour}:00h`,
          past: isBefore(fullDate, new Date()),
          appointment: response.data.find(
            (appointe) => appointe.date === formattedDate
          ),
        };
      });
      setSchedule(data);
    }

    loadSchedule();
  }, [date, formatDate]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{comercialDate}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        {schedule.map((appoint) => (
          <Appointment
            key={appoint.time}
            past={appoint.past}
            available={!appoint.appointment}
          >
            <strong>{appoint.time}</strong>
            <span>
              {appoint.appointment
                ? appoint.appointment.user.name
                : 'Em aberto'}
            </span>
          </Appointment>
        ))}
      </ul>
    </Container>
  );
}

export default Dashboard;
