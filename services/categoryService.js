import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL.endsWith('/')
  ? process.env.NEXT_PUBLIC_API_URL
  : process.env.NEXT_PUBLIC_API_URL + '/';

const API_URL_LOCAL = process.env.NEXT_PUBLIC_API_URL_LOCAL.endsWith('/')
  ? process.env.NEXT_PUBLIC_API_URL_LOCAL
  : process.env.NEXT_PUBLIC_API_URL_LOCAL + '/';

const fetchCategories = async () => {
  try {
    const tokenMatch = document.cookie.match(/BB_AUTH_TOKEN=([^;]+)/);
    if (!tokenMatch) {
      // No token found in cookies
      window.location.href = '/user/login';
      return;
    }
    const token = tokenMatch[1];

    const response = await axios.get(`${API_URL_LOCAL}category/`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Redirect to login on any error
    window.location.href = '/user/login';
    throw error; // optional: rethrow if caller needs to handle it too
  }
};

export { fetchCategories };
