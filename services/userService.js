import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL.endsWith('/')
  ? process.env.NEXT_PUBLIC_API_URL
  : process.env.NEXT_PUBLIC_API_URL + '/';

const API_URL_LOCAL = process.env.NEXT_PUBLIC_API_URL_LOCAL.endsWith('/')
  ? process.env.NEXT_PUBLIC_API_URL_LOCAL
  : process.env.NEXT_PUBLIC_API_URL_LOCAL + '/';

const registerUser = async (email, password, name, profession) => {
  try {
    const response = await axios.post(
      `${API_URL_LOCAL}user/register`, // Now correctly forms "/user/register"
      { email, password, name, profession },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      'Registration failed:',
      error.response?.data || error.message
    );
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL_LOCAL}user/login`,
      { email, password },
      { withCredentials: true }
    );
    const { token, id } = response.data;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 15);

    document.cookie = `BB_USER_ID=${id}; Path=/; SameSite=Strict; Secure; Expires=${expiryDate.toUTCString()}`;
    document.cookie = `BB_AUTH_TOKEN=${token}; Path=/; SameSite=Strict; Secure; Expires=${expiryDate.toUTCString()}`;

    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = { registerUser, loginUser };
