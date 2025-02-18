import axios from 'axios';
import {API_URL, API_TOKEN} from '@env';
import {getDeviceType} from './utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MakeRequest = async (
  end_point,
  data = {},
  headers = {},
  request_type = 'application/json',
) => {
  const api_url = API_URL + end_point;

  const token = await AsyncStorage.getItem('token');

  const defaultHeaders = {
    'x-api-key': API_TOKEN,
    'Content-Type': request_type,
    Authorization: token ? token : '',
    ...headers,
  };

  let defaultData =
    request_type === 'application/json' ? {deviceType: getDeviceType()} : {};
  const requestData = {...defaultData, ...data};

  try {
    const res = await axios.post(api_url, requestData, {
      headers: defaultHeaders,
    });
    return res;
  } catch (error) {
    console.error('Request error:', error.response || error.message);
    throw error;
  }
};

export default MakeRequest;
