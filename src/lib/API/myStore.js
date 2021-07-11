import { axios } from '../config';

export const getStoreApi = () => {
  return axios.get('Stories');
};

export const getStoryDataApi = ({ id }) => {
  return axios.get(`Seasons/${id}`);
};

export const getEpisodeDataApi = ({ id }) => {
  return axios.get(`Episodes/${id}`)
}
