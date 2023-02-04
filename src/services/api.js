import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchPicturesByTopic = async (searchQuery, page) => {
  const response = await axios.get(
    '/?q=' +
      searchQuery +
      '&page=' +
      page +
      '&key=31160282-9f066dbbb8437aff750d2a45a&image_type=photo&orientation=horizontal&per_page=12'
  );
  return response.data;
};
