import axios from 'axios';

const BASE_URL =
  process.env.REACT_APP_SERVER_URL || 'http://localhost:3001/api/v1/urls';

const API = axios.create({ baseURL: BASE_URL });

const getUrl = async (slug) => {
  try {
    const res = await API.get(slug);

    return res.data;
  } catch (error) {
    return error;
  }
};

export default { getUrl };
