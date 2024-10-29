import http from "../http-common";

class ProposalDataService {
  getAll() {
    return http.get("/proposal");  // proposals 경로로 변경
  }

  get(id) {
    return http.get(`/proposal/${id}`);
  }

  create(data) {
    return http.post("/proposal/submit", data);
  }

  update(id, data) {
    return http.put(`/proposal/${id}`, data);
  }

  delete(id) {
    return http.delete(`/proposal/${id}`);
  }

  deleteAll() {
    return http.delete(`/proposal`);
  }

  findByTitle(title) {
    return http.get(`/proposal?title=${title}`);
  }
}

export default new ProposalDataService();