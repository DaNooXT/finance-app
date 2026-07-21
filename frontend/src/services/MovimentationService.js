import api from './api';

const MovimentationService = {

  async getMovimentations(filters = {}) {
    const { data } = await api.get('/movimentation', {
      params: filters,
    });

    console.log(data)

    return data;
  },

  async createMovimentation(payload) {
    const { data } = await api.post(
      '/movimentation',
      payload
    );

    return data;
  },

  async updateMovimentation(id, payload) {
    const { data } = await api.put(
      `/movimentation/${id}`,
      payload
    );

    return data;
  },

  async deleteMovimentation(id) {
    const { data } = await api.delete(
      `/movimentation/${id}`
    );

    return data;
  },
};

export default MovimentationService;