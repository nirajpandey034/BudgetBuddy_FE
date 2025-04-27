import axios from 'axios';
import getFormattedDate from '../util/Date'; // Assuming this formats the date

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/';

// const API_URL_LOCAL = process.env.NEXT_PUBLIC_API_URL_LOCAL.endsWith('/')
//   ? process.env.NEXT_PUBLIC_API_URL_LOCAL
//   : process.env.NEXT_PUBLIC_API_URL_LOCAL + '/';

const addExpense = async (expenseData) => {
  const tokenMatch = document.cookie.match(/BB_AUTH_TOKEN=([^;]+)/);
  const userIdMatch = document.cookie.match(/BB_USER_ID=([^;]+)/);

  if (!tokenMatch || !userIdMatch) {
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    window.location.href = '/user/login';
    return;
  }

  const token = tokenMatch[1];
  const userId = userIdMatch[1];

  const expenseDataWithTimestamp = {
    ...expenseData,
    expenseTimestamp: getFormattedDate(),
    userId: userId,
  };

  try {
    const response = await axios.post(
      `${API_URL}expense/add/`,
      expenseDataWithTimestamp,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });

      window.location.href = '/user/login';
    } else {
      console.error('Error adding expense:', error);
      throw error;
    }
  }
};

const listExpenses = async (request) => {
  const tokenMatch = document.cookie.match(/BB_AUTH_TOKEN=([^;]+)/);
  const userIdMatch = document.cookie.match(/BB_USER_ID=([^;]+)/);

  if (!tokenMatch || !userIdMatch) {
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    window.location.href = '/user/login';
    return;
  }

  const token = tokenMatch[1];
  const userId = userIdMatch[1];

  try {
    const response = await axios.get(
      `${API_URL}expense/list?userId=${userId}&month=${
        request.month + 1
      }&year=${request.year}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });

      window.location.href = '/user/login';
    } else {
      throw error;
    }
  }
};

module.exports = { addExpense, listExpenses };
