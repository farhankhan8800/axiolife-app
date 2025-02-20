import axios from 'axios';
import { API_URL, API_TOKEN } from '@env';
import { getDeviceType } from './utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter } from 'react-native';

const MakeRequest = async (
  end_point,
  data = {},
  headers_ = {},
  request_type = 'application/json',
) => {
  const api_url = `${API_URL}${end_point}`;

  let token = await AsyncStorage.getItem('token');
  token = token ? token :'none' ;

  const defaultHeaders = {
    'x-api-key': API_TOKEN,
    'Content-Type': request_type,
    Authorization: token, 
    ...headers_, 
  };



  let defaultData = request_type === 'application/json' ? { deviceType: getDeviceType() } : {};
  const requestData = { ...defaultData, ...data };


  console.log('Request Data:', requestData);
  console.log('Request Headers:', defaultHeaders);

  try {
    const res = await axios.post(api_url, requestData, { headers: defaultHeaders });
    return res.data; 
  } catch (error) {
    console.error('Request error:', error?.response?.data || error.message);

    if (error?.response?.status === 403) {
      DeviceEventEmitter.emit('unauthorizedEvent', { message: 'User is unauthorized' });
    }


    throw error;
  }
};

export default MakeRequest;



