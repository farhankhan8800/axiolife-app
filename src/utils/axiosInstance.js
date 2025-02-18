import axios from 'axios';
import {API_URL, API_TOKEN} from '@env';
import {getDeviceType} from './utils';

const MakeRequest = async (
  end_point,
  data = {},
  options = {},
  request_type = 'application/json',
) => {
  const api_url = API_URL + end_point;
  const deviceType = getDeviceType();

  const defaultOptions = {
    timeout: 10000,
    // 'x-api-key': API_TOKEN,
    'Content-Type': 'application/json',
  };

  const defaultData = {
    deviceType: deviceType,
  };

  let mergedData = {};
  let mergedOptions = {};

  if (request_type === 'form-data') {
    mergedData = data;
    mergedOptions = {...options};
  } else if (request_type === 'application/json') {
    mergedData = {...defaultData, ...data};
    mergedOptions = {...defaultOptions, ...options};
  }

  try {
    // Correct axios request syntax
    const res = await axios.post(api_url, mergedData, {
      headers: mergedOptions,
      timeout: mergedOptions.timeout,
    });

    console.log('Response status :', res.status); // its done now you can move @bablu
    return res;
  } catch (error) {
    console.error('Request error:', error.response || error.message);
    throw error;
  }
};

export default MakeRequest;
