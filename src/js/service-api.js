// const API_KEY = 28261012 - 775c2e5140cc374d66361da3d;
// const BASE_URL = 'https://pixabay.com/api/';

import axios from 'axios';

export default class ServiceAPI {
  constructor() {
    this.options = {
      params: {
        key: '28261012-775c2e5140cc374d66361da3d;',
        q: '',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 39,
      },
    };
  }

  async getPictures() {
    const response = await axios.get('https://pixabay.com/api/', this.options);
    this.incrementPage();
    return response;
  }

  incrementPage() {
    this.options.params.page += 1;
  }

  resetPage() {
    this.pageNumber = 1;
  }

  get searchQuery() {
    return this.options.params.q;
  }

  set searchQuery(newQuery) {
    this.options.params.q = newQuery;
  }

  get pageNumber() {
    return this.options.params.page;
  }

  set pageNumber(newNumber) {
    this.options.params.page = newNumber;
  }
}
