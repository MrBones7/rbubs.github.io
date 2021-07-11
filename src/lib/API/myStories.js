import { axios } from '../config';

export const getUsersAPI = ({address}) => {
  return axios.get(`Users?filterByFormula={address}="${address}"`);
};

export const getStoryDetailsApi = ({ id }) =>{
  return axios.get(`Stories/${id}`);
}
